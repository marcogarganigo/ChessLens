(()=>{function bs(n){return n!==null?{comment:n,variations:[]}:{variations:[]}}function Ss(n,t,e,s,i){let o={move:n,variations:i};return t&&(o.suffix=t),e&&(o.nag=e),s!==null&&(o.comment=s),o}function Es(...n){let[t,...e]=n,s=t;for(let i of e)i!==null&&(s.variations=[i,...i.variations],i.variations=[],s=i);return t}function ys(n,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){let s=e.variations[0];if(!s){e.comment=t.marker.comment;break}e=s}}return{headers:n,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Cs(n,t){function e(){this.constructor=n}e.prototype=t.prototype,n.prototype=new e}function Y(n,t,e,s){var i=Error.call(this,n);return Object.setPrototypeOf&&Object.setPrototypeOf(i,Y.prototype),i.expected=t,i.found=e,i.location=s,i.name="SyntaxError",i}Cs(Y,Error);function Se(n,t,e){return e=e||" ",n.length>t?n:(t-=n.length,e+=e.repeat(t),n+e.slice(0,t))}Y.prototype.format=function(n){var t="Error: "+this.message;if(this.location){var e=null,s;for(s=0;s<n.length;s++)if(n[s].source===this.location.source){e=n[s].text.split(/\r\n|\n|\r/g);break}var i=this.location.start,o=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(i):i,f=this.location.source+":"+o.line+":"+o.column;if(e){var h=this.location.end,u=Se("",o.line.toString().length," "),d=e[i.line-1],_=i.line===h.line?h.column:d.length+1,C=_-i.column||1;t+=`
 --> `+f+`
`+u+` |
`+o.line+" | "+d+`
`+u+" | "+Se("",i.column-1," ")+Se("",C,"^")}else t+=`
 at `+f}return t};Y.buildMessage=function(n,t){var e={literal:function(d){return'"'+i(d.text)+'"'},class:function(d){var _=d.parts.map(function(C){return Array.isArray(C)?o(C[0])+"-"+o(C[1]):o(C)});return"["+(d.inverted?"^":"")+_.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(d){return d.description}};function s(d){return d.charCodeAt(0).toString(16).toUpperCase()}function i(d){return d.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(_){return"\\x0"+s(_)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(_){return"\\x"+s(_)})}function o(d){return d.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(_){return"\\x0"+s(_)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(_){return"\\x"+s(_)})}function f(d){return e[d.type](d)}function h(d){var _=d.map(f),C,g;if(_.sort(),_.length>0){for(C=1,g=1;C<_.length;C++)_[C-1]!==_[C]&&(_[g]=_[C],g++);_.length=g}switch(_.length){case 1:return _[0];case 2:return _[0]+" or "+_[1];default:return _.slice(0,-1).join(", ")+", or "+_[_.length-1]}}function u(d){return d?'"'+i(d)+'"':"end of input"}return"Expected "+h(n)+" but "+u(t)+" found."};function As(n,t){t=t!==void 0?t:{};var e={},s=t.grammarSource,i={pgn:Xe},o=Xe,f="[",h='"',u="]",d=".",_="O-O-O",C="O-O",g="0-0-0",S="0-0",A="$",$="{",D="}",ge=";",_e="(",mt=")",Pe="1-0",Oe="0-1",Le="1/2-1/2",vt="*",me=/^[a-zA-Z]/,Ie=/^[^"]/,oe=/^[0-9]/,Me=/^[.]/,qe=/^[a-zA-Z1-8\-=]/,bt=/^[+#]/,Re=/^[!?]/,Ke=/^[^}]/,Fe=/^[^\r\n]/,De=/^[ \t\r\n]/,St=R("tag pair"),Et=T("[",!1),Ue=T('"',!1),yt=T("]",!1),Ct=R("tag name"),ve=F([["a","z"],["A","Z"]],!1,!1),At=R("tag value"),Be=F(['"'],!0,!1),kt=R("move number"),ae=F([["0","9"]],!1,!1),$t=T(".",!1),Qe=F(["."],!1,!1),wt=R("standard algebraic notation"),xt=T("O-O-O",!1),Tt=T("O-O",!1),Nt=T("0-0-0",!1),Pt=T("0-0",!1),je=F([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),Ot=F(["+","#"],!1,!1),Lt=R("suffix annotation"),He=F(["!","?"],!1,!1),It=R("NAG"),Mt=T("$",!1),qt=R("brace comment"),Rt=T("{",!1),Ge=F(["}"],!0,!1),Kt=T("}",!1),Ft=R("rest of line comment"),Dt=T(";",!1),We=F(["\r",`
`],!0,!1),Ut=R("variation"),Bt=T("(",!1),Qt=T(")",!1),jt=R("game termination marker"),Ht=T("1-0",!1),Gt=T("0-1",!1),Wt=T("1/2-1/2",!1),zt=T("*",!1),Vt=R("whitespace"),ze=F([" ","	","\r",`
`],!1,!1),Yt=function(r,l){return ys(r,l)},Xt=function(r){return Object.fromEntries(r)},Zt=function(r,l){return[r,l]},Jt=function(r,l){return{root:r,marker:l}},es=function(r,l){return Es(bs(r),...l.flat())},ts=function(r,l,c,v,b){return Ss(r,l,c,v,b)},ss=function(r){return r},is=function(r){return r.replace(/[\r\n]+/g," ")},rs=function(r){return r.trim()},ns=function(r){return r},os=function(r,l){return{result:r,comment:l}},a=t.peg$currPos|0,z=[{line:1,column:1}],K=a,le=t.peg$maxFailExpected||[],p=t.peg$silentFails|0,J;if(t.startRule){if(!(t.startRule in i))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');o=i[t.startRule]}function T(r,l){return{type:"literal",text:r,ignoreCase:l}}function F(r,l,c){return{type:"class",parts:r,inverted:l,ignoreCase:c}}function as(){return{type:"end"}}function R(r){return{type:"other",description:r}}function Ve(r){var l=z[r],c;if(l)return l;if(r>=z.length)c=z.length-1;else for(c=r;!z[--c];);for(l=z[c],l={line:l.line,column:l.column};c<r;)n.charCodeAt(c)===10?(l.line++,l.column=1):l.column++,c++;return z[r]=l,l}function Ye(r,l,c){var v=Ve(r),b=Ve(l),k={source:s,start:{offset:r,line:v.line,column:v.column},end:{offset:l,line:b.line,column:b.column}};return k}function m(r){a<K||(a>K&&(K=a,le=[]),le.push(r))}function ls(r,l,c){return new Y(Y.buildMessage(r,l),r,l,c)}function Xe(){var r,l,c;return r=a,l=cs(),c=us(),r=Yt(l,c),r}function cs(){var r,l,c;for(r=a,l=[],c=Ze();c!==e;)l.push(c),c=Ze();return c=I(),r=Xt(l),r}function Ze(){var r,l,c,v,b,k,j;return p++,r=a,I(),n.charCodeAt(a)===91?(l=f,a++):(l=e,p===0&&m(Et)),l!==e?(I(),c=fs(),c!==e?(I(),n.charCodeAt(a)===34?(v=h,a++):(v=e,p===0&&m(Ue)),v!==e?(b=hs(),n.charCodeAt(a)===34?(k=h,a++):(k=e,p===0&&m(Ue)),k!==e?(I(),n.charCodeAt(a)===93?(j=u,a++):(j=e,p===0&&m(yt)),j!==e?r=Zt(c,b):(a=r,r=e)):(a=r,r=e)):(a=r,r=e)):(a=r,r=e)):(a=r,r=e),p--,r===e&&p===0&&m(St),r}function fs(){var r,l,c;if(p++,r=a,l=[],c=n.charAt(a),me.test(c)?a++:(c=e,p===0&&m(ve)),c!==e)for(;c!==e;)l.push(c),c=n.charAt(a),me.test(c)?a++:(c=e,p===0&&m(ve));else l=e;return l!==e?r=n.substring(r,a):r=l,p--,r===e&&(l=e,p===0&&m(Ct)),r}function hs(){var r,l,c;for(p++,r=a,l=[],c=n.charAt(a),Ie.test(c)?a++:(c=e,p===0&&m(Be));c!==e;)l.push(c),c=n.charAt(a),Ie.test(c)?a++:(c=e,p===0&&m(Be));return r=n.substring(r,a),p--,l=e,p===0&&m(At),r}function us(){var r,l,c;return r=a,l=Je(),I(),c=vs(),c===e&&(c=null),I(),r=Jt(l,c),r}function Je(){var r,l,c,v;for(r=a,l=be(),l===e&&(l=null),c=[],v=et();v!==e;)c.push(v),v=et();return r=es(l,c),r}function et(){var r,l,c,v,b,k,j,ce;if(r=a,I(),ps(),I(),l=ds(),l!==e){for(c=gs(),c===e&&(c=null),v=[],b=tt();b!==e;)v.push(b),b=tt();for(b=I(),k=be(),k===e&&(k=null),j=[],ce=st();ce!==e;)j.push(ce),ce=st();r=ts(l,c,v,k,j)}else a=r,r=e;return r}function ps(){var r,l,c,v,b,k;for(p++,r=a,l=[],c=n.charAt(a),oe.test(c)?a++:(c=e,p===0&&m(ae));c!==e;)l.push(c),c=n.charAt(a),oe.test(c)?a++:(c=e,p===0&&m(ae));if(n.charCodeAt(a)===46?(c=d,a++):(c=e,p===0&&m($t)),c!==e){for(v=I(),b=[],k=n.charAt(a),Me.test(k)?a++:(k=e,p===0&&m(Qe));k!==e;)b.push(k),k=n.charAt(a),Me.test(k)?a++:(k=e,p===0&&m(Qe));l=[l,c,v,b],r=l}else a=r,r=e;return p--,r===e&&(l=e,p===0&&m(kt)),r}function ds(){var r,l,c,v,b,k;if(p++,r=a,l=a,n.substr(a,5)===_?(c=_,a+=5):(c=e,p===0&&m(xt)),c===e&&(n.substr(a,3)===C?(c=C,a+=3):(c=e,p===0&&m(Tt)),c===e&&(n.substr(a,5)===g?(c=g,a+=5):(c=e,p===0&&m(Nt)),c===e&&(n.substr(a,3)===S?(c=S,a+=3):(c=e,p===0&&m(Pt)),c===e))))if(c=a,v=n.charAt(a),me.test(v)?a++:(v=e,p===0&&m(ve)),v!==e){if(b=[],k=n.charAt(a),qe.test(k)?a++:(k=e,p===0&&m(je)),k!==e)for(;k!==e;)b.push(k),k=n.charAt(a),qe.test(k)?a++:(k=e,p===0&&m(je));else b=e;b!==e?(v=[v,b],c=v):(a=c,c=e)}else a=c,c=e;return c!==e?(v=n.charAt(a),bt.test(v)?a++:(v=e,p===0&&m(Ot)),v===e&&(v=null),c=[c,v],l=c):(a=l,l=e),l!==e?r=n.substring(r,a):r=l,p--,r===e&&(l=e,p===0&&m(wt)),r}function gs(){var r,l,c;for(p++,r=a,l=[],c=n.charAt(a),Re.test(c)?a++:(c=e,p===0&&m(He));c!==e;)l.push(c),l.length>=2?c=e:(c=n.charAt(a),Re.test(c)?a++:(c=e,p===0&&m(He)));return l.length<1?(a=r,r=e):r=l,p--,r===e&&(l=e,p===0&&m(Lt)),r}function tt(){var r,l,c,v,b;if(p++,r=a,I(),n.charCodeAt(a)===36?(l=A,a++):(l=e,p===0&&m(Mt)),l!==e){if(c=a,v=[],b=n.charAt(a),oe.test(b)?a++:(b=e,p===0&&m(ae)),b!==e)for(;b!==e;)v.push(b),b=n.charAt(a),oe.test(b)?a++:(b=e,p===0&&m(ae));else v=e;v!==e?c=n.substring(c,a):c=v,c!==e?r=ss(c):(a=r,r=e)}else a=r,r=e;return p--,r===e&&p===0&&m(It),r}function be(){var r;return r=_s(),r===e&&(r=ms()),r}function _s(){var r,l,c,v,b;if(p++,r=a,n.charCodeAt(a)===123?(l=$,a++):(l=e,p===0&&m(Rt)),l!==e){for(c=a,v=[],b=n.charAt(a),Ke.test(b)?a++:(b=e,p===0&&m(Ge));b!==e;)v.push(b),b=n.charAt(a),Ke.test(b)?a++:(b=e,p===0&&m(Ge));c=n.substring(c,a),n.charCodeAt(a)===125?(v=D,a++):(v=e,p===0&&m(Kt)),v!==e?r=is(c):(a=r,r=e)}else a=r,r=e;return p--,r===e&&(l=e,p===0&&m(qt)),r}function ms(){var r,l,c,v,b;if(p++,r=a,n.charCodeAt(a)===59?(l=ge,a++):(l=e,p===0&&m(Dt)),l!==e){for(c=a,v=[],b=n.charAt(a),Fe.test(b)?a++:(b=e,p===0&&m(We));b!==e;)v.push(b),b=n.charAt(a),Fe.test(b)?a++:(b=e,p===0&&m(We));c=n.substring(c,a),r=rs(c)}else a=r,r=e;return p--,r===e&&(l=e,p===0&&m(Ft)),r}function st(){var r,l,c,v;return p++,r=a,I(),n.charCodeAt(a)===40?(l=_e,a++):(l=e,p===0&&m(Bt)),l!==e?(c=Je(),c!==e?(I(),n.charCodeAt(a)===41?(v=mt,a++):(v=e,p===0&&m(Qt)),v!==e?r=ns(c):(a=r,r=e)):(a=r,r=e)):(a=r,r=e),p--,r===e&&p===0&&m(Ut),r}function vs(){var r,l,c;return p++,r=a,n.substr(a,3)===Pe?(l=Pe,a+=3):(l=e,p===0&&m(Ht)),l===e&&(n.substr(a,3)===Oe?(l=Oe,a+=3):(l=e,p===0&&m(Gt)),l===e&&(n.substr(a,7)===Le?(l=Le,a+=7):(l=e,p===0&&m(Wt)),l===e&&(n.charCodeAt(a)===42?(l=vt,a++):(l=e,p===0&&m(zt))))),l!==e?(I(),c=be(),c===e&&(c=null),r=os(l,c)):(a=r,r=e),p--,r===e&&(l=e,p===0&&m(jt)),r}function I(){var r,l;for(p++,r=[],l=n.charAt(a),De.test(l)?a++:(l=e,p===0&&m(ze));l!==e;)r.push(l),l=n.charAt(a),De.test(l)?a++:(l=e,p===0&&m(ze));return p--,l=e,p===0&&m(Vt),r}if(J=o(),t.peg$library)return{peg$result:J,peg$currPos:a,peg$FAILED:e,peg$maxFailExpected:le,peg$maxFailPos:K};if(J!==e&&a===n.length)return J;throw J!==e&&a<n.length&&m(as()),ls(le,K<n.length?n.charAt(K):null,K<n.length?Ye(K,K+1):Ye(K,K))}var he=0xffffffffffffffffn;function Ee(n,t){return(n<<t|n>>64n-t)&0xffffffffffffffffn}function it(n,t){return n*t&he}function ks(n){return function(){let t=BigInt(n&he),e=BigInt(n>>64n&he),s=it(Ee(it(t,5n),7n),9n);return e^=t,t=(Ee(t,24n)^e^e<<16n)&he,e=Ee(e,37n),n=e<<64n|t,s}}var pe=ks(0xa187eb39cdcaed8f31c4b365b102e01en),$s=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>pe()))),ws=Array.from({length:8},()=>pe()),xs=Array.from({length:16},()=>pe()),ye=pe(),L="w",q="b",w="p",we="n",ue="b",te="r",Q="q",x="k",Ce="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",V=class{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(t,e){let{color:s,piece:i,from:o,to:f,flags:h,captured:u,promotion:d}=e,_=N(o),C=N(f);this.color=s,this.piece=i,this.from=_,this.to=C,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=_+C,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(let g in y)y[g]&h&&(this.flags+=H[g]);u&&(this.captured=u),d&&(this.promotion=d,this.lan+=d)}isCapture(){return this.flags.indexOf(H.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(H.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(H.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(H.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(H.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(H.BIG_PAWN)>-1}},P=-1,H={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"};var y={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},xe={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Ts={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Ns={...xe,...Ts},E={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},Ae={b:[16,32,17,15],w:[-16,-32,-17,-15]},rt={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Ps=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Os=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Ls={p:1,n:2,b:4,r:8,q:16,k:32},Is="pnbrqkPNBRQK",nt=[we,ue,te,Q],Ms=7,qs=6,Rs=1,Ks=0,fe={[x]:y.KSIDE_CASTLE,[Q]:y.QSIDE_CASTLE},U={w:[{square:E.a1,flag:y.QSIDE_CASTLE},{square:E.h1,flag:y.KSIDE_CASTLE}],b:[{square:E.a8,flag:y.QSIDE_CASTLE},{square:E.h8,flag:y.KSIDE_CASTLE}]},Fs={b:Rs,w:qs},ke="--";function G(n){return n>>4}function se(n){return n&15}function at(n){return"0123456789".indexOf(n)!==-1}function N(n){let t=se(n),e=G(n);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function ee(n){return n===L?q:L}function Ds(n){let t=n.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};let e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};let s=parseInt(t[4],10);if(isNaN(s)||s<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};let i=t[0].split("/");if(i.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let f=0;f<i.length;f++){let h=0,u=!1;for(let d=0;d<i[f].length;d++)if(at(i[f][d])){if(u)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};h+=parseInt(i[f][d],10),u=!0}else{if(!/^[prnbqkPRNBQK]$/.test(i[f][d]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};h+=1,u=!1}if(h!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};let o=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(let{color:f,regex:h}of o){if(!h.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${f} king`};if((t[0].match(h)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${f} kings`}}return Array.from(i[0]+i[7]).some(f=>f.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Us(n,t){let e=n.from,s=n.to,i=n.piece,o=0,f=0,h=0;for(let u=0,d=t.length;u<d;u++){let _=t[u].from,C=t[u].to,g=t[u].piece;i===g&&e!==_&&s===C&&(o++,G(e)===G(_)&&f++,se(e)===se(_)&&h++)}return o>0?f>0&&h>0?N(e):h>0?N(e).charAt(1):N(e).charAt(0):""}function B(n,t,e,s,i,o=void 0,f=y.NORMAL){let h=G(s);if(i===w&&(h===Ms||h===Ks))for(let u=0;u<nt.length;u++){let d=nt[u];n.push({color:t,from:e,to:s,piece:i,captured:o,promotion:d,flags:f|y.PROMOTION})}else n.push({color:t,from:e,to:s,piece:i,captured:o,flags:f})}function ot(n){let t=n.charAt(0);return t>="a"&&t<="h"?n.match(/[a-h]\d.*[a-h]\d/)?void 0:w:(t=t.toLowerCase(),t==="o"?x:t)}function $e(n){return n.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}var X=class{_board=new Array(128);_turn=L;_header={};_kings={w:P,b:P};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(t=Ce,{skipValidation:e=!1}={}){this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:P,b:P},this._turn=L,this._castling={w:0,b:0},this._epSquare=P,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...Ns},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:s=!1}={}){let i=t.split(/\s+/);if(i.length>=2&&i.length<6){let h=["-","-","0","1"];t=i.concat(h.slice(-(6-i.length))).join(" ")}if(i=t.split(/\s+/),!e){let{ok:h,error:u}=Ds(t);if(!h)throw new Error(u)}let o=i[0],f=0;this.clear({preserveHeaders:s});for(let h=0;h<o.length;h++){let u=o.charAt(h);if(u==="/")f+=8;else if(at(u))f+=parseInt(u,10);else{let d=u<"a"?L:q;this._put({type:u.toLowerCase(),color:d},N(f)),f++}}this._turn=i[1],i[2].indexOf("K")>-1&&(this._castling.w|=y.KSIDE_CASTLE),i[2].indexOf("Q")>-1&&(this._castling.w|=y.QSIDE_CASTLE),i[2].indexOf("k")>-1&&(this._castling.b|=y.KSIDE_CASTLE),i[2].indexOf("q")>-1&&(this._castling.b|=y.QSIDE_CASTLE),this._epSquare=i[3]==="-"?P:E[i[3]],this._halfMoves=parseInt(i[4],10),this._moveNumber=parseInt(i[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){let e=0,s="";for(let f=E.a8;f<=E.h1;f++){if(this._board[f]){e>0&&(s+=e,e=0);let{color:h,type:u}=this._board[f];s+=h===L?u.toUpperCase():u.toLowerCase()}else e++;f+1&136&&(e>0&&(s+=e),f!==E.h1&&(s+="/"),e=0,f+=8)}let i="";this._castling[L]&y.KSIDE_CASTLE&&(i+="K"),this._castling[L]&y.QSIDE_CASTLE&&(i+="Q"),this._castling[q]&y.KSIDE_CASTLE&&(i+="k"),this._castling[q]&y.QSIDE_CASTLE&&(i+="q"),i=i||"-";let o="-";if(this._epSquare!==P)if(t)o=N(this._epSquare);else{let f=this._epSquare+(this._turn===L?16:-16),h=[f+1,f-1];for(let u of h){if(u&136)continue;let d=this._turn;if(this._board[u]?.color===d&&this._board[u]?.type===w){this._makeMove({color:d,from:u,to:this._epSquare,piece:w,captured:w,flags:y.EP_CAPTURE});let _=!this._isKingAttacked(d);if(this._undoMove(),_){o=N(this._epSquare);break}}}}return[s,this._turn,i,o,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;let{color:e,type:s}=this._board[t],i={w:0,b:1}[e],o={p:0,n:1,b:2,r:3,q:4,k:5}[s];return $s[i][o][t]}_epKey(){return this._epSquare===P?0n:ws[this._epSquare&7]}_castlingKey(){let t=this._castling.w>>5|this._castling.b>>3;return xs[t]}_computeHash(){let t=0n;for(let e=E.a8;e<=E.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=ye),t}_updateSetup(t){this._history.length>0||(t!==Ce?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(Ce)}get(t){return this._board[E[t]]}findPiece(t){let e=[];for(let s=E.a8;s<=E.h1;s++){if(s&136){s+=7;continue}!this._board[s]||this._board[s]?.color!==t.color||this._board[s].color===t.color&&this._board[s].type===t.type&&e.push(N(s))}return e}put({type:t,color:e},s){return this._put({type:t,color:e},s)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},s){if(Is.indexOf(t.toLowerCase())===-1||!(s in E))return!1;let i=E[s];if(t==x&&!(this._kings[e]==P||this._kings[e]==i))return!1;let o=this._board[i];return o&&o.type===x&&(this._kings[o.color]=P),this._set(i,{type:t,color:e}),t===x&&(this._kings[e]=i),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){let e=this.get(t);return this._clear(E[t]),e&&e.type===x&&(this._kings[e.color]=P),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){this._hash^=this._castlingKey();let t=this._board[E.e1]?.type===x&&this._board[E.e1]?.color===L,e=this._board[E.e8]?.type===x&&this._board[E.e8]?.color===q;(!t||this._board[E.a1]?.type!==te||this._board[E.a1]?.color!==L)&&(this._castling.w&=-65),(!t||this._board[E.h1]?.type!==te||this._board[E.h1]?.color!==L)&&(this._castling.w&=-33),(!e||this._board[E.a8]?.type!==te||this._board[E.a8]?.color!==q)&&(this._castling.b&=-65),(!e||this._board[E.h8]?.type!==te||this._board[E.h8]?.color!==q)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===P)return;let t=this._epSquare+(this._turn===L?-16:16),e=this._epSquare+(this._turn===L?16:-16),s=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||this._board[e]?.color!==ee(this._turn)||this._board[e]?.type!==w){this._hash^=this._epKey(),this._epSquare=P;return}let i=o=>!(o&136)&&this._board[o]?.color===this._turn&&this._board[o]?.type===w;s.some(i)||(this._hash^=this._epKey(),this._epSquare=P)}_attacked(t,e,s){let i=[];for(let o=E.a8;o<=E.h1;o++){if(o&136){o+=7;continue}if(this._board[o]===void 0||this._board[o].color!==t)continue;let f=this._board[o],h=o-e;if(h===0)continue;let u=h+119;if(Ps[u]&Ls[f.type]){if(f.type===w){if(h>0&&f.color===L||h<=0&&f.color===q)if(s)i.push(N(o));else return!0;continue}if(f.type==="n"||f.type==="k")if(s){i.push(N(o));continue}else return!0;let d=Os[u],_=o+d,C=!1;for(;_!==e;){if(this._board[_]!=null){C=!0;break}_+=d}if(!C)if(s){i.push(N(o));continue}else return!0}}return s?i:!1}attackers(t,e){return e?this._attacked(e,E[t],!0):this._attacked(this._turn,E[t],!0)}_isKingAttacked(t){let e=this._kings[t];return e===-1?!1:this._attacked(ee(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,E[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){let t={b:0,n:0,r:0,q:0,k:0,p:0},e=[],s=0,i=0;for(let o=E.a8;o<=E.h1;o++){if(i=(i+1)%2,o&136){o+=7;continue}let f=this._board[o];f&&(t[f.type]=f.type in t?t[f.type]+1:1,f.type===ue&&e.push(i),s++)}if(s===2)return!0;if(s===3&&(t[ue]===1||t[we]===1))return!0;if(s===t[ue]+2){let o=0,f=e.length;for(let h=0;h<f;h++)o+=e[h];if(o===0||o===f)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:s=void 0}={}){let i=this._moves({square:e,piece:s});return t?i.map(o=>new V(this,o)):i.map(o=>this._moveToSan(o,i))}_moves({legal:t=!0,piece:e=void 0,square:s=void 0}={}){let i=s?s.toLowerCase():void 0,o=e?.toLowerCase(),f=[],h=this._turn,u=ee(h),d=E.a8,_=E.h1,C=!1;if(i)if(i in E)d=_=E[i],C=!0;else return[];for(let S=d;S<=_;S++){if(S&136){S+=7;continue}if(!this._board[S]||this._board[S].color===u)continue;let{type:A}=this._board[S],$;if(A===w){if(o&&o!==A)continue;$=S+Ae[h][0],this._board[$]||(B(f,h,S,$,w),$=S+Ae[h][1],Fs[h]===G(S)&&!this._board[$]&&B(f,h,S,$,w,void 0,y.BIG_PAWN));for(let D=2;D<4;D++)$=S+Ae[h][D],!($&136)&&(this._board[$]?.color===u?B(f,h,S,$,w,this._board[$].type,y.CAPTURE):$===this._epSquare&&B(f,h,S,$,w,w,y.EP_CAPTURE))}else{if(o&&o!==A)continue;for(let D=0,ge=rt[A].length;D<ge;D++){let _e=rt[A][D];for($=S;$+=_e,!($&136);){if(!this._board[$])B(f,h,S,$,A);else{if(this._board[$].color===h)break;B(f,h,S,$,A,this._board[$].type,y.CAPTURE);break}if(A===we||A===x)break}}}}if((o===void 0||o===x)&&(!C||_===this._kings[h])){if(this._castling[h]&y.KSIDE_CASTLE){let S=this._kings[h],A=S+2;!this._board[S+1]&&!this._board[A]&&!this._attacked(u,this._kings[h])&&!this._attacked(u,S+1)&&!this._attacked(u,A)&&B(f,h,this._kings[h],A,x,void 0,y.KSIDE_CASTLE)}if(this._castling[h]&y.QSIDE_CASTLE){let S=this._kings[h],A=S-2;!this._board[S-1]&&!this._board[S-2]&&!this._board[S-3]&&!this._attacked(u,this._kings[h])&&!this._attacked(u,S-1)&&!this._attacked(u,A)&&B(f,h,this._kings[h],A,x,void 0,y.QSIDE_CASTLE)}}if(!t||this._kings[h]===-1)return f;let g=[];for(let S=0,A=f.length;S<A;S++)this._makeMove(f[S]),this._isKingAttacked(h)||g.push(f[S]),this._undoMove();return g}move(t,{strict:e=!1}={}){let s=null;if(typeof t=="string")s=this._moveFromSan(t,e);else if(t===null)s=this._moveFromSan(ke,e);else if(typeof t=="object"){let o=this._moves();for(let f=0,h=o.length;f<h;f++)if(t.from===N(o[f].from)&&t.to===N(o[f].to)&&(!("promotion"in o[f])||t.promotion===o[f].promotion)){s=o[f];break}}if(!s)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&s.flags&y.NULL_MOVE)throw new Error("Null move not allowed when in check");let i=new V(this,s);return this._makeMove(s),this._incPositionCount(),i}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){let e=this._turn,s=ee(e);if(this._push(t),t.flags&y.NULL_MOVE){e===q&&this._moveNumber++,this._halfMoves++,this._turn=s,this._epSquare=P;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&y.EP_CAPTURE&&(this._turn===q?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===x){if(this._kings[e]=t.to,t.flags&y.KSIDE_CASTLE){let i=t.to-1,o=t.to+1;this._movePiece(o,i)}else if(t.flags&y.QSIDE_CASTLE){let i=t.to+1,o=t.to-2;this._movePiece(o,i)}this._castling[e]=0}if(this._castling[e]){for(let i=0,o=U[e].length;i<o;i++)if(t.from===U[e][i].square&&this._castling[e]&U[e][i].flag){this._castling[e]^=U[e][i].flag;break}}if(this._castling[s]){for(let i=0,o=U[s].length;i<o;i++)if(t.to===U[s][i].square&&this._castling[s]&U[s][i].flag){this._castling[s]^=U[s][i].flag;break}}if(this._hash^=this._castlingKey(),t.flags&y.BIG_PAWN){let i;e===q?i=t.to-16:i=t.to+16,!(t.to-1&136)&&this._board[t.to-1]?.type===w&&this._board[t.to-1]?.color===s||!(t.to+1&136)&&this._board[t.to+1]?.type===w&&this._board[t.to+1]?.color===s?(this._epSquare=i,this._hash^=this._epKey()):this._epSquare=P}else this._epSquare=P;t.piece===w?this._halfMoves=0:t.flags&(y.CAPTURE|y.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===q&&this._moveNumber++,this._turn=s,this._hash^=ye}undo(){let t=this._hash,e=this._undoMove();if(e){let s=new V(this,e);return this._decPositionCount(t),s}return null}_undoMove(){let t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();let e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=ye;let s=this._turn,i=ee(s);if(e.flags&y.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:s})),e.captured)if(e.flags&y.EP_CAPTURE){let o;s===q?o=e.to-16:o=e.to+16,this._set(o,{type:w,color:i})}else this._set(e.to,{type:e.captured,color:i});if(e.flags&(y.KSIDE_CASTLE|y.QSIDE_CASTLE)){let o,f;e.flags&y.KSIDE_CASTLE?(o=e.to+1,f=e.to-1):(o=e.to-2,f=e.to+1),this._movePiece(f,o)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){let s=[],i=!1;for(let g in this._header)this._header[g]&&s.push(`[${g} "${this._header[g]}"]`+t),i=!0;i&&this._history.length&&s.push(t);let o=g=>{let S=this._comments[this.fen()];if(typeof S<"u"){let A=g.length>0?" ":"";g=`${g}${A}{${S}}`}return g},f=[];for(;this._history.length>0;)f.push(this._undoMove());let h=[],u="";for(f.length===0&&h.push(o(""));f.length>0;){u=o(u);let g=f.pop();if(!g)break;if(!this._history.length&&g.color==="b"){let S=`${this._moveNumber}. ...`;u=u?`${u} ${S}`:S}else g.color==="w"&&(u.length&&h.push(u),u=this._moveNumber+".");u=u+" "+this._moveToSan(g,this._moves({legal:!0})),this._makeMove(g)}if(u.length&&h.push(o(u)),h.push(this._header.Result||"*"),e===0)return s.join("")+h.join(" ");let d=function(){return s.length>0&&s[s.length-1]===" "?(s.pop(),!0):!1},_=function(g,S){for(let A of S.split(" "))if(A){if(g+A.length>e){for(;d();)g--;s.push(t),g=0}s.push(A),g+=A.length,s.push(" "),g++}return d()&&g--,g},C=0;for(let g=0;g<h.length;g++){if(C+h[g].length>e&&h[g].includes("{")){C=_(C,h[g]);continue}C+h[g].length>e&&g!==0?(s[s.length-1]===" "&&s.pop(),s.push(t),C=0):g!==0&&(s.push(" "),C++),s.push(h[g]),C+=h[g].length}return s.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??xe[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=xe[t]||null,!0):!1}getHeaders(){let t={};for(let[e,s]of Object.entries(this._header))s!==null&&(t[e]=s);return t}loadPgn(t,{strict:e=!1,newlineChar:s=`\r?
`}={}){s!==`\r?
`&&(t=t.replace(new RegExp(s,"g"),`
`));let i=As(t);this.reset();let o=i.headers,f="";for(let d in o)d.toLowerCase()==="fen"&&(f=o[d]),this.header(d,o[d]);if(!e)f&&this.load(f,{preserveHeaders:!0});else if(o.SetUp==="1"){if(!("FEN"in o))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(o.FEN,{preserveHeaders:!0})}let h=i.root;for(;h;){if(h.move){let d=this._moveFromSan(h.move,e);if(d==null)throw new Error(`Invalid move in PGN: ${h.move}`);this._makeMove(d),this._incPositionCount()}h.comment!==void 0&&(this._comments[this.fen()]=h.comment),h=h.variations[0]}let u=i.result;u&&Object.keys(this._header).length&&this._header.Result!==u&&this.setHeader("Result",u)}_moveToSan(t,e){let s="";if(t.flags&y.KSIDE_CASTLE)s="O-O";else if(t.flags&y.QSIDE_CASTLE)s="O-O-O";else{if(t.flags&y.NULL_MOVE)return ke;if(t.piece!==w){let i=Us(t,e);s+=t.piece.toUpperCase()+i}t.flags&(y.CAPTURE|y.EP_CAPTURE)&&(t.piece===w&&(s+=N(t.from)[0]),s+="x"),s+=N(t.to),t.promotion&&(s+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?s+="#":s+="+"),this._undoMove(),s}_moveFromSan(t,e=!1){let s=$e(t);if(e||(s==="0-0"?s="O-O":s==="0-0-0"&&(s="O-O-O")),s==ke)return{color:this._turn,from:0,to:0,piece:"k",flags:y.NULL_MOVE};let i=ot(s),o=this._moves({legal:!0,piece:i});for(let g=0,S=o.length;g<S;g++)if(s===$e(this._moveToSan(o[g],o)))return o[g];if(e)return null;let f,h,u,d,_,C=!1;if(h=s.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),h?(f=h[1],u=h[2],d=h[3],_=h[4],u.length==1&&(C=!0)):(h=s.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),h&&(f=h[1],u=h[2],d=h[3],_=h[4],u.length==1&&(C=!0))),i=ot(s),o=this._moves({legal:!0,piece:f||i}),!d)return null;for(let g=0,S=o.length;g<S;g++)if(u){if((!f||f.toLowerCase()==o[g].piece)&&E[u]==o[g].from&&E[d]==o[g].to&&(!_||_.toLowerCase()==o[g].promotion))return o[g];if(C){let A=N(o[g].from);if((!f||f.toLowerCase()==o[g].piece)&&E[d]==o[g].to&&(u==A[0]||u==A[1])&&(!_||_.toLowerCase()==o[g].promotion))return o[g]}}else if(s===$e(this._moveToSan(o[g],o)).replace("x",""))return o[g];return null}ascii(){let t=`   +------------------------+
`;for(let e=E.a8;e<=E.h1;e++){if(se(e)===0&&(t+=" "+"87654321"[G(e)]+" |"),this._board[e]){let s=this._board[e].type,o=this._board[e].color===L?s.toUpperCase():s.toLowerCase();t+=" "+o+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){let e=this._moves({legal:!1}),s=0,i=this._turn;for(let o=0,f=e.length;o<f;o++)this._makeMove(e[o]),this._isKingAttacked(i)||(t-1>0?s+=this.perft(t-1):s++),this._undoMove();return s}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){let t=[],e=[];for(let s=E.a8;s<=E.h1;s++)this._board[s]==null?e.push(null):e.push({square:N(s),type:this._board[s].type,color:this._board[s].color}),s+1&136&&(t.push(e),e=[],s+=8);return t}squareColor(t){if(t in E){let e=E[t];return(G(e)+se(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){let e=[],s=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){let i=e.pop();if(!i)break;t?s.push(new V(this,i)):s.push(this._moveToSan(i,this._moves())),this._makeMove(i)}return s}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){let e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){let t=[],e={},s=i=>{i in this._comments&&(e[i]=this._comments[i])};for(;this._history.length>0;)t.push(this._undoMove());for(s(this.fen());;){let i=t.pop();if(!i)break;this._makeMove(i),s(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){let t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{let e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(let i of[x,Q])e[i]!==void 0&&(e[i]?this._castling[t]|=fe[i]:this._castling[t]&=~fe[i]);this._updateCastlingRights();let s=this.getCastlingRights(t);return(e[x]===void 0||e[x]===s[x])&&(e[Q]===void 0||e[Q]===s[Q])}getCastlingRights(t){return{[x]:(this._castling[t]&fe[x])!==0,[Q]:(this._castling[t]&fe[Q])!==0}}moveNumber(){return this._moveNumber}};window.ChessLensChess=X;window.ChessLensBoard=de;window.ChessLensPieceMap=Hs;window.ChessLensPlacement=ct;window.ChessLensAllowed=Ys;var lt=new X().fen(),Bs=["wc-chess-board","chess-board",".board",'[data-testid="board"]'],Qs=["wc-simple-move-list",".vertical-move-list",".move-list",'[data-cy="move-list"]'],js={knight:"N",bishop:"B",rook:"R",queen:"Q",king:"K",pawn:""};function de(n=document){for(let t of Bs){let e=[...n.querySelectorAll(t)];for(let s of e)if(s.querySelector('.piece.square-11, .piece[class*="square-"]'))return s}return null}function Hs(n){let t=new Map;if(!n)return t;for(let e of n.querySelectorAll(".piece")){let s=e.className?.baseVal||e.className||"",i=String(s).match(/(?:^|\s)([wb][prnbqk])(?:\s|$)/),o=String(s).match(/(?:^|\s)square-([1-8])([1-8])(?:\s|$)/);if(i&&o){let f="abcdefgh"[Number(o[1])-1];t.set(`${f}${o[2]}`,i[1])}}return t}function ct(n){let t=[];for(let e=8;e>=1;e--){let s=0,i="";for(let o of"abcdefgh"){let f=n.get(`${o}${e}`);if(!f){s++;continue}s&&(i+=s,s=0);let[h,u]=f;i+=h==="w"?u.toUpperCase():u}s&&(i+=s),t.push(i)}return t.join("/")}function Ys(url){
  const key=chessComGameKey(url);
  if(key && window.ChessLensVerifiedGame?.key===key)return {allowed:true,mode:"Completed game",gameKey:key};
  return {allowed:false,restricted:true,gameKey:key,reason:key
    ?"No analysis available for this game."
    :"Open a Live or Daily game on Chess.com."};
}

function ft(){
  const access=Ys(location.href);
  if(!access.allowed)return access;
  const pending={...access,allowed:false,positionPending:true};
  const board=de();
  if(!board)return pending;
  const placement=ct(Hs(board));
  const current=window.ChessLensReviewSummary?.current;
  const start=window.ChessLensVerifiedGame.start;
  const game=window.ChessLensVerifiedGame;
  const ply=Number(new URL(location.href).searchParams.get('move'));
  const hinted=game.moves[ply-1]?.after;
  const positions=game.positions.get(placement);
  const fen=hinted?.split(' ')[0]===placement?hinted:
    positions?.length===1?positions[0]:
    current?.fen.split(' ')[0]===placement?current.fen:
    start.split(' ')[0]===placement?start:null;
  if(!fen)return pending;
  return {...access,fen,source:"Verified archive"};
}

// ChessLens v2.1 — UI launcher anchored to the upper Chess.com clock.
// This source is injected into the existing chess.js/content bundle after its DOM parser.
// Running in an isolated content-script world; no host-page scripts or inline handlers.
var boardPort = null;
var lastSnapshot = '';
var lastUrl = '';
var lastBoard = null;
var arrowUci = null;
var arrowVisible = true;
var arrowEnabled = true;
var launcher = null;
var arrowLayer = null;
var arrowSvg = null;
var panelOpen = false;
var toggleInFlight = false;
let contextClosed=false, boardPoll, boardReconnect;
const contextCleanup=new Set();
function contentContextActive(error){
  if(contextClosed)return false;
  try{if(chrome.runtime?.id&&!/extension context invalidated/i.test(error?.message||''))return true;}catch{}
  contextClosed=true;
  for(const cleanup of contextCleanup)cleanup();
  contextCleanup.clear();
  return false;
}
function handleContentDisconnect(){
  // Read lastError inside the disconnect listener, even if the context is ending.
  try{return contentContextActive(chrome.runtime?.lastError);}
  catch(error){return contentContextActive(error);}
}
window.ChessLensContentContext={
  active:contentContextActive,
  onClose:cleanup=>contextCleanup.add(cleanup),
  onDisconnect:handleContentDisconnect
};

const launchWidth = 90, launchCompactWidth = 30, launchHeight = 30;
const launchStyle = `
:host{all:initial;contain:layout style}
button{all:unset;box-sizing:border-box;display:flex;align-items:center;justify-content:center;gap:4px;
  width:${launchWidth}px;height:${launchHeight}px;
  background:#242629;color:#f3f4f5;font:600 12px/1 "Segoe UI Variable Text","Segoe UI",system-ui,sans-serif;
  border:1px solid #3e4144;border-radius:6px;cursor:pointer;white-space:nowrap;
  transition:background-color .12s ease,border-color .12s ease}
button:hover{background:#303336;border-color:#51565a}
button[data-open="true"]{background:#33373a;border-color:#61666a}
button:active{background:#1d1f21}
button:focus-visible{outline:2px solid #e2e5e8;outline-offset:2px}
button[aria-disabled="true"]{cursor:progress}
img{width:22px;height:22px;display:block;object-fit:contain;flex-shrink:0}
span{white-space:nowrap}
:host([data-compact="true"]) button{width:${launchCompactWidth}px;padding:0}
:host([data-compact="true"]) span{display:none}
@media (prefers-reduced-motion:reduce){button{transition:none}}
`;

function updateLauncherState(open) {
  panelOpen = !!open;
  const button = launcher?.shadowRoot?.querySelector('button');
  if (!button) return;
  button.dataset.open = String(panelOpen);
  button.setAttribute('aria-expanded', String(panelOpen));
  button.setAttribute('aria-label', panelOpen ? 'Close ChessLens panel' : 'Open ChessLens panel');
  const action = panelOpen ? 'Close ChessLens panel' : 'Open ChessLens panel';
  button.title = button.dataset.reviewProgress ? `${action} · ${button.dataset.reviewProgress}` : action;
  button.setAttribute('aria-disabled', String(toggleInFlight));
}

async function requestPanelToggle() {
  if (toggleInFlight || !contentContextActive()) return;
  const retainPageFocus=document.hasFocus();
  toggleInFlight = true;
  updateLauncherState(panelOpen);
  let detail;
  try{
    const reply=await chrome.runtime.sendMessage({type:'TOGGLE_PANEL'});
    if(!contentContextActive())return;
    if(reply?.ok){
      panelOpen=!!reply.open;
      if(panelOpen&&retainPageFocus&&!document.hasFocus())window.focus();
    }
    else detail=reply?.error||'Unable to toggle panel';
  }catch(error){
    if(!contentContextActive(error))return;
    detail=error?.message||'Unable to toggle panel';
  }finally{
    toggleInFlight=false;
  }
  updateLauncherState(panelOpen);
  if(detail){
    const button=launcher?.shadowRoot?.querySelector('button');
    if(button)button.title='ChessLens: '+detail;
  }
}

function navigateGameMove(key,gameKey){
  if(gameKey!==chessComGameKey(location.href)||!['ArrowLeft','ArrowRight'].includes(key))return;
  const target=document.activeElement;
  const receiver=target&&!target.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"])')
    ?target:document.body;
  const keyCode=key==='ArrowLeft'?37:39;
  receiver?.dispatchEvent(new KeyboardEvent('keydown',{key,code:key,keyCode,which:keyCode,
    bubbles:true,composed:true,cancelable:true}));
}

function ensureUi() {
  if (!launcher) {
    launcher = document.createElement('div');
    launcher.id = 'chesslens-launch';
    launcher.style.cssText = 'all:initial;position:fixed;z-index:2147483000;pointer-events:auto';
    const shadow = launcher.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = launchStyle;
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.open = 'false';
    const icon = document.createElement('img');
    icon.src = chrome.runtime.getURL('assets/icon32.png');
    icon.alt = '';
    const label = document.createElement('span');
    label.textContent = 'Analyze';
    button.append(icon, label);
    button.addEventListener('mousedown',event=>{if(event.button===0)event.preventDefault();});
    button.addEventListener('click', requestPanelToggle);
    shadow.append(style, button);
    document.documentElement.appendChild(launcher);
    updateLauncherState(panelOpen);
  }
  if (!arrowLayer) {
    arrowLayer = document.createElement('div');
    arrowLayer.id = 'chesslens-overlay';
    arrowLayer.style.cssText = 'all:initial;pointer-events:none;position:fixed;z-index:2147482999;left:0;top:0;width:0;height:0;overflow:visible';
    const shadow = arrowLayer.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<style>:host{all:initial}svg{pointer-events:none;display:block}path{opacity:0;transition:opacity 110ms ease;paint-order:stroke;filter:drop-shadow(0 .025px .035px #0009)}path.visible{opacity:.58}@media(prefers-reduced-motion:reduce){path{transition:none}}</style>'+
      '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 8 8" preserveAspectRatio="none"><path id="cl-arrow" fill="#a5e1ca" stroke="#17362e" stroke-width=".035" stroke-linejoin="round"/></svg>';
    arrowSvg = shadow.querySelector('svg');
    document.documentElement.appendChild(arrowLayer);
  }
}

const clockSelectors = [
  '.board-layout-top .clock-component',
  '.board-layout-top [class*="clock-"]',
  '.clock-component',
  '[data-cy="clock-time"]',
  '.clock-time-monospace',
  '[data-testid="clock"]',
  '[class*="clock-time"]'
];

function findTopClock(boardRect) {
  const visited = new Set();
  const matches = [];
  for (const selector of clockSelectors) {
    for (const node of document.querySelectorAll(selector)) {
      const candidate = node.closest?.('.clock-component') || node;
      if (visited.has(candidate) || candidate.closest?.('#chesslens-launch')) continue;
      visited.add(candidate);
      let rect = candidate.getBoundingClientRect();
      // A time-only span may be much smaller than its clock background.
      if (rect.width < 80 && candidate.parentElement) {
        const parent = candidate.parentElement;
        const outer = parent.getBoundingClientRect();
        if (outer.width >= 90 && outer.width <= 270 && outer.height >= 30 && outer.height <= 100) {
          rect = outer;
        }
      }
      if (rect.width < 36 || rect.height < 18 || rect.height > 120 || rect.width > 290) continue;
      if (rect.bottom <= 0 || rect.top >= innerHeight || rect.right <= 0) continue;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      if (cx < boardRect.left - 60 || cx > boardRect.right + 100) continue;
      if (cy < boardRect.top - 175 || cy > boardRect.top + 45) continue;
      // Avoid unrelated clocks/time widgets in navigation or dialogs.
      const label = (candidate.textContent || '').trim();
      if (!/\b\d{1,3}:\d{2}(?::\d{2})?\b/.test(label)) continue;
      const score = Math.abs(boardRect.top - rect.bottom - 12) +
        Math.abs(boardRect.right - rect.right) * .18 +
        (candidate.matches?.('.clock-component') ? 0 : 4);
      matches.push({ rect, score });
    }
  }
  matches.sort((a, b) => a.score - b.score);
  return matches[0]?.rect || null;
}

function placeLauncher(boardRect) {
  if (!launcher) return;
  const clock = findTopClock(boardRect);
  const gap = 9, fullWidth = launchWidth, compactWidth = launchCompactWidth, height = launchHeight;
  let left, top, compact = false;
  if (clock) {
    top = clock.top + (clock.height - height) / 2;
    left = clock.left - gap - fullWidth;
    if (left < 8) {
      compact = true;
      left = clock.left - gap - compactWidth;
    }
    if (left < 8) { launcher.style.display = 'none'; return; }
  } else {
    // Analysis layouts can omit clocks. Keep the launcher above the board, never inside it.
    if (boardRect.top < height + 10) { launcher.style.display = 'none'; return; }
    left = Math.max(8, boardRect.right - fullWidth);
    top = boardRect.top - height - 7;
  }
  if (top < -height / 2 || top > innerHeight - 10 || left > innerWidth - compactWidth) {
    launcher.style.display = 'none'; return;
  }
  const x = `${Math.round(left)}px`, y = `${Math.max(3, Math.round(top))}px`;
  if (launcher.dataset.compact !== String(compact)) launcher.dataset.compact = String(compact);
  if (launcher.style.display !== 'block') launcher.style.display = 'block';
  if (launcher.style.left !== x) launcher.style.left = x;
  if (launcher.style.top !== y) launcher.style.top = y;
}

let missingArrowBoardTimer;
function updatePositions() {
  if (!launcher && !arrowLayer) return;
  const board = de();
  if (!board) {
    if (launcher) launcher.style.display = 'none';
    if (arrowLayer && !missingArrowBoardTimer) {
      missingArrowBoardTimer = setTimeout(() => {
        arrowLayer.style.display = 'none';
        missingArrowBoardTimer = undefined;
      }, 180);
    }
    return;
  }
  clearTimeout(missingArrowBoardTimer);
  missingArrowBoardTimer = undefined;
  const rect = board.getBoundingClientRect();
  if (rect.width < 200 || rect.height < 200 || rect.bottom < 0 || rect.top > innerHeight) {
    if (launcher) launcher.style.display = 'none';
    if (arrowLayer) arrowLayer.style.display = 'none';
    return;
  }
  placeLauncher(rect);
  if (!arrowLayer || !arrowSvg) return;
  arrowLayer.style.display = 'block';
  arrowLayer.style.left = `${rect.left}px`;
  arrowLayer.style.top = `${rect.top}px`;
  arrowLayer.style.width = `${rect.width}px`;
  arrowLayer.style.height = `${rect.height}px`;
  const arrow = arrowSvg.querySelector('#cl-arrow');
  if (!arrowUci || !arrowVisible || !arrowEnabled || !Ys(location.href).allowed || !/^([a-h][1-8]){2}[qrbn]?$/.test(arrowUci) ||
      arrowUci.slice(0, 2) === arrowUci.slice(2, 4)) {
    arrow.classList.remove('visible');
    return;
  }
  const flipped = !!board.closest('.flipped,[data-orientation="black"]');
  const square = sq => {
    const file = sq.charCodeAt(0) - 97, rank = Number(sq[1]) - 1;
    return [(flipped ? 7 - file : file) + .5, (flipped ? rank : 7 - rank) + .5];
  };
  const start = square(arrowUci.slice(0, 2)), end = square(arrowUci.slice(2, 4));
  const dx = end[0] - start[0], dy = end[1] - start[1];
  const length = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  const head = length - .29;
  const shape = `M.12,-.07 H${head} V-.195 L${length},0 L${head},.195 V.07 H.12 Q.04,.07 .04,0 Q.04,-.07 .12,-.07Z`;
  const transform = `translate(${start.join(' ')}) rotate(${angle})`;
  if (arrow.getAttribute('d') !== shape) arrow.setAttribute('d', shape);
  if (arrow.getAttribute('transform') !== transform) arrow.setAttribute('transform', transform);
  arrow.classList.add('visible');
}

let requestedGameKey, lastArchiveProbe=0, lastArchiveHints='';
function publicArchiveHints(){
  // Public profile links identify the players. Moves and results come only from PubAPI.
  const playerLinks=document.querySelectorAll(
    '.player-component a[href],.player-tagline a[href],a.user-username-component[href],'+
    '[data-cy="player-name"] a[href],a[data-cy="player-name"][href],'+
    '[data-testid="player-name"] a[href],a[data-testid="player-name"][href]');
  const candidates=[];
  for(const anchor of playerLinks){
    if(anchor.origin!==location.origin)continue;
    candidates.push(/^\/member\/([a-z\d_-]{1,50})\/?$/i.exec(anchor.pathname)?.[1]);
  }
  const playerNames=document.querySelectorAll(
    '.board-layout-player .user-username-component,.player-component .user-username-component,'+
    '.player-tagline [data-user-block-part="username"],'+
    '[data-cy="player-name"],[data-testid="player-name"]');
  for(const name of playerNames){
    const displayedName=name.textContent.trim();
    if(displayedName!=='Opponent'&&displayedName!=='Player')candidates.push(displayedName);
  }
  const username=candidates.find(name=>/^[a-z\d_-]{1,50}$/i.test(name||''));
  const now=new Date();
  const monthAt=(date,offset)=>new Date(Date.UTC(date.getUTCFullYear(),date.getUTCMonth()+offset,1)).toISOString().slice(0,7);
  const dateElement=document.querySelector('time[datetime], [data-cy="game-date"], [data-testid="game-date"], .game-date');
  const finishedDate=[...document.querySelectorAll('.game-info-tab-component .user-selectable > div')]
    .map(element=>element.textContent.trim().match(/^Finished:\s*(.+)$/i)?.[1]).find(Boolean);
  const rawDate=finishedDate||dateElement?.getAttribute('datetime')||dateElement?.textContent.trim();
  const gameDate=rawDate?new Date(rawDate):null;
  const datedMonths=Number.isFinite(gameDate?.getTime())?[monthAt(gameDate,0),monthAt(gameDate,1)]:[];
  const months=[...new Set([...datedMonths,monthAt(now,0),monthAt(now,-1),monthAt(now,-2)])]
    .filter(month=>month<=monthAt(now,0));
  return {username,months};
}
function syncBoard(force = false) {
  if(!contentContextActive())return;
  const key=chessComGameKey(location.href);
  if(boardPort && key!==requestedGameKey){
    requestedGameKey=key;
    window.ChessLensVerifiedGame=null;
    window.ChessLensReviewSummary=null;
    arrowUci=null;
    lastArchiveProbe=0;
    lastArchiveHints='';
  }
  if(boardPort&&key&&!window.ChessLensVerifiedGame){
    const {username,months}=publicArchiveHints();
    const hints=username&&username.toLowerCase()+'|'+months.join(',');
    if(hints&&(hints!==lastArchiveHints||Date.now()-lastArchiveProbe>=15000)){
      lastArchiveProbe=Date.now();
      lastArchiveHints=hints;
      if(!postBoard({type:'GET_VERIFICATION',key,username,months}))return;
    }
  }
  if (boardPort) {
    try {
      const state = ft();
      if(state.positionPending)arrowUci=null;
      if (state.allowed && window.ChessLensReviewSummary) state.review = window.ChessLensReviewSummary;
      const serialized = JSON.stringify(state);
      if (force || serialized !== lastSnapshot) {
        if(!postBoard({type:'SNAPSHOT',state}))return;
        lastSnapshot=serialized;
      }
      const board = de();
      if (board !== lastBoard) {
        lastBoard = board;
        if (board) ensureUi();
      }
      updatePositions();
    } catch(error) { if(contentContextActive())console.debug('[ChessLens] Board sync:',error); }
  }
}

function resetBoardPort(connection) {
  if(boardPort!==connection)return;
  boardPort=null;
  try{connection?.disconnect();}catch{}
  lastSnapshot='';
  requestedGameKey=undefined;
  lastArchiveProbe=0;
  lastArchiveHints='';
  window.ChessLensVerifiedGame=null;
  window.ChessLensReviewSummary=null;
  arrowUci=null;
  if(!contentContextActive())return;
  updatePositions();
  clearTimeout(boardReconnect);
  boardReconnect=setTimeout(connectBoardPort,1500);
}
function postBoard(message){
  const connection=boardPort;
  if(!connection||!contentContextActive())return false;
  try{connection.postMessage(message);return true;}
  catch(error){if(contentContextActive(error))resetBoardPort(connection);return false;}
}
function connectBoardPort() {
  if(boardPort||!contentContextActive())return;
  try {
    const connection=chrome.runtime.connect({name:'chesslens-board'});
    boardPort=connection;
    connection.onMessage.addListener(message => {
      if(boardPort!==connection||!contentContextActive())return;
      if (message?.type==='VERIFIED_GAME' && message.key===chessComGameKey(location.href)) {
        try {
          const game=new X();
          game.loadPgn(message.pgn);
          const moves=game.history({verbose:true});
          if(!moves.length)throw Error('No moves to review');
          const start=moves[0].before;
          const positions=new Map();
          for(const fen of [start,...moves.map(move=>move.after)]){
            const placement=fen.split(' ')[0];
            if(!positions.has(placement))positions.set(placement,[]);
            positions.get(placement).push(fen);
          }
          window.ChessLensVerifiedGame={key:message.key,start,moves,positions};
          syncBoard(true);
        } catch { window.ChessLensVerifiedGame=null; }
      }
      if (message?.type === 'GET_STATE') syncBoard(true);
      if (message?.type === 'PANEL_STATE') updateLauncherState(message.open);
      if (message?.type === 'NAVIGATE_GAME_MOVE') navigateGameMove(message.key,message.gameKey);
      if (message?.type === 'ARROW') {
        arrowUci = message.uci || null;
        arrowVisible = message.show !== false;
        arrowEnabled = message.enabled !== false;
        updatePositions();
      }
    });
    connection.onDisconnect.addListener(() => {
      if(handleContentDisconnect())resetBoardPort(connection);
    });
    syncBoard(true);
  } catch(error) { if(contentContextActive(error))resetBoardPort(boardPort); }
}

let syncTimer = null;
const boardObserver = new MutationObserver(records => {
  if(!contentContextActive())return;
  if (records.every(record => record.target.closest?.('#chesslens-launch,#chesslens-overlay,#chesslens-review-overlay'))) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    syncTimer = null;
    syncBoard(false);
  }, 75);
});
function start() {
  connectBoardPort();
  boardObserver.observe(document.documentElement, {
    subtree: true, childList: true, attributes: true,
    attributeFilter: ['class', 'data-node', 'data-san', 'style']
  });
  window.addEventListener('resize', updatePositions, { passive: true });
  window.addEventListener('scroll', updatePositions, { passive: true });
  boardPoll=setInterval(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      syncBoard(true);
    } else if (!syncTimer) syncBoard(false);
  }, 1200);
  syncBoard(true);
}
contextCleanup.add(()=>{
  clearInterval(boardPoll);
  clearTimeout(syncTimer);
  clearTimeout(boardReconnect);
  clearTimeout(missingArrowBoardTimer);
  boardObserver.disconnect();
  window.removeEventListener('resize',updatePositions);
  window.removeEventListener('scroll',updatePositions);
  boardPort=null;
  window.ChessLensVerifiedGame=null;
  window.ChessLensReviewSummary=null;
  launcher?.remove();
  arrowLayer?.remove();
});
start();

})();
