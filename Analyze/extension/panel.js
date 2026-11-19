(()=>{function Ss(n){return n!==null?{comment:n,variations:[]}:{variations:[]}}function Cs(n,t,e,s,i){let o={move:n,variations:i};return t&&(o.suffix=t),e&&(o.nag=e),s!==null&&(o.comment=s),o}function As(...n){let[t,...e]=n,s=t;for(let i of e)i!==null&&(s.variations=[i,...i.variations],i.variations=[],s=i);return t}function ks(n,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){let s=e.variations[0];if(!s){e.comment=t.marker.comment;break}e=s}}return{headers:n,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function ys(n,t){function e(){this.constructor=n}e.prototype=t.prototype,n.prototype=new e}function ee(n,t,e,s){var i=Error.call(this,n);return Object.setPrototypeOf&&Object.setPrototypeOf(i,ee.prototype),i.expected=t,i.found=e,i.location=s,i.name="SyntaxError",i}ys(ee,Error);function we(n,t,e){return e=e||" ",n.length>t?n:(t-=n.length,e+=e.repeat(t),n+e.slice(0,t))}ee.prototype.format=function(n){var t="Error: "+this.message;if(this.location){var e=null,s;for(s=0;s<n.length;s++)if(n[s].source===this.location.source){e=n[s].text.split(/\r\n|\n|\r/g);break}var i=this.location.start,o=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(i):i,h=this.location.source+":"+o.line+":"+o.column;if(e){var f=this.location.end,u=we("",o.line.toString().length," "),g=e[i.line-1],_=i.line===f.line?f.column:g.length+1,A=_-i.column||1;t+=`
 --> `+h+`
`+u+` |
`+o.line+" | "+g+`
`+u+" | "+we("",i.column-1," ")+we("",A,"^")}else t+=`
 at `+h}return t};ee.buildMessage=function(n,t){var e={literal:function(g){return'"'+i(g.text)+'"'},class:function(g){var _=g.parts.map(function(A){return Array.isArray(A)?o(A[0])+"-"+o(A[1]):o(A)});return"["+(g.inverted?"^":"")+_.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(g){return g.description}};function s(g){return g.charCodeAt(0).toString(16).toUpperCase()}function i(g){return g.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(_){return"\\x0"+s(_)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(_){return"\\x"+s(_)})}function o(g){return g.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(_){return"\\x0"+s(_)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(_){return"\\x"+s(_)})}function h(g){return e[g.type](g)}function f(g){var _=g.map(h),A,d;if(_.sort(),_.length>0){for(A=1,d=1;A<_.length;A++)_[A-1]!==_[A]&&(_[d]=_[A],d++);_.length=d}switch(_.length){case 1:return _[0];case 2:return _[0]+" or "+_[1];default:return _.slice(0,-1).join(", ")+", or "+_[_.length-1]}}function u(g){return g?'"'+i(g)+'"':"end of input"}return"Expected "+f(n)+" but "+u(t)+" found."};function $s(n,t){t=t!==void 0?t:{};var e={},s=t.grammarSource,i={pgn:at},o=at,h="[",f='"',u="]",g=".",_="O-O-O",A="O-O",d="0-0-0",v="0-0",k="$",w="{",B="}",Ce=";",Ae="(",bt=")",Ue="1-0",Be="0-1",Qe="1/2-1/2",Et="*",ke=/^[a-zA-Z]/,Ge=/^[^"]/,ue=/^[0-9]/,je=/^[.]/,He=/^[a-zA-Z1-8\-=]/,St=/^[+#]/,Ve=/^[!?]/,We=/^[^}]/,ze=/^[^\r\n]/,Ye=/^[ \t\r\n]/,Ct=q("tag pair"),At=x("[",!1),Ze=x('"',!1),kt=x("]",!1),yt=q("tag name"),ye=U([["a","z"],["A","Z"]],!1,!1),$t=q("tag value"),Xe=U(['"'],!0,!1),wt=q("move number"),pe=U([["0","9"]],!1,!1),Nt=x(".",!1),Je=U(["."],!1,!1),Tt=q("standard algebraic notation"),Pt=x("O-O-O",!1),xt=x("O-O",!1),Mt=x("0-0-0",!1),It=x("0-0",!1),et=U([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),Lt=U(["+","#"],!1,!1),Ot=q("suffix annotation"),tt=U(["!","?"],!1,!1),Kt=q("NAG"),Rt=x("$",!1),Ft=q("brace comment"),qt=x("{",!1),st=U(["}"],!0,!1),Dt=x("}",!1),Ut=q("rest of line comment"),Bt=x(";",!1),it=U(["\r",`
`],!0,!1),Qt=q("variation"),Gt=x("(",!1),jt=x(")",!1),Ht=q("game termination marker"),Vt=x("1-0",!1),Wt=x("0-1",!1),zt=x("1/2-1/2",!1),Yt=x("*",!1),Zt=q("whitespace"),nt=U([" ","	","\r",`
`],!1,!1),Xt=function(r,l){return ks(r,l)},Jt=function(r){return Object.fromEntries(r)},es=function(r,l){return[r,l]},ts=function(r,l){return{root:r,marker:l}},ss=function(r,l){return As(Ss(r),...l.flat())},is=function(r,l,c,b,E){return Cs(r,l,c,b,E)},ns=function(r){return r},rs=function(r){return r.replace(/[\r\n]+/g," ")},os=function(r){return r.trim()},as=function(r){return r},ls=function(r,l){return{result:r,comment:l}},a=t.peg$currPos|0,X=[{line:1,column:1}],D=a,ge=t.peg$maxFailExpected||[],p=t.peg$silentFails|0,ae;if(t.startRule){if(!(t.startRule in i))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');o=i[t.startRule]}function x(r,l){return{type:"literal",text:r,ignoreCase:l}}function U(r,l,c){return{type:"class",parts:r,inverted:l,ignoreCase:c}}function cs(){return{type:"end"}}function q(r){return{type:"other",description:r}}function rt(r){var l=X[r],c;if(l)return l;if(r>=X.length)c=X.length-1;else for(c=r;!X[--c];);for(l=X[c],l={line:l.line,column:l.column};c<r;)n.charCodeAt(c)===10?(l.line++,l.column=1):l.column++,c++;return X[r]=l,l}function ot(r,l,c){var b=rt(r),E=rt(l),y={source:s,start:{offset:r,line:b.line,column:b.column},end:{offset:l,line:E.line,column:E.column}};return y}function m(r){a<D||(a>D&&(D=a,ge=[]),ge.push(r))}function fs(r,l,c){return new ee(ee.buildMessage(r,l),r,l,c)}function at(){var r,l,c;return r=a,l=hs(),c=gs(),r=Xt(l,c),r}function hs(){var r,l,c;for(r=a,l=[],c=lt();c!==e;)l.push(c),c=lt();return c=O(),r=Jt(l),r}function lt(){var r,l,c,b,E,y,V;return p++,r=a,O(),n.charCodeAt(a)===91?(l=h,a++):(l=e,p===0&&m(At)),l!==e?(O(),c=us(),c!==e?(O(),n.charCodeAt(a)===34?(b=f,a++):(b=e,p===0&&m(Ze)),b!==e?(E=ps(),n.charCodeAt(a)===34?(y=f,a++):(y=e,p===0&&m(Ze)),y!==e?(O(),n.charCodeAt(a)===93?(V=u,a++):(V=e,p===0&&m(kt)),V!==e?r=es(c,E):(a=r,r=e)):(a=r,r=e)):(a=r,r=e)):(a=r,r=e)):(a=r,r=e),p--,r===e&&p===0&&m(Ct),r}function us(){var r,l,c;if(p++,r=a,l=[],c=n.charAt(a),ke.test(c)?a++:(c=e,p===0&&m(ye)),c!==e)for(;c!==e;)l.push(c),c=n.charAt(a),ke.test(c)?a++:(c=e,p===0&&m(ye));else l=e;return l!==e?r=n.substring(r,a):r=l,p--,r===e&&(l=e,p===0&&m(yt)),r}function ps(){var r,l,c;for(p++,r=a,l=[],c=n.charAt(a),Ge.test(c)?a++:(c=e,p===0&&m(Xe));c!==e;)l.push(c),c=n.charAt(a),Ge.test(c)?a++:(c=e,p===0&&m(Xe));return r=n.substring(r,a),p--,l=e,p===0&&m($t),r}function gs(){var r,l,c;return r=a,l=ct(),O(),c=Es(),c===e&&(c=null),O(),r=ts(l,c),r}function ct(){var r,l,c,b;for(r=a,l=$e(),l===e&&(l=null),c=[],b=ft();b!==e;)c.push(b),b=ft();return r=ss(l,c),r}function ft(){var r,l,c,b,E,y,V,de;if(r=a,O(),ds(),O(),l=_s(),l!==e){for(c=ms(),c===e&&(c=null),b=[],E=ht();E!==e;)b.push(E),E=ht();for(E=O(),y=$e(),y===e&&(y=null),V=[],de=ut();de!==e;)V.push(de),de=ut();r=is(l,c,b,y,V)}else a=r,r=e;return r}function ds(){var r,l,c,b,E,y;for(p++,r=a,l=[],c=n.charAt(a),ue.test(c)?a++:(c=e,p===0&&m(pe));c!==e;)l.push(c),c=n.charAt(a),ue.test(c)?a++:(c=e,p===0&&m(pe));if(n.charCodeAt(a)===46?(c=g,a++):(c=e,p===0&&m(Nt)),c!==e){for(b=O(),E=[],y=n.charAt(a),je.test(y)?a++:(y=e,p===0&&m(Je));y!==e;)E.push(y),y=n.charAt(a),je.test(y)?a++:(y=e,p===0&&m(Je));l=[l,c,b,E],r=l}else a=r,r=e;return p--,r===e&&(l=e,p===0&&m(wt)),r}function _s(){var r,l,c,b,E,y;if(p++,r=a,l=a,n.substr(a,5)===_?(c=_,a+=5):(c=e,p===0&&m(Pt)),c===e&&(n.substr(a,3)===A?(c=A,a+=3):(c=e,p===0&&m(xt)),c===e&&(n.substr(a,5)===d?(c=d,a+=5):(c=e,p===0&&m(Mt)),c===e&&(n.substr(a,3)===v?(c=v,a+=3):(c=e,p===0&&m(It)),c===e))))if(c=a,b=n.charAt(a),ke.test(b)?a++:(b=e,p===0&&m(ye)),b!==e){if(E=[],y=n.charAt(a),He.test(y)?a++:(y=e,p===0&&m(et)),y!==e)for(;y!==e;)E.push(y),y=n.charAt(a),He.test(y)?a++:(y=e,p===0&&m(et));else E=e;E!==e?(b=[b,E],c=b):(a=c,c=e)}else a=c,c=e;return c!==e?(b=n.charAt(a),St.test(b)?a++:(b=e,p===0&&m(Lt)),b===e&&(b=null),c=[c,b],l=c):(a=l,l=e),l!==e?r=n.substring(r,a):r=l,p--,r===e&&(l=e,p===0&&m(Tt)),r}function ms(){var r,l,c;for(p++,r=a,l=[],c=n.charAt(a),Ve.test(c)?a++:(c=e,p===0&&m(tt));c!==e;)l.push(c),l.length>=2?c=e:(c=n.charAt(a),Ve.test(c)?a++:(c=e,p===0&&m(tt)));return l.length<1?(a=r,r=e):r=l,p--,r===e&&(l=e,p===0&&m(Ot)),r}function ht(){var r,l,c,b,E;if(p++,r=a,O(),n.charCodeAt(a)===36?(l=k,a++):(l=e,p===0&&m(Rt)),l!==e){if(c=a,b=[],E=n.charAt(a),ue.test(E)?a++:(E=e,p===0&&m(pe)),E!==e)for(;E!==e;)b.push(E),E=n.charAt(a),ue.test(E)?a++:(E=e,p===0&&m(pe));else b=e;b!==e?c=n.substring(c,a):c=b,c!==e?r=ns(c):(a=r,r=e)}else a=r,r=e;return p--,r===e&&p===0&&m(Kt),r}function $e(){var r;return r=vs(),r===e&&(r=bs()),r}function vs(){var r,l,c,b,E;if(p++,r=a,n.charCodeAt(a)===123?(l=w,a++):(l=e,p===0&&m(qt)),l!==e){for(c=a,b=[],E=n.charAt(a),We.test(E)?a++:(E=e,p===0&&m(st));E!==e;)b.push(E),E=n.charAt(a),We.test(E)?a++:(E=e,p===0&&m(st));c=n.substring(c,a),n.charCodeAt(a)===125?(b=B,a++):(b=e,p===0&&m(Dt)),b!==e?r=rs(c):(a=r,r=e)}else a=r,r=e;return p--,r===e&&(l=e,p===0&&m(Ft)),r}function bs(){var r,l,c,b,E;if(p++,r=a,n.charCodeAt(a)===59?(l=Ce,a++):(l=e,p===0&&m(Bt)),l!==e){for(c=a,b=[],E=n.charAt(a),ze.test(E)?a++:(E=e,p===0&&m(it));E!==e;)b.push(E),E=n.charAt(a),ze.test(E)?a++:(E=e,p===0&&m(it));c=n.substring(c,a),r=os(c)}else a=r,r=e;return p--,r===e&&(l=e,p===0&&m(Ut)),r}function ut(){var r,l,c,b;return p++,r=a,O(),n.charCodeAt(a)===40?(l=Ae,a++):(l=e,p===0&&m(Gt)),l!==e?(c=ct(),c!==e?(O(),n.charCodeAt(a)===41?(b=bt,a++):(b=e,p===0&&m(jt)),b!==e?r=as(c):(a=r,r=e)):(a=r,r=e)):(a=r,r=e),p--,r===e&&p===0&&m(Qt),r}function Es(){var r,l,c;return p++,r=a,n.substr(a,3)===Ue?(l=Ue,a+=3):(l=e,p===0&&m(Vt)),l===e&&(n.substr(a,3)===Be?(l=Be,a+=3):(l=e,p===0&&m(Wt)),l===e&&(n.substr(a,7)===Qe?(l=Qe,a+=7):(l=e,p===0&&m(zt)),l===e&&(n.charCodeAt(a)===42?(l=Et,a++):(l=e,p===0&&m(Yt))))),l!==e?(O(),c=$e(),c===e&&(c=null),r=ls(l,c)):(a=r,r=e),p--,r===e&&(l=e,p===0&&m(Ht)),r}function O(){var r,l;for(p++,r=[],l=n.charAt(a),Ye.test(l)?a++:(l=e,p===0&&m(nt));l!==e;)r.push(l),l=n.charAt(a),Ye.test(l)?a++:(l=e,p===0&&m(nt));return p--,l=e,p===0&&m(Zt),r}if(ae=o(),t.peg$library)return{peg$result:ae,peg$currPos:a,peg$FAILED:e,peg$maxFailExpected:ge,peg$maxFailPos:D};if(ae!==e&&a===n.length)return ae;throw ae!==e&&a<n.length&&m(cs()),fs(ge,D<n.length?n.charAt(D):null,D<n.length?ot(D,D+1):ot(D,D))}var me=0xffffffffffffffffn;function Ne(n,t){return(n<<t|n>>64n-t)&0xffffffffffffffffn}function pt(n,t){return n*t&me}function ws(n){return function(){let t=BigInt(n&me),e=BigInt(n>>64n&me),s=pt(Ne(pt(t,5n),7n),9n);return e^=t,t=(Ne(t,24n)^e^e<<16n)&me,e=Ne(e,37n),n=e<<64n|t,s}}var be=ws(0xa187eb39cdcaed8f31c4b365b102e01en),Ns=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>be()))),Ts=Array.from({length:8},()=>be()),Ps=Array.from({length:16},()=>be()),Te=be(),L="w",K="b",N="p",Le="n",ve="b",ce="r",j="q",P="k",Pe="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",J=class{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(t,e){let{color:s,piece:i,from:o,to:h,flags:f,captured:u,promotion:g}=e,_=M(o),A=M(h);this.color=s,this.piece=i,this.from=_,this.to=A,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=_+A,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(let d in C)C[d]&f&&(this.flags+=W[d]);u&&(this.captured=u),g&&(this.promotion=g,this.lan+=g)}isCapture(){return this.flags.indexOf(W.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(W.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(W.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(W.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(W.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(W.BIG_PAWN)>-1}},I=-1,W={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"};var C={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},Oe={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},xs={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Ms={...Oe,...xs},S={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},xe={b:[16,32,17,15],w:[-16,-32,-17,-15]},gt={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Is=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Ls=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Os={p:1,n:2,b:4,r:8,q:16,k:32},Ks="pnbrqkPNBRQK",dt=[Le,ve,ce,j],Rs=7,Fs=6,qs=1,Ds=0,_e={[P]:C.KSIDE_CASTLE,[j]:C.QSIDE_CASTLE},Q={w:[{square:S.a1,flag:C.QSIDE_CASTLE},{square:S.h1,flag:C.KSIDE_CASTLE}],b:[{square:S.a8,flag:C.QSIDE_CASTLE},{square:S.h8,flag:C.KSIDE_CASTLE}]},Us={b:qs,w:Fs},Me="--";function z(n){return n>>4}function fe(n){return n&15}function mt(n){return"0123456789".indexOf(n)!==-1}function M(n){let t=fe(n),e=z(n);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function le(n){return n===L?K:L}function Bs(n){let t=n.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};let e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};let s=parseInt(t[4],10);if(isNaN(s)||s<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};let i=t[0].split("/");if(i.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let h=0;h<i.length;h++){let f=0,u=!1;for(let g=0;g<i[h].length;g++)if(mt(i[h][g])){if(u)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};f+=parseInt(i[h][g],10),u=!0}else{if(!/^[prnbqkPRNBQK]$/.test(i[h][g]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};f+=1,u=!1}if(f!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};let o=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(let{color:h,regex:f}of o){if(!f.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${h} king`};if((t[0].match(f)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${h} kings`}}return Array.from(i[0]+i[7]).some(h=>h.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Qs(n,t){let e=n.from,s=n.to,i=n.piece,o=0,h=0,f=0;for(let u=0,g=t.length;u<g;u++){let _=t[u].from,A=t[u].to,d=t[u].piece;i===d&&e!==_&&s===A&&(o++,z(e)===z(_)&&h++,fe(e)===fe(_)&&f++)}return o>0?h>0&&f>0?M(e):f>0?M(e).charAt(1):M(e).charAt(0):""}function G(n,t,e,s,i,o=void 0,h=C.NORMAL){let f=z(s);if(i===N&&(f===Rs||f===Ds))for(let u=0;u<dt.length;u++){let g=dt[u];n.push({color:t,from:e,to:s,piece:i,captured:o,promotion:g,flags:h|C.PROMOTION})}else n.push({color:t,from:e,to:s,piece:i,captured:o,flags:h})}function _t(n){let t=n.charAt(0);return t>="a"&&t<="h"?n.match(/[a-h]\d.*[a-h]\d/)?void 0:N:(t=t.toLowerCase(),t==="o"?P:t)}function Ie(n){return n.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}var te=class{_board=new Array(128);_turn=L;_header={};_kings={w:I,b:I};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(t=Pe,{skipValidation:e=!1}={}){this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:I,b:I},this._turn=L,this._castling={w:0,b:0},this._epSquare=I,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...Ms},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:s=!1}={}){let i=t.split(/\s+/);if(i.length>=2&&i.length<6){let f=["-","-","0","1"];t=i.concat(f.slice(-(6-i.length))).join(" ")}if(i=t.split(/\s+/),!e){let{ok:f,error:u}=Bs(t);if(!f)throw new Error(u)}let o=i[0],h=0;this.clear({preserveHeaders:s});for(let f=0;f<o.length;f++){let u=o.charAt(f);if(u==="/")h+=8;else if(mt(u))h+=parseInt(u,10);else{let g=u<"a"?L:K;this._put({type:u.toLowerCase(),color:g},M(h)),h++}}this._turn=i[1],i[2].indexOf("K")>-1&&(this._castling.w|=C.KSIDE_CASTLE),i[2].indexOf("Q")>-1&&(this._castling.w|=C.QSIDE_CASTLE),i[2].indexOf("k")>-1&&(this._castling.b|=C.KSIDE_CASTLE),i[2].indexOf("q")>-1&&(this._castling.b|=C.QSIDE_CASTLE),this._epSquare=i[3]==="-"?I:S[i[3]],this._halfMoves=parseInt(i[4],10),this._moveNumber=parseInt(i[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){let e=0,s="";for(let h=S.a8;h<=S.h1;h++){if(this._board[h]){e>0&&(s+=e,e=0);let{color:f,type:u}=this._board[h];s+=f===L?u.toUpperCase():u.toLowerCase()}else e++;h+1&136&&(e>0&&(s+=e),h!==S.h1&&(s+="/"),e=0,h+=8)}let i="";this._castling[L]&C.KSIDE_CASTLE&&(i+="K"),this._castling[L]&C.QSIDE_CASTLE&&(i+="Q"),this._castling[K]&C.KSIDE_CASTLE&&(i+="k"),this._castling[K]&C.QSIDE_CASTLE&&(i+="q"),i=i||"-";let o="-";if(this._epSquare!==I)if(t)o=M(this._epSquare);else{let h=this._epSquare+(this._turn===L?16:-16),f=[h+1,h-1];for(let u of f){if(u&136)continue;let g=this._turn;if(this._board[u]?.color===g&&this._board[u]?.type===N){this._makeMove({color:g,from:u,to:this._epSquare,piece:N,captured:N,flags:C.EP_CAPTURE});let _=!this._isKingAttacked(g);if(this._undoMove(),_){o=M(this._epSquare);break}}}}return[s,this._turn,i,o,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;let{color:e,type:s}=this._board[t],i={w:0,b:1}[e],o={p:0,n:1,b:2,r:3,q:4,k:5}[s];return Ns[i][o][t]}_epKey(){return this._epSquare===I?0n:Ts[this._epSquare&7]}_castlingKey(){let t=this._castling.w>>5|this._castling.b>>3;return Ps[t]}_computeHash(){let t=0n;for(let e=S.a8;e<=S.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=Te),t}_updateSetup(t){this._history.length>0||(t!==Pe?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(Pe)}get(t){return this._board[S[t]]}findPiece(t){let e=[];for(let s=S.a8;s<=S.h1;s++){if(s&136){s+=7;continue}!this._board[s]||this._board[s]?.color!==t.color||this._board[s].color===t.color&&this._board[s].type===t.type&&e.push(M(s))}return e}put({type:t,color:e},s){return this._put({type:t,color:e},s)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},s){if(Ks.indexOf(t.toLowerCase())===-1||!(s in S))return!1;let i=S[s];if(t==P&&!(this._kings[e]==I||this._kings[e]==i))return!1;let o=this._board[i];return o&&o.type===P&&(this._kings[o.color]=I),this._set(i,{type:t,color:e}),t===P&&(this._kings[e]=i),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){let e=this.get(t);return this._clear(S[t]),e&&e.type===P&&(this._kings[e.color]=I),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){this._hash^=this._castlingKey();let t=this._board[S.e1]?.type===P&&this._board[S.e1]?.color===L,e=this._board[S.e8]?.type===P&&this._board[S.e8]?.color===K;(!t||this._board[S.a1]?.type!==ce||this._board[S.a1]?.color!==L)&&(this._castling.w&=-65),(!t||this._board[S.h1]?.type!==ce||this._board[S.h1]?.color!==L)&&(this._castling.w&=-33),(!e||this._board[S.a8]?.type!==ce||this._board[S.a8]?.color!==K)&&(this._castling.b&=-65),(!e||this._board[S.h8]?.type!==ce||this._board[S.h8]?.color!==K)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===I)return;let t=this._epSquare+(this._turn===L?-16:16),e=this._epSquare+(this._turn===L?16:-16),s=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||this._board[e]?.color!==le(this._turn)||this._board[e]?.type!==N){this._hash^=this._epKey(),this._epSquare=I;return}let i=o=>!(o&136)&&this._board[o]?.color===this._turn&&this._board[o]?.type===N;s.some(i)||(this._hash^=this._epKey(),this._epSquare=I)}_attacked(t,e,s){let i=[];for(let o=S.a8;o<=S.h1;o++){if(o&136){o+=7;continue}if(this._board[o]===void 0||this._board[o].color!==t)continue;let h=this._board[o],f=o-e;if(f===0)continue;let u=f+119;if(Is[u]&Os[h.type]){if(h.type===N){if(f>0&&h.color===L||f<=0&&h.color===K)if(s)i.push(M(o));else return!0;continue}if(h.type==="n"||h.type==="k")if(s){i.push(M(o));continue}else return!0;let g=Ls[u],_=o+g,A=!1;for(;_!==e;){if(this._board[_]!=null){A=!0;break}_+=g}if(!A)if(s){i.push(M(o));continue}else return!0}}return s?i:!1}attackers(t,e){return e?this._attacked(e,S[t],!0):this._attacked(this._turn,S[t],!0)}_isKingAttacked(t){let e=this._kings[t];return e===-1?!1:this._attacked(le(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,S[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){let t={b:0,n:0,r:0,q:0,k:0,p:0},e=[],s=0,i=0;for(let o=S.a8;o<=S.h1;o++){if(i=(i+1)%2,o&136){o+=7;continue}let h=this._board[o];h&&(t[h.type]=h.type in t?t[h.type]+1:1,h.type===ve&&e.push(i),s++)}if(s===2)return!0;if(s===3&&(t[ve]===1||t[Le]===1))return!0;if(s===t[ve]+2){let o=0,h=e.length;for(let f=0;f<h;f++)o+=e[f];if(o===0||o===h)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:s=void 0}={}){let i=this._moves({square:e,piece:s});return t?i.map(o=>new J(this,o)):i.map(o=>this._moveToSan(o,i))}_moves({legal:t=!0,piece:e=void 0,square:s=void 0}={}){let i=s?s.toLowerCase():void 0,o=e?.toLowerCase(),h=[],f=this._turn,u=le(f),g=S.a8,_=S.h1,A=!1;if(i)if(i in S)g=_=S[i],A=!0;else return[];for(let v=g;v<=_;v++){if(v&136){v+=7;continue}if(!this._board[v]||this._board[v].color===u)continue;let{type:k}=this._board[v],w;if(k===N){if(o&&o!==k)continue;w=v+xe[f][0],this._board[w]||(G(h,f,v,w,N),w=v+xe[f][1],Us[f]===z(v)&&!this._board[w]&&G(h,f,v,w,N,void 0,C.BIG_PAWN));for(let B=2;B<4;B++)w=v+xe[f][B],!(w&136)&&(this._board[w]?.color===u?G(h,f,v,w,N,this._board[w].type,C.CAPTURE):w===this._epSquare&&G(h,f,v,w,N,N,C.EP_CAPTURE))}else{if(o&&o!==k)continue;for(let B=0,Ce=gt[k].length;B<Ce;B++){let Ae=gt[k][B];for(w=v;w+=Ae,!(w&136);){if(!this._board[w])G(h,f,v,w,k);else{if(this._board[w].color===f)break;G(h,f,v,w,k,this._board[w].type,C.CAPTURE);break}if(k===Le||k===P)break}}}}if((o===void 0||o===P)&&(!A||_===this._kings[f])){if(this._castling[f]&C.KSIDE_CASTLE){let v=this._kings[f],k=v+2;!this._board[v+1]&&!this._board[k]&&!this._attacked(u,this._kings[f])&&!this._attacked(u,v+1)&&!this._attacked(u,k)&&G(h,f,this._kings[f],k,P,void 0,C.KSIDE_CASTLE)}if(this._castling[f]&C.QSIDE_CASTLE){let v=this._kings[f],k=v-2;!this._board[v-1]&&!this._board[v-2]&&!this._board[v-3]&&!this._attacked(u,this._kings[f])&&!this._attacked(u,v-1)&&!this._attacked(u,k)&&G(h,f,this._kings[f],k,P,void 0,C.QSIDE_CASTLE)}}if(!t||this._kings[f]===-1)return h;let d=[];for(let v=0,k=h.length;v<k;v++)this._makeMove(h[v]),this._isKingAttacked(f)||d.push(h[v]),this._undoMove();return d}move(t,{strict:e=!1}={}){let s=null;if(typeof t=="string")s=this._moveFromSan(t,e);else if(t===null)s=this._moveFromSan(Me,e);else if(typeof t=="object"){let o=this._moves();for(let h=0,f=o.length;h<f;h++)if(t.from===M(o[h].from)&&t.to===M(o[h].to)&&(!("promotion"in o[h])||t.promotion===o[h].promotion)){s=o[h];break}}if(!s)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&s.flags&C.NULL_MOVE)throw new Error("Null move not allowed when in check");let i=new J(this,s);return this._makeMove(s),this._incPositionCount(),i}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){let e=this._turn,s=le(e);if(this._push(t),t.flags&C.NULL_MOVE){e===K&&this._moveNumber++,this._halfMoves++,this._turn=s,this._epSquare=I;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&C.EP_CAPTURE&&(this._turn===K?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===P){if(this._kings[e]=t.to,t.flags&C.KSIDE_CASTLE){let i=t.to-1,o=t.to+1;this._movePiece(o,i)}else if(t.flags&C.QSIDE_CASTLE){let i=t.to+1,o=t.to-2;this._movePiece(o,i)}this._castling[e]=0}if(this._castling[e]){for(let i=0,o=Q[e].length;i<o;i++)if(t.from===Q[e][i].square&&this._castling[e]&Q[e][i].flag){this._castling[e]^=Q[e][i].flag;break}}if(this._castling[s]){for(let i=0,o=Q[s].length;i<o;i++)if(t.to===Q[s][i].square&&this._castling[s]&Q[s][i].flag){this._castling[s]^=Q[s][i].flag;break}}if(this._hash^=this._castlingKey(),t.flags&C.BIG_PAWN){let i;e===K?i=t.to-16:i=t.to+16,!(t.to-1&136)&&this._board[t.to-1]?.type===N&&this._board[t.to-1]?.color===s||!(t.to+1&136)&&this._board[t.to+1]?.type===N&&this._board[t.to+1]?.color===s?(this._epSquare=i,this._hash^=this._epKey()):this._epSquare=I}else this._epSquare=I;t.piece===N?this._halfMoves=0:t.flags&(C.CAPTURE|C.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===K&&this._moveNumber++,this._turn=s,this._hash^=Te}undo(){let t=this._hash,e=this._undoMove();if(e){let s=new J(this,e);return this._decPositionCount(t),s}return null}_undoMove(){let t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();let e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=Te;let s=this._turn,i=le(s);if(e.flags&C.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:s})),e.captured)if(e.flags&C.EP_CAPTURE){let o;s===K?o=e.to-16:o=e.to+16,this._set(o,{type:N,color:i})}else this._set(e.to,{type:e.captured,color:i});if(e.flags&(C.KSIDE_CASTLE|C.QSIDE_CASTLE)){let o,h;e.flags&C.KSIDE_CASTLE?(o=e.to+1,h=e.to-1):(o=e.to-2,h=e.to+1),this._movePiece(h,o)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){let s=[],i=!1;for(let d in this._header)this._header[d]&&s.push(`[${d} "${this._header[d]}"]`+t),i=!0;i&&this._history.length&&s.push(t);let o=d=>{let v=this._comments[this.fen()];if(typeof v<"u"){let k=d.length>0?" ":"";d=`${d}${k}{${v}}`}return d},h=[];for(;this._history.length>0;)h.push(this._undoMove());let f=[],u="";for(h.length===0&&f.push(o(""));h.length>0;){u=o(u);let d=h.pop();if(!d)break;if(!this._history.length&&d.color==="b"){let v=`${this._moveNumber}. ...`;u=u?`${u} ${v}`:v}else d.color==="w"&&(u.length&&f.push(u),u=this._moveNumber+".");u=u+" "+this._moveToSan(d,this._moves({legal:!0})),this._makeMove(d)}if(u.length&&f.push(o(u)),f.push(this._header.Result||"*"),e===0)return s.join("")+f.join(" ");let g=function(){return s.length>0&&s[s.length-1]===" "?(s.pop(),!0):!1},_=function(d,v){for(let k of v.split(" "))if(k){if(d+k.length>e){for(;g();)d--;s.push(t),d=0}s.push(k),d+=k.length,s.push(" "),d++}return g()&&d--,d},A=0;for(let d=0;d<f.length;d++){if(A+f[d].length>e&&f[d].includes("{")){A=_(A,f[d]);continue}A+f[d].length>e&&d!==0?(s[s.length-1]===" "&&s.pop(),s.push(t),A=0):d!==0&&(s.push(" "),A++),s.push(f[d]),A+=f[d].length}return s.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??Oe[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=Oe[t]||null,!0):!1}getHeaders(){let t={};for(let[e,s]of Object.entries(this._header))s!==null&&(t[e]=s);return t}loadPgn(t,{strict:e=!1,newlineChar:s=`\r?
`}={}){s!==`\r?
`&&(t=t.replace(new RegExp(s,"g"),`
`));let i=$s(t);this.reset();let o=i.headers,h="";for(let g in o)g.toLowerCase()==="fen"&&(h=o[g]),this.header(g,o[g]);if(!e)h&&this.load(h,{preserveHeaders:!0});else if(o.SetUp==="1"){if(!("FEN"in o))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(o.FEN,{preserveHeaders:!0})}let f=i.root;for(;f;){if(f.move){let g=this._moveFromSan(f.move,e);if(g==null)throw new Error(`Invalid move in PGN: ${f.move}`);this._makeMove(g),this._incPositionCount()}f.comment!==void 0&&(this._comments[this.fen()]=f.comment),f=f.variations[0]}let u=i.result;u&&Object.keys(this._header).length&&this._header.Result!==u&&this.setHeader("Result",u)}_moveToSan(t,e){let s="";if(t.flags&C.KSIDE_CASTLE)s="O-O";else if(t.flags&C.QSIDE_CASTLE)s="O-O-O";else{if(t.flags&C.NULL_MOVE)return Me;if(t.piece!==N){let i=Qs(t,e);s+=t.piece.toUpperCase()+i}t.flags&(C.CAPTURE|C.EP_CAPTURE)&&(t.piece===N&&(s+=M(t.from)[0]),s+="x"),s+=M(t.to),t.promotion&&(s+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?s+="#":s+="+"),this._undoMove(),s}_moveFromSan(t,e=!1){let s=Ie(t);if(e||(s==="0-0"?s="O-O":s==="0-0-0"&&(s="O-O-O")),s==Me)return{color:this._turn,from:0,to:0,piece:"k",flags:C.NULL_MOVE};let i=_t(s),o=this._moves({legal:!0,piece:i});for(let d=0,v=o.length;d<v;d++)if(s===Ie(this._moveToSan(o[d],o)))return o[d];if(e)return null;let h,f,u,g,_,A=!1;if(f=s.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),f?(h=f[1],u=f[2],g=f[3],_=f[4],u.length==1&&(A=!0)):(f=s.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),f&&(h=f[1],u=f[2],g=f[3],_=f[4],u.length==1&&(A=!0))),i=_t(s),o=this._moves({legal:!0,piece:h||i}),!g)return null;for(let d=0,v=o.length;d<v;d++)if(u){if((!h||h.toLowerCase()==o[d].piece)&&S[u]==o[d].from&&S[g]==o[d].to&&(!_||_.toLowerCase()==o[d].promotion))return o[d];if(A){let k=M(o[d].from);if((!h||h.toLowerCase()==o[d].piece)&&S[g]==o[d].to&&(u==k[0]||u==k[1])&&(!_||_.toLowerCase()==o[d].promotion))return o[d]}}else if(s===Ie(this._moveToSan(o[d],o)).replace("x",""))return o[d];return null}ascii(){let t=`   +------------------------+
`;for(let e=S.a8;e<=S.h1;e++){if(fe(e)===0&&(t+=" "+"87654321"[z(e)]+" |"),this._board[e]){let s=this._board[e].type,o=this._board[e].color===L?s.toUpperCase():s.toLowerCase();t+=" "+o+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){let e=this._moves({legal:!1}),s=0,i=this._turn;for(let o=0,h=e.length;o<h;o++)this._makeMove(e[o]),this._isKingAttacked(i)||(t-1>0?s+=this.perft(t-1):s++),this._undoMove();return s}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){let t=[],e=[];for(let s=S.a8;s<=S.h1;s++)this._board[s]==null?e.push(null):e.push({square:M(s),type:this._board[s].type,color:this._board[s].color}),s+1&136&&(t.push(e),e=[],s+=8);return t}squareColor(t){if(t in S){let e=S[t];return(z(e)+fe(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){let e=[],s=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){let i=e.pop();if(!i)break;t?s.push(new J(this,i)):s.push(this._moveToSan(i,this._moves())),this._makeMove(i)}return s}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){let e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){let t=[],e={},s=i=>{i in this._comments&&(e[i]=this._comments[i])};for(;this._history.length>0;)t.push(this._undoMove());for(s(this.fen());;){let i=t.pop();if(!i)break;this._makeMove(i),s(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){let t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{let e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(let i of[P,j])e[i]!==void 0&&(e[i]?this._castling[t]|=_e[i]:this._castling[t]&=~_e[i]);this._updateCastlingRights();let s=this.getCastlingRights(t);return(e[P]===void 0||e[P]===s[P])&&(e[j]===void 0||e[j]===s[j])}getCastlingRights(t){return{[P]:(this._castling[t]&_e[P])!==0,[j]:(this._castling[t]&_e[j])!==0}}moveNumber(){return this._moveNumber}};
const Chess = te;

// ChessLens 2.0 — persistent panel. Only text changes; cards and line rows are never remounted.
const $ = id => document.getElementById(id);
const put = (id, value) => { const el = $(id); const next = String(value); if (el && el.textContent !== next) el.textContent = next; };
const positionKey = (fen, analysisDepth) => `${analysisDepth}|${fen}`;
const cached = new Map();
const MAX_CACHED_POSITIONS = 120;
let port, worker, ready = false, thinking = false, stopping = false;
let queued = null, current = null, viewed = null, siteState = null;
let depth = 14, showArrow = true, engineError = '', boundTabId = null;
let activePanelVisible = false, hasDisplayedAnalysis = false;
let engineStartupTimer, engineRetryTimer, engineFailures=0;
let lastArrow = undefined, arrowClearTimer;
const rowElements = [];
const reviewKinds = ['brilliant', 'great', 'best', 'excellent', 'good', 'inaccuracy', 'mistake', 'miss', 'blunder'];
let renderedTimeline;

function renderReviewChart(timeline, ply) {
  const x = index => 4 + 312 * index / Math.max(1, timeline.length - 1);
  const y = score => 38 - score * 4;
  const timelineKey = JSON.stringify(timeline);
  if (timelineKey !== renderedTimeline) {
    renderedTimeline = timelineKey;
    const segments = [];
    let segment = [];
    timeline.forEach((score, index) => {
      if (Number.isFinite(score)) {
        if (!segment.length) segments.push(segment);
        segment.push([x(index), y(score)]);
      } else {
        segment = [];
      }
    });
    const path = points => 'M' + points.join('L');
    $('review-chart-line').setAttribute('d', segments.map(points =>
      path(points.length === 1 ? [points[0], points[0]] : points)).join(''));
    $('review-chart-area').setAttribute('d', segments.map(points =>
      path(points) + `L${points.at(-1)[0]},38L${points[0][0]},38Z`).join(''));
  }
  const selected = Number.isInteger(ply) && ply >= 0 && ply < timeline.length;
  const score = selected ? timeline[ply] : null;
  const hasScore = Number.isFinite(score);
  $('review-chart-cursor').setAttribute('d', selected ? `M${x(ply)} 0V76` : '');
  const point = $('review-chart-point');
  point.style.display = hasScore ? '' : 'none';
  if (hasScore) {
    point.setAttribute('cx', x(ply));
    point.setAttribute('cy', y(score));
  }
  const label = !hasScore ? '—' : Math.abs(score) < .005 ? '0.00'
    : `${Math.abs(score) === 8 ? '≥' : ''}${Math.abs(score).toFixed(2)} · ${score > 0 ? 'White' : 'Black'}`;
  put('review-chart-value', label);
}

function renderGameReview(review) {
  $('game-review').hidden = !review;
  if (!review) return;
  const { w, b } = review.sides;
  renderReviewChart(review.timeline || [], review.ply);
  for (const [color, side] of Object.entries({ w, b })) {
    put(`review-accuracy-${color}`, Number.isFinite(side.accuracy) ? `${side.accuracy.toFixed(1)}%` : '—');
  }
  for (const kind of reviewKinds) {
    put(`review-${kind}-w`, w.counts[kind] || 0);
    put(`review-${kind}-b`, b.counts[kind] || 0);
  }
  put('review-white', `${w.reviewed}/${w.total}`);
  put('review-black', `${b.reviewed}/${b.total}`);
}

for (const kind of reviewKinds) {
  const row = $('review-counts').insertRow();
  const label = document.createElement('th');
  label.scope = 'row';
  const category = document.createElement('span');
  category.className = 'review-category';
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = chessLensBadgeArtwork(kind);
  category.append(icon, chessLensBadgeLabel(kind));
  label.append(category);
  row.append(label);
  for (const side of ['w', 'b']) row.insertCell().id = `review-${kind}-${side}`;
}

const settings = chrome.storage.local.get(['depth', 'showArrow']).then(values => {
  depth = Math.max(8, Math.min(20, Number(values.depth) || 14));
  showArrow = values.showArrow !== false;
  $('depth').value = depth;
  put('depth-value', depth);
  $('toggle-arrows').checked = showArrow;
}).catch(error => console.warn('[ChessLens] Settings unavailable:', error));

function cacheFor(key) {
  if (!cached.has(key)) {
    if (cached.size >= MAX_CACHED_POSITIONS) cached.delete(cached.keys().next().value);
    cached.set(key, { lines: new Map(), completed: false });
  }
  return cached.get(key);
}

function connect() {
  try {
    port = chrome.runtime.connect({ name: 'chesslens-panel' });
    lastArrow = undefined;
    port.onMessage.addListener(msg => {
      if (msg.type === 'CONNECTED') {
        const changedTab = boundTabId !== null && boundTabId !== msg.tabId;
        boundTabId = msg.tabId;
        if (changedTab) {
          siteState = null;
          stopAnalysis();
          clearTimeout(arrowClearTimer);
          arrowClearTimer = undefined;
          lastArrow = undefined;
          toggleActive(false);
        }
      }
      if (msg.type === 'SNAPSHOT') {
        const resume=siteState?.positionPending&&siteState.gameKey===msg.state.gameKey;
        if(siteState?.gameKey!==msg.state.gameKey){
          stopAnalysis();
          toggleActive(false);
        }
        siteState = msg.state;
        refreshState(resume);
      }
    });
    port.onDisconnect.addListener(() => {
      void chrome.runtime.lastError;
      port = null;
      siteState=activePanelVisible&&siteState?.gameKey
        ?{allowed:false,gameKey:siteState.gameKey,positionPending:true}:null;
      refreshState();
      lastArrow = undefined;
      setTimeout(connect, 800);
    });
    port.postMessage({ type: 'GET_STATE' });
  } catch { setTimeout(connect, 800); }
}

function setEngineStatus(message, active = false) {
  put('engine-status', message);
  const led = document.querySelector('.status-led');
  if (led) led.classList.toggle('on', active);
}
function formatScore(cp, mate) {
  if (mate !== null && mate !== undefined) return `${mate > 0 ? '+' : ''}M${mate}`;
  return `${cp >= 0 ? '+' : ''}${(cp / 100).toFixed(2)}`;
}
function makeWinnerLabel(cp, mate) {
  const whiteGood = mate !== null ? mate > 0 : cp > 45;
  const blackGood = mate !== null ? mate < 0 : cp < -45;
  if (!whiteGood && !blackGood) return ['Even', 'Position is balanced'];
  const winningSide = whiteGood ? 'White is better' : 'Black is better';
  return [winningSide, mate !== null ? 'Forced mate' : Math.abs(cp) >= 300 ? 'Winning advantage' : Math.abs(cp) >= 120 ? 'Clear advantage' : 'Small edge'];
}
function sanFromUci(fen, moves, maxMoves = 7) {
  const chess = new Chess(fen), output = [];
  for (const uci of moves.slice(0, maxMoves)) {
    if (!/^[a-h][1-8][a-h][1-8][qrbn]?$/.test(uci)) break;
    try {
      const turn = chess.turn(), number = chess.moveNumber();
      const played = chess.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] || 'q' });
      if (!played) break;
      output.push(`${turn === 'w' ? number + '.' : number + '...'}${played.san}`);
    } catch { break; }
  }
  return output;
}
function infoFromLine(line) {
  if (!line.startsWith('info ') || !line.includes(' pv ') || /\b(?:upperbound|lowerbound)\b/.test(line)) return null;
  const d = /\bdepth (\d+)/.exec(line), mp = /\bmultipv (\d+)/.exec(line);
  const sc = /\bscore (cp|mate) (-?\d+)/.exec(line), pv = /\bpv ([a-z0-9 ]+)/.exec(line);
  if (!d || !sc || !pv) return null;
  const num = Number(mp?.[1] || 1);
  if (num < 1 || num > 3) return null;
  return { depth: Number(d[1]), num, type: sc[1], value: Number(sc[2]), pv: pv[1].trim().split(/\s+/) };
}
function ensureRows() {
  if (rowElements.length) return;
  const parent = $('lines');
  // The rows are created exactly once, including the initial loading state.
  for (let i = 1; i <= 3; i++) {
    const item = document.createElement('div'); item.className = 'line-item';
    const number = document.createElement('span'); number.className = 'line-number'; number.textContent = String(i);
    const body = document.createElement('div'); body.className = 'line-body';
    const move = document.createElement('div'); move.className = 'line-move'; move.textContent = '—';
    const sequence = document.createElement('div'); sequence.className = 'line-seq'; sequence.textContent = 'Waiting for analysis';
    const score = document.createElement('span'); score.className = 'line-eval'; score.textContent = '—';
    body.append(move, sequence); item.append(number, body, score); parent.append(item);
    rowElements.push({ item, move, sequence, score });
  }
}
function setField(el, value) {
  const next = String(value);
  if (el.textContent !== next) el.textContent = next;
}
function describeMove(move) {
  const san = move.replace(/^\d+\.(?:\.\.)?\s*/, '');
  if (san.includes('#')) return 'Checkmate';
  if (/^[O0]-[O0]-[O0]/.test(san)) return 'Queenside castling';
  if (/^[O0]-[O0]/.test(san)) return 'Kingside castling';
  if (/=[QRBN]/.test(san)) return 'Pawn promotion';
  return san.includes('+') ? 'Check' : '';
}
function showPendingArrow() {
  const current = siteState?.review?.current;
  if (current?.fen === viewed?.fen && current?.best) sendArrow(current.best);
  else if (lastArrow && !arrowClearTimer) arrowClearTimer = setTimeout(() => sendArrow(null), 180);
}
function render() {
  if (!siteState?.allowed || !viewed) return;
  const entry = cached.get(viewed.key);
  const completed = !!entry?.completed;
  put('working', engineError ? 'Analysis unavailable' : completed ? '' : 'Updating…');
  // Hold the last complete view while Stockfish searches the new position.
  if (!completed && hasDisplayedAnalysis) {
    showPendingArrow();
    return;
  }
  const entries = completed ? entry.lines : new Map();
  const top = entries.get(1);
  const factor = viewed.fen.split(' ')[1] === 'w' ? 1 : -1;
  const depthFound = top?.depth || 0;
  put('depth-caption', `depth ${depthFound || '—'}`);
  if (top) {
    const cp = top.type === 'cp' ? top.value * factor : 0;
    const mate = top.type === 'mate' ? top.value * factor : null;
    put('score', formatScore(cp, mate));
    const [leader, subtitle] = makeWinnerLabel(cp, mate);
    put('score-lead', leader); put('score-sub', subtitle);
    const approxCp = mate !== null ? Math.sign(mate) * 900 : cp;
    const share = Math.min(96, Math.max(4, 100 / (1 + Math.exp(-approxCp / 160))));
    $('eval-white').style.width = `${share}%`;
  } else {
    put('score', '—');
    put('score-lead', completed ? 'Position complete' : 'Analyzing position');
    put('score-sub', completed ? 'No legal moves' : 'Local analysis in progress');
    $('eval-white').style.width = '50%';
  }
  for (let i = 0; i < rowElements.length; i++) {
    const row = rowElements[i], line = entries.get(i + 1);
    if (!line) {
      // Stable placeholders prevent the list from collapsing or flashing between moves.
      setField(row.move, completed && i === 0 ? 'Game over' : '—');
      setField(row.sequence, completed ? (i === 0 ? 'No legal continuation' : '') : 'Waiting for analysis');
      row.sequence.removeAttribute('title');
      setField(row.score, '—');
      row.item.classList.toggle('line-pending', true);
      continue;
    }
    const desc = sanFromUci(viewed.fen, line.pv);
    setField(row.move, desc[0] || line.pv[0] || '—');
    setField(row.sequence, desc.slice(1).join('  '));
    if (row.sequence.title !== row.sequence.textContent) row.sequence.title = row.sequence.textContent;
    setField(row.score, formatScore(line.type === 'cp' ? line.value * factor : 0, line.type === 'mate' ? line.value * factor : null));
    row.item.classList.toggle('line-pending', false);
  }
  const bestMove = top ? rowElements[0].move.textContent : '—';
  put('bestmove-line', bestMove);
  $('bestmove-line').title = top ? bestMove : '';
  put('move-explanation', describeMove(bestMove));
  hasDisplayedAnalysis = completed;
  if (completed) sendArrow(top?.pv?.[0] || null);
  else showPendingArrow();
}
function sendArrow(uci) {
  clearTimeout(arrowClearTimer);
  arrowClearTimer = undefined;
  const next = showArrow && siteState?.allowed ? uci : null;
  if (next === lastArrow) return;
  lastArrow = next;
  try { port?.postMessage({ type: 'ARROW', tabId: boundTabId, gameKey:siteState?.gameKey, uci: next, show: showArrow, enabled: true }); }
  catch { lastArrow = undefined; }
}
function engineMessage(event) {
  for (const line of String(event.data || '').split(/[\r\n]+/)) {
    if (line === 'uciok') {
      worker.postMessage('setoption name Hash value 16');
      worker.postMessage('setoption name MultiPV value 3');
      worker.postMessage('isready');
    }
    if (line === 'readyok') {
      clearTimeout(engineStartupTimer);
      ready = true;
      engineError = '';
      put('warning', '');
      setEngineStatus('Stockfish 19 ready', true);
      runQueued();
      render();
    }
    if (line.startsWith('info ') && thinking && !stopping && current) {
      const info = infoFromLine(line);
      if (info) {
        const state = cacheFor(current.key);
        if ((state.lines.get(info.num)?.depth || 0) <= info.depth) {
          state.lines.set(info.num, info);
        }

      }
    }
    if (line.startsWith('bestmove') && thinking) {
      const interrupted = stopping;
      thinking = false; stopping = false;
      if(!interrupted)engineFailures=0;
      // A stopped search might have reached only depth 1; never cache it as complete.
      if (current) cacheFor(current.key).completed = !interrupted;
      if (queued) runQueued();
      else if (!interrupted) {
        setEngineStatus('Analysis complete', true);
        if (current?.key === viewed?.key) render();
      }
    }
  }
}
function engineFailed() {
  clearTimeout(engineStartupTimer);
  clearTimeout(engineRetryTimer);
  worker?.terminate();
  worker=null;
  ready=thinking=stopping=false;
  current=null;
  if(!siteState?.allowed||!viewed)return;
  queued=viewed;
  if(engineFailures++===0){
    engineRetryTimer=setTimeout(initEngine,250);
    return;
  }
  engineError='Stockfish could not complete the analysis. Select Refresh to retry.';
  setEngineStatus(engineError);
  put('warning',engineError);
  render();
}
function initEngine() {
  if (!siteState?.allowed || worker) return;
  try {
    worker = new Worker(chrome.runtime.getURL('engine/stockfish-19-lite-single.js'));
    const searchWorker=worker;
    worker.onmessage = event => {
      if(worker===searchWorker&&(siteState?.allowed||siteState?.positionPending))engineMessage(event);
    };
    worker.onerror = event => {
      event.preventDefault?.();
      if(worker===searchWorker)engineFailed();
    };
    worker.onmessageerror=()=>{if(worker===searchWorker)engineFailed();};
    engineStartupTimer=setTimeout(()=>{if(worker===searchWorker&&!ready)engineFailed();},15000);
    worker.postMessage('uci'); setEngineStatus('Loading Stockfish…');
  } catch { engineFailed(); }
}
function enqueue(state, { force = false } = {}) {
  if (!siteState?.allowed || !state?.fen) return;
  const target = { fen: state.fen, depth, key: positionKey(state.fen, depth) };
  const changed = viewed?.key !== target.key;
  viewed = target;
  if(changed||force)engineFailures=0;
  if (force) cached.delete(target.key);
  if (changed || force) render();
  else if (!cached.get(target.key)?.completed) showPendingArrow();
  // Already analyzed? Reuse the cached result instantly without restarting Stockfish.
  if (!force && cached.get(target.key)?.completed) {
    queued = null;
    return;
  }
  if (!force && current?.key === target.key && thinking && !stopping) {
    queued = null;
    return;
  }
  if (!force && queued?.key===target.key && (worker||(!changed&&engineError))) return;
  queued = target;
  if (!worker) initEngine();
  if (!ready) return;
  if (thinking) {
    if (!stopping) { stopping = true; worker.postMessage('stop'); }
    return;
  }
  runQueued();
}
function runQueued() {
  if (!siteState?.allowed || !ready || thinking || !queued) return;
  const target = queued; queued = null; current = target; stopping = false;
  // A new search starts with a clean set of variations after an interruption.
  const entry = cacheFor(target.key);
  entry.lines.clear();
  entry.completed = false;
  thinking = true;
  worker.postMessage(`position fen ${current.fen}`);
  worker.postMessage(`go depth ${current.depth}`);
  setEngineStatus('Analyzing', true);
}
function toggleActive(show) {
  if (activePanelVisible === show) return;
  activePanelVisible = show;
  if (!show) {
    hasDisplayedAnalysis = false;
    viewed = null;
    queued = null;
    renderGameReview(null);
    put('warning', '');
  }
  $('analysis').classList.toggle('hidden', !show);
  $('blocked').classList.toggle('hidden', show);
  $('status-dot').classList.toggle('on', show);
}
function stopAnalysis(){
  clearTimeout(engineStartupTimer);
  clearTimeout(engineRetryTimer);
  engineFailures=0;
  worker?.terminate();
  worker=null;
  ready=thinking=stopping=hasDisplayedAnalysis=false;
  queued=current=viewed=null;
  cached.clear();
  engineError='';
}

function refreshState(resume=false) {
  if(!siteState?.allowed){
    if(siteState?.positionPending&&activePanelVisible){
      put('working','Updating…');
      sendArrow(null);
    }else{
      stopAnalysis();
      toggleActive(false);
      $('blocked').classList.remove('hidden');
      put('blocked-reason',siteState?.positionPending?'Waiting for the Chess.com position.':
        siteState?.reason||'Open a Live or Daily game on Chess.com.');
      sendArrow(null);
    }
    return;
  }
  toggleActive(true);
  put('context-text','Completed game');
  put('source-pill','EXACT');
  if(siteState.review||!resume)renderGameReview(siteState.review);
  put('warning',engineError);
  enqueue(siteState);
  if(resume){
    runQueued();
    render();
  }
}

$('refresh').addEventListener('click',()=>{
  try{port?.postMessage({type:'REFRESH'});}catch{}
  if(siteState?.allowed)enqueue(siteState,{force:true});
});
document.addEventListener('keydown',event=>{
  if(!port||!siteState?.gameKey||event.defaultPrevented||event.isComposing||
    event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||
    !['ArrowLeft','ArrowRight'].includes(event.key)||
    event.target.closest?.('input,textarea,select,[contenteditable]:not([contenteditable="false"]),[role="slider"]'))return;
  try{
    port.postMessage({type:'NAVIGATE_GAME_MOVE',tabId:boundTabId,gameKey:siteState.gameKey,key:event.key});
    event.preventDefault();
  }catch{}
});
$('toggle-arrows').addEventListener('change', event => {
  showArrow = event.target.checked;
  chrome.storage.local.set({ showArrow });
  lastArrow = undefined;
  const entry = cached.get(viewed?.key);
  const best = entry?.completed ? entry.lines.get(1)?.pv?.[0] : null;
  sendArrow(best);
});
$('depth').addEventListener('input', event => put('depth-value', event.target.value));
$('depth').addEventListener('change', event => {
  depth = Number(event.target.value);
  chrome.storage.local.set({ depth });
  refreshState();
});
$('settings-btn').addEventListener('click', event => {
  const panel = $('settings');
  panel.hidden = !panel.hidden;
  event.currentTarget.setAttribute('aria-expanded', String(!panel.hidden));
});
ensureRows();
settings.finally(connect);

})();
