// Only explicit Live/Daily game identities qualify. Ignore query parameters.
function chessComGameKey(value) {
  try {
    const url = new URL(value);
    if (url.origin !== 'https://www.chess.com') return null;
    const current = /^\/game\/(live|daily)\/(\d+)\/?$/.exec(url.pathname);
    const legacy = /^\/(live|daily)\/game\/(\d+)\/?$/.exec(url.pathname);
    const match = current || legacy;
    if (match) return match[1] + '/' + match[2];
    const id = url.searchParams.get('id');
    if (url.pathname === '/echess/game' && /^\d+$/.test(id || '')) return 'daily/' + id;
  } catch {}
  return null;
}

async function fetchVerifiedPgn(gameKey, username, month, signal) {
  if (!/^(live|daily)\/\d+$/.test(gameKey || '') ||
      !/^[a-z\d_-]{1,50}$/i.test(username) ||
      !/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) {
    throw Error('Invalid public archive lookup.');
  }
  const archive = 'https://api.chess.com/pub/player/' + encodeURIComponent(username.toLowerCase()) +
    '/games/' + month.replace('-', '/');
  const response = await fetch(archive, {signal, credentials:'omit', redirect:'error'});
  if (response.status === 404) return null;
  if (!response.ok) throw Error('Chess.com archive unavailable. Try again later.');
  const {games} = await response.json();
  if (!Array.isArray(games)) throw Error('Chess.com returned an unexpected archive response.');
  const game = games.find(entry => chessComGameKey(entry?.url) === gameKey);
  if (!game || !Number.isSafeInteger(game.end_time) || game.end_time <= 0 ||
      game.end_time > Date.now()/1000 || new Date(game.end_time*1000).toISOString().slice(0,7) !== month) {
    return null;
  }
  if (game.rules !== 'chess') throw Error('Only standard chess games are supported.');
  const pgn = game.pgn;
  const result = typeof pgn === 'string' && /^\[Result "(1-0|0-1|1\/2-1\/2)"\][ \t]*\r?$/m.exec(pgn)?.[1];
  const movetext = typeof pgn === 'string' && pgn.replace(/\{[^}]*\}|;[^\r\n]*/g, '').trim();
  if (!result || movetext.split(/\s+/).at(-1) !== result) {
    throw Error('The archive does not contain a complete PGN with a final result.');
  }
  return pgn;
}
