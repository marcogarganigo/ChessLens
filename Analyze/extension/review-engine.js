/* ChessLens 1.9 — one evaluation per unique position, streamed back to the tab.
 * A whole game's position queue is evaluated progressively; a newly selected
 * position jumps ahead of the remaining background work. No synthetic scores. */
(() => {
  'use strict';
  const engineURL = chrome.runtime.getURL('engine/stockfish-19-lite-single.js');
  const DEPTH = 11;
  const cache = new Map();
  const jobKey = job => job.move ? `${job.fen}|${job.move}` : job.fen;
  const sessions = new Map(); // tabId -> latest game id and requested positions
  let waiting = [], active = null, worker = null, ready = false, timer = null;
  let failureStreak = 0, restartTimer = null;

  function validFen(fen) {
    return typeof fen === 'string' && fen.length < 140 &&
      /^[prnbqkPRNBQK1-8/]+ [wb] (?:-|[KQkq]+) (?:-|[a-h][36]) \d+ \d+$/.test(fen);
  }
  function notify(job, result, error) {
    if (sessions.get(job.tabId)?.id !== job.gameId) return;
    try {
      chrome.runtime.sendMessage({target:'review-background',type:'REVIEW_POSITION_RESULT',
        tabId:job.tabId,gameId:job.gameId,fen:job.fen,move:job.move,
        ...(result ? {result} : {error:String(error || 'No evaluation returned')})}).catch(()=>{});
    } catch {
      // The offscreen document can be closed while the worker is returning a result.
    }
  }
  function trimCache() {
    if (cache.size <= 2500) return;
    for (const key of cache.keys()) {cache.delete(key); if(cache.size <= 2000) break;}
  }
  function fail(reason) {
    const error = String(reason?.stack || reason?.message || reason || 'Stockfish worker failed');
    try {worker?.terminate();} catch {}
    worker = null; ready = false; clearTimeout(timer); clearTimeout(restartTimer);
    failureStreak++;
    if (active && !active.cancelled) {
      if ((active.attempt || 0) < 1) waiting.unshift({...active,attempt:1});
      else notify(active,null,error);
    }
    active = null;
    if (failureStreak >= 4) {
      for (const job of waiting) notify(job,null,error);
      waiting=[];return;
    }
    if (waiting.length) restartTimer=setTimeout(startWorker, Math.min(2000, failureStreak*500));
  }
  function startWorker() {
    if (worker || !waiting.length) return;
    try {
      worker = new Worker(engineURL);
      const searchWorker=worker;
      worker.onmessage = event => {
        if (worker!==searchWorker||typeof event.data !== 'string') return;
        for (const line of event.data.split(/[\r\n]+/)) {
          if (line === 'uciok') {
            worker.postMessage('setoption name Hash value 16');
            worker.postMessage('setoption name MultiPV value 2');
            worker.postMessage('isready');
          } else if (line === 'readyok') {
            ready = true; clearTimeout(timer); startNext();
          } else if (active && line.startsWith('info ') && line.includes(' score ') && !/\b(?:upperbound|lowerbound)\b/.test(line)) {
            const depth=/\bdepth (\d+)/.exec(line), score=/\bscore (cp|mate) (-?\d+)/.exec(line);
            const rank=Number(/\bmultipv (\d+)/.exec(line)?.[1]||1);
            const pv=/\bpv (.+)/.exec(line)?.[1].trim().split(/\s+/);
            if (depth && score && rank<=2 && Number(depth[1]) >= (active.lines[rank]?.depth||0)) {
              active.lines[rank]={depth:Number(depth[1]),score:{type:score[1],value:Number(score[2])},pv};
            }
          } else if (active && line.startsWith('bestmove')) {
            if(active.cancelled){active=null;clearTimeout(timer);startNext();continue;}
            const best=/^bestmove\s+([a-h][1-8][a-h][1-8][qrbn]?)/.exec(line)?.[1] || null;
            const terminal=/^bestmove\s+(?:\(none\)|0000)/.test(line);
            const first=active.lines[1],second=active.lines[2];
            const alternative=second?.depth===first?.depth&&second?.pv?.[0]?second:null;
            const result=terminal&&!active.move ? {terminal:true}
              : first?.pv?.[0]===best && (!active.move||active.move===best)
                ? {score:first.score,best,depth:first.depth,pv:first.pv,
                  alternative:alternative?.score,alternativeMove:alternative?.pv[0]} : null;
            const finished=active; active=null; clearTimeout(timer);
            if (result) {cache.set(jobKey(finished),result);trimCache();failureStreak=0;notify(finished,result);}
            else if ((finished.attempt||0)<1)waiting.unshift({...finished,attempt:1});
            else notify(finished,null,'Stockfish did not provide a usable score after retry');
            startNext();
          }
        }
      };
      worker.onerror=event=>{event.preventDefault?.();if(worker===searchWorker)fail(event.error||event.message);};
      worker.onmessageerror=()=>{if(worker===searchWorker)fail('Stockfish returned an unreadable message');};
      worker.postMessage('uci');
      timer=setTimeout(()=>fail('Stockfish startup exceeded 20 seconds'),20000);
    } catch(error) {fail(error);}
  }
  function startNext() {
    if (active || !ready) return;
    clearTimeout(timer);
    while(waiting.length) {
      const job=waiting.shift();
      if (sessions.get(job.tabId)?.id !== job.gameId) continue;
      const cached=cache.get(jobKey(job));
      if(cached){notify(job,cached);continue;}
      const root=job.move?cache.get(job.fen):null;
      if(root&&root.best===job.move){notify(job,{score:root.score});continue;}
      if(root?.alternativeMove===job.move&&root?.alternative){notify(job,{score:root.alternative});continue;}
      active={...job,lines:[]};
      worker.postMessage('position fen ' + active.fen);
      worker.postMessage(`go depth ${DEPTH}${job.move ? ` searchmoves ${job.move}` : ''}`);
      timer=setTimeout(()=>fail(`Stockfish analysis timed out: ${active?.fen||''}`),35000);
      return;
    }
  }
  function sendGame(message) {
    if(!Number.isInteger(message.tabId)||!Number.isInteger(message.gameId)||!Array.isArray(message.positions))
      throw Error('Invalid review game request');
    const positions=[...new Set(message.positions.filter(validFen))];
    const requested=new Set(positions);
    sessions.set(message.tabId,{id:message.gameId,requested});
    waiting=waiting.filter(j=>j.tabId!==message.tabId);
    const preferred=Array.isArray(message.preferred)?message.preferred.filter(fen=>requested.has(fen)):[];
    const ordered=[...new Set([...preferred,...positions])];
    const movesByFen=new Map();
    for(const entry of Array.isArray(message.moves)?message.moves:[]){
      if(!requested.has(entry?.fen)||typeof entry.uci!=='string'||!/^[a-h][1-8][a-h][1-8][qrbn]?$/.test(entry.uci))continue;
      if(!movesByFen.has(entry.fen))movesByFen.set(entry.fen,new Set());
      movesByFen.get(entry.fen).add(entry.uci);
    }
    for(const fen of ordered) {
      const job={tabId:message.tabId,gameId:message.gameId,fen,attempt:0};
      for(const entry of [job,...[...movesByFen.get(fen)||[]].map(move=>({...job,move}))]){
        if(active?.tabId!==job.tabId||active.gameId!==job.gameId||jobKey(active)!==jobKey(entry))waiting.push(entry);
      }
    }
    if (worker && ready) startNext(); else startWorker();
    return positions.length;
  }
  function priority(message) {
    const session=sessions.get(message.tabId);
    if(!session||session.id!==message.gameId||!Array.isArray(message.fens))return;
    for(const fen of [...message.fens].reverse()) {
      if(!session.requested.has(fen))continue;
      const group=waiting.filter(j=>j.tabId===message.tabId&&j.gameId===message.gameId&&j.fen===fen);
      if(group.length){
        const jobs=new Set(group);
        waiting=[...group,...waiting.filter(job=>!jobs.has(job))];
      }
    }
    startNext();
  }
  chrome.runtime.onMessage.addListener((msg,_sender,sendResponse)=>{
    if(msg?.target!=='review-offscreen')return false;
    try {
      if(msg.type==='REVIEW_GAME')sendResponse({ok:true,count:sendGame(msg)});
      else if(msg.type==='REVIEW_PRIORITY'){priority(msg);sendResponse({ok:true});}
      else if(msg.type==='REVIEW_CANCEL'){
        sessions.delete(msg.tabId);waiting=waiting.filter(j=>j.tabId!==msg.tabId);
        if(active?.tabId===msg.tabId){active.cancelled=true;worker?.postMessage('stop');}
        sendResponse({ok:true});
      } else sendResponse({ok:false,error:'Unknown review command'});
    } catch(error){sendResponse({ok:false,error:String(error?.stack||error)});}
    return false;
  });
  addEventListener('error',event=>{if(event.filename?.includes('stockfish'))fail(event.message);});
  addEventListener('unhandledrejection',event=>fail(event.reason));
})();
