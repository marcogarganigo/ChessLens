/* ChessLens 1.9: complete-game review, board-only move symbols. Never modify Chess.com's move list.
 * Chess.com content scripts cannot reliably create extension-origin Workers:
 * review requests run through the extension's offscreen engine instead. */
(() => {
  'use strict';
  const context=window.ChessLensContentContext;
  if(!context?.active())return;
  const MATERIAL={p:100,n:320,b:330,r:500,q:900,k:0};
  let board=null,layer=null,svg=null,badge=null,currentMove=null,review=null,history=[],historyKey='',displayKey='';
  let requestedPositions=new Set();
  let port=null,retryTimer=null,gameId=0,submittedId=-1,acceptedCount=0;
  const positionScores=new Map(); // Genuine UCI evaluations across all move positions
  const playedScores=new Map();
  const resultCache=new Map();
  const api=()=>({Chess:window.ChessLensChess,findBoard:window.ChessLensBoard,
    pieces:window.ChessLensPieceMap,placement:window.ChessLensPlacement,isAllowed:window.ChessLensAllowed});
  const keyFor=m=>m?.before&&m?.uci?`${m.before}|${m.uci}`:null;

  function squareFromNode(node){
    const cls=String(node.className?.baseVal||node.className||'');
    const m=cls.match(/(?:^|\s)square-([1-8])([1-8])(?:\s|$)/);
    if(m)return 'abcdefgh'[Number(m[1])-1]+m[2];
    const data=node.getAttribute('data-square');return /^[a-h][1-8]$/.test(data||'')?data:null;
  }
  function highlightedTarget(chessboard){
    // Chess.com shows two previous-move highlights. The origin is now empty,
    // whereas the destination contains the moved piece, even after a capture.
    const highlighted=[...chessboard.querySelectorAll('.highlight,.last-move,.last-move-square,[class*="last-move"]')]
      .filter(n=>!n.closest('#chesslens-review-overlay')).map(squareFromNode).filter(Boolean);
    const squares=[...new Set(highlighted)];if(squares.length!==2)return null;
    const pieces=api().pieces?.(chessboard);
    const occupied=squares.filter(s=>pieces?.has(s));
    return occupied.length===1?occupied[0]:null;
  }
  function createOverlay(){
    layer=document.createElement('div');layer.id='chesslens-review-overlay';
    layer.style.cssText='all:initial;pointer-events:none;position:fixed;z-index:2147483001;left:0;top:0;width:0;height:0;overflow:visible;display:none';
    const root=layer.attachShadow({mode:'open'});
    root.innerHTML='<style>:host{all:initial}svg{display:block;overflow:visible;pointer-events:none}#move-badge{filter:drop-shadow(0 1px 1.3px #171b2088)}.badge-glyph{filter:drop-shadow(0 .65px .55px #24212b80)}</style><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><g id="move-badge" style="display:none"></g></svg>';
    svg=root.querySelector('svg');badge=root.querySelector('#move-badge');document.documentElement.appendChild(layer);
  }
  function flipped(chessboard){return chessboard.classList.contains('flipped')||!!chessboard.closest('.flipped,[data-orientation="black"]');}
  function draw(){
    if(!layer||!board||!svg||!badge)return;
    const r=board.getBoundingClientRect();
    if(r.width<180||r.height<180||r.bottom<0||r.top>innerHeight||r.right<0||r.left>innerWidth){layer.style.display='none';return;}
    layer.style.display='block';layer.style.left=`${r.left}px`;layer.style.top=`${r.top}px`;
    layer.style.width=`${r.width}px`;layer.style.height=`${r.height}px`;
    svg.setAttribute('width',String(r.width));svg.setAttribute('height',String(r.height));svg.setAttribute('viewBox',`0 0 ${r.width} ${r.height}`);
    if(!currentMove?.to){
      badge.style.display='none';layer.removeAttribute('data-quality');layer.removeAttribute('data-move-square');return;
    }
    const file=currentMove.to.charCodeAt(0)-97,rank=Number(currentMove.to[1])-1;
    if(file<0||file>7||rank<0||rank>7){badge.style.display='none';return;}
    const orientation=flipped(board),col=orientation?7-file:file,row=orientation?rank:7-rank;
    const size=Math.min(32,Math.max(12,Math.min(r.width,r.height)/8*.38));
    // Use the same offset on every square, including corners at the edge of the board.
    const cx=(col+1)*r.width/8-size*.16;
    const cy=row*r.height/8+size*.16;
    const kind=review?.kind||'pending';
    badge.style.display='';badge.setAttribute('transform',`translate(${cx-size/2} ${cy-size/2}) scale(${size/24})`);
    if(badge.dataset.kind!==kind){
      badge.dataset.kind=kind;
      badge.innerHTML=chessLensBadgeArtwork(kind);
      if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
        badge.querySelector('.badge-glyph').animate([{opacity:.65},{opacity:1}],{duration:120,easing:'ease-out'});
      }
    }
    layer.setAttribute('data-move-square',currentMove.to);layer.setAttribute('data-quality',kind);
  }
  function expectedPoints(score,fen,mover){
    if(!score)return null;
    const value=score.value*(fen.split(' ')[1]===mover?1:-1);
    if(score.type==='mate')return value>0?1:0;
    // Rating-neutral conversion that compresses changes in already decisive positions.
    return 1/(1+Math.exp(-value/170));
  }

  function materialBalance(game,mover){
    return game.board().flat().reduce((sum,piece)=>
      sum+(piece?MATERIAL[piece.type]*(piece.color===mover?1:-1):0),0);
  }

  function offersPiece(move,post,afterBoard){
    const landing=afterBoard.get(move.to);
    const continuation=post.pv?.slice(0,2);
    if((MATERIAL[landing?.type]||0)<300||continuation?.[0]?.slice(2,4)!==move.to)return false;
    const Chess=api().Chess;
    const beforeBalance=materialBalance(new Chess(move.before),move.turn);
    for(const uci of continuation){
      afterBoard.move({from:uci.slice(0,2),to:uci.slice(2,4),promotion:uci[4]});
    }
    return beforeBalance-materialBalance(afterBoard,move.turn)>=200;
  }

  function classify(move,pre,post,playedScore){
    if(!pre?.score||!post||!playedScore)return null;
    const Chess=api().Chess,afterBoard=new Chess(move.after);
    const best=expectedPoints(pre.score,move.before,move.turn);
    const played=afterBoard.isCheckmate()?1:afterBoard.isDraw()?0.5:
      expectedPoints(playedScore,move.before,move.turn);
    if(!Number.isFinite(best)||!Number.isFinite(played))return null;
    const loss=Math.max(0,best-played);
    // Compare in thousandths to keep exact band boundaries stable when subtracting floats.
    const lost=Math.round(loss*1000);
    const matchesBest=pre.best===move.uci;
    const alternative=expectedPoints(pre.alternative,move.before,move.turn);
    let kind;
    if(lost<=20&&played>=.45&&alternative!==null&&alternative<.9&&offersPiece(move,post,afterBoard))kind='brilliant';
    else if(matchesBest&&played>=.45&&alternative!==null&&played-alternative>=.20)kind='great';
    else if(matchesBest)kind='best';
    else if(lost<20)kind='excellent';
    else if(lost<50)kind='good';
    else if(lost<100)kind='inaccuracy';
    else if(lost<200)kind='mistake';
    else kind='blunder';
    return{kind,loss,best,played};
  }
  function ratingFor(move){
    if(!move)return null;
    const key=keyFor(move);
    let result=resultCache.get(key);
    if(!result){
      const before=positionScores.get(move.before),after=positionScores.get(move.after);
      if(!before||!after)return null;
      const played=before.best===move.uci?before.score:
        before.alternativeMove===move.uci?before.alternative:playedScores.get(key);
      try{result=classify(move,before,after,played);}catch(error){console.warn('[ChessLens] Classification:',error);}
      if(result)resultCache.set(key,result);
    }
    // Miss requires an opponent mistake that gives us a winning opportunity,
    // followed by a move that gives that opportunity back.
    if(result?.loss>=.10&&result.best>=.75&&result.played<.75&&move.previousFen){
      const previous=positionScores.get(move.previousFen);
      if(!previous)return null;
      const beforeOpponentMove=expectedPoints(previous.score,move.previousFen,move.turn);
      if(beforeOpponentMove!==null&&beforeOpponentMove<.75&&result.best-beforeOpponentMove>=.10){
        return {...result,kind:'miss'};
      }
    }
    return result;
  }
  function refreshProgress(){
    if(!layer)return;
    const sides={w:{total:0,reviewed:0,counts:{}},b:{total:0,reviewed:0,counts:{}}};
    for(const move of history){
      const side=sides[move.turn];
      side.total++;
      const result=ratingFor(move);
      if(!result)continue;
      side.reviewed++;
      side.counts[result.kind]=(side.counts[result.kind]||0)+1;
    }
    const complete=sides.w.reviewed+sides.b.reviewed;
    window.ChessLensReviewSummary=history.length?{sides,current:currentMove&&{
      side:currentMove.turn,san:currentMove.san,fen:currentMove.after,kind:review?.kind||'pending',
      best:positionScores.get(currentMove.after)?.best
    }}:null;
    layer.dataset.reviewProgress=`${complete}/${history.length}`;
    layer.dataset.reviewState=complete===history.length&&history.length?'complete':'analyzing';
    layer.dataset.reviewAccepted=String(acceptedCount);
    // A tooltip gives unobtrusive progress without putting more controls on the board.
    const launcher=document.querySelector('#chesslens-launch')?.shadowRoot?.querySelector('button');
    if(launcher){
      const progress=history.length?`${complete}/${history.length} moves reviewed`:'No game moves detected';
      if(launcher.dataset.reviewProgress!==progress)launcher.dataset.reviewProgress=progress;
      const action=launcher.dataset.open==='true'?'Close ChessLens panel':'Open ChessLens panel';
      const label=`${action} · ${progress}`;
      if(launcher.title!==label)launcher.title=label;
    }
  }
  let requestedMoveKeys=new Set();
  function requestGame(){
    if(!port||submittedId===gameId)return;
    const line=history.length?[history[0].before,...history.map(move=>move.after)]:[];
    const preferred=currentMove?[currentMove.before,currentMove.after]:line.slice(0,2);
    const positions=[...new Set([...preferred,...line])];
    if(!positions.length)return;
    requestedPositions=new Set(positions);
    const moves=[currentMove,...history].filter(Boolean);
    requestedMoveKeys=new Set(moves.map(keyFor));
    submittedId=gameId;
    try{port.postMessage({type:'REVIEW_GAME',gameId,gameKey:historyKey,positions,preferred,
      moves:moves.map(move=>({fen:move.before,uci:move.uci}))});}
    catch(error){if(context.active(error))disconnect();}
  }
  function prioritize(move){
    if(!port||!move||submittedId!==gameId)return;
    try{port.postMessage({type:'REVIEW_PRIORITY',gameId,gameKey:historyKey,fens:[move.before,move.after,move.previousFen].filter(Boolean)});}
    catch(error){if(context.active(error))disconnect();}
  }
  function disconnect(){
    const previous=port;
    port=null;submittedId=-1;clearTimeout(retryTimer);
    try{previous?.disconnect();}catch{}
    if(context.active())retryTimer=setTimeout(connect,1500);
  }
  function connect(){
    if(port||!context.active()||!api().isAllowed?.(location.href)?.allowed)return;
    try{
      port=chrome.runtime.connect({name:'chesslens-review'});
      const connection=port;
      connection.onMessage.addListener(message=>{
        if(port!==connection||!context.active()||message?.gameId!==gameId)return;
        if(message.type==='REVIEW_ACCEPTED'){
          acceptedCount=Number(message.count)||0;prioritize(currentMove);refreshProgress();return;
        }
        if(message.type==='REVIEW_ERROR'){
          if(layer)layer.dataset.reviewState='unavailable';
          return;
        }
        if(message.type!=='REVIEW_POSITION_RESULT'||typeof message.fen!=='string')return;
        if(message.move&&message.result?.score){
          playedScores.set(`${message.fen}|${message.move}`,message.result.score);
          if(playedScores.size>2500)playedScores.delete(playedScores.keys().next().value);
        }else if(!message.move&&message.result&&(message.result.score||message.result.terminal)){
          positionScores.set(message.fen,message.result);
          if(positionScores.size>2500)positionScores.delete(positionScores.keys().next().value);
        }
        // When either half of a move becomes available, immediately update the
        // selected move; in the meantime the rest of the game keeps analyzing.
        review=ratingFor(currentMove);refreshProgress();draw();
      });
      connection.onDisconnect.addListener(()=>{
        if(context.onDisconnect()&&port===connection)disconnect();
      });
      requestGame();
    }catch(error){if(context.active(error))disconnect();}
  }
  function choose(move){
    currentMove=move;
    review=ratingFor(move);
    draw();
    if(move&&(!requestedMoveKeys.has(keyFor(move))||
      [move.before,move.after].some(fen=>!requestedPositions.has(fen))))submittedId=-1;
    if(move){if(!port)connect();requestGame();prioritize(move);}
  }
  function sync(){
    if(!context.active())return;
    const source=api();if(!source.Chess||!source.findBoard||!source.isAllowed)return;
    if(!source.isAllowed(location.href)?.allowed){
      if(port){gameId++;disconnect();}
      currentMove=null;review=null;window.ChessLensReviewSummary=null;
      displayKey='';if(layer)layer.style.display='none';return;
    }
    const found=source.findBoard();if(!found){currentMove=null;review=null;window.ChessLensReviewSummary=null;displayKey='';if(layer)layer.style.display='none';return;}
    if(found!==board){
      boardResize.disconnect();
      board=found;
      boardResize.observe(board);
      if(!layer)createOverlay();
      displayKey='';
    }
    const verified=window.ChessLensVerifiedGame;
    const sig=verified.key;
    if(sig!==historyKey){
      historyKey=sig;
      history=verified.moves.map((move,index)=>({...move,turn:move.color,
        uci:move.from+move.to+(move.promotion||''),previousFen:verified.moves[index-1]?.before}));
      gameId++;submittedId=-1;acceptedCount=0;displayKey='';
    }
    const placement=source.placement(source.pieces(board));
    const hint=Number(new URL(location.href).searchParams.get('move')),lastTarget=highlightedTarget(board);
    const signature=placement+'|'+(hint??'')+'|'+(lastTarget||'')+'|'+sig;
    if(signature!==displayKey){
      displayKey=signature;
      const matching=history.filter(m=>m.after.split(' ')[0]===placement);
      const hinted=history[hint-1];
      const startingFen=history[0]?.before||new source.Chess().fen();
      const atStart=!hint&&!lastTarget&&startingFen.split(' ')[0]===placement;
      const selected=atStart?null:
        matching.includes(hinted)?hinted:
        matching.findLast(move=>move.to===lastTarget)||
        matching.at(-1)||null;
      if(keyFor(selected)!==keyFor(currentMove)||selected?.to!==currentMove?.to)choose(selected);
    }
    if((history.length||currentMove)&&submittedId!==gameId){if(!port)connect();requestGame();}
    refreshProgress();draw();
  }
  const boardResize=new ResizeObserver(draw);
  let debounce=0;
  const observer=new MutationObserver(records=>{
    if(!context.active())return;
    if(debounce||records.every(r=>r.target?.closest?.('#chesslens-overlay,#chesslens-launch,#chesslens-review-overlay')))return;
    debounce=setTimeout(()=>{debounce=0;sync();},60);
  });
  observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','data-node','data-san','href','style','aria-current','data-selected']});
  addEventListener('scroll',draw,{passive:true});addEventListener('resize',draw,{passive:true});
  const poll=setInterval(sync,700);
  context.onClose(()=>{
    boardResize.disconnect();
    clearInterval(poll);
    clearTimeout(debounce);
    clearTimeout(retryTimer);
    observer.disconnect();
    removeEventListener('scroll',draw);
    removeEventListener('resize',draw);
    port=null;
    layer?.remove();
  });
  sync();
})();
