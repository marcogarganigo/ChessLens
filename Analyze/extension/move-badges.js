const chessLensBadgeArtwork = (() => {
  // Rounded, hand-drawn versions of standard chess review symbols.
  const exclamation = 'M0 6.7q.5 3.4 0 6.2m0 4h.01';
  const question = 'M-2.8 9.1c.1-3 5.4-3.3 5.6-.2.2 2.3-2.8 2.4-2.8 4.3m0 3.6h.01';
  const mark = (shape,x,tilt=0) => `<path d="${shape}" transform="translate(${x} 0) rotate(${tilt} 0 12)"/>`;
  const BADGES = {
    brilliant:['#48d7cf','#138b91',mark(exclamation,8.8,-8)+mark(exclamation,15.4,8)],
    great:['#7abffb','#3576c4',mark(exclamation,12,9)],
    best:['#aadb5c','#59902e','<path d="m12 5.4 1.9 4 4.4.5-3.2 3 .8 4.2-3.9-2.1-3.9 2.1.8-4.2-3.2-3 4.4-.5Z" fill="currentColor" stroke-width="1.45"/>'],
    excellent:['#88ce70','#3f854b','<path d="M7 11.2v5.1m3.3.5v-6l2.5-3.5c.7-1 1.8-.6 1.8.6l-.4 2.8h3c.9 0 1.2.6 1 1.4l-1 3.7c-.2.7-.7 1-1.4 1Z" fill="currentColor" stroke-width="1.35"/>'],
    good:['#9fb982','#55764d','<path d="m6.8 12.3 3.4 3.4 7-7.3"/>'],
    inaccuracy:['#f5cf60','#bc8627',mark(question,8.9,-7)+mark(exclamation,16,9)],
    mistake:['#ffa961','#c96a32',mark(question,12,9)],
    miss:['#f28bb5','#b74a79','<path d="m8 8 8 8m0-8-8 8"/>'],
    blunder:['#fa7d77','#be434b',mark(question,8.2,-8)+mark(question,15.8,8)],
    pending:['#9eabb9','#5a6677','<path d="M7.5 12h.01m4.5 0h.01m4.5 0h.01"/>']
  };

  return function badgeArtwork(kind){
    const [light,dark,glyph]=BADGES[kind];
    const label=kind==='pending'?'Evaluating move':kind[0].toUpperCase()+kind.slice(1);
    return `<title>${label}</title><defs><linearGradient id="chesslens-${kind}" x1="0" x2="0" y1="0" y2="1" gradientUnits="objectBoundingBox">
      <stop stop-color="${light}"/><stop offset="1" stop-color="${dark}"/>
      </linearGradient></defs>
      <circle cx="12" cy="12.5" r="10.6" fill="#161b23" opacity=".75"/>
      <circle cx="12" cy="11.7" r="10.4" fill="url(#chesslens-${kind})" stroke="#222a35" stroke-width=".9"/>
      <path d="M5.8 7.1a8 8 0 0 1 7-3.2" fill="none" stroke="#fff" stroke-opacity=".40" stroke-width="1.1" stroke-linecap="round"/>
      <g class="badge-glyph" color="#fffaf0" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round">${glyph}</g>`;
  };
})();
