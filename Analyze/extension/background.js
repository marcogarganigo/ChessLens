importScripts('archive.js');

const boardPorts = new Map();
const panels = new Set();
const latest = new Map();
const reviewPorts = new Map();
const desiredPanelState = new Map();
const verifiedGames = new Map();
let reviewDocumentPromise = null;

async function currentGameKey(tabId) {
  try {
    const tab=await chrome.tabs.get(tabId);
    return tab.pendingUrl?null:chessComGameKey(tab.url);
  } catch { return null; }
}

const archiveChecks=new Map();

async function verifyBoardGame(port, tabId, {key, username, months}) {
  if(!key||await currentGameKey(tabId)!==key||boardPorts.get(tabId)!==port)return;
  if(verifiedGames.has(key)){
    safePost(port,{type:'VERIFIED_GAME',key,pgn:verifiedGames.get(key)});
    return;
  }
  if(!/^[a-z\d_-]{1,50}$/i.test(username||'')||!Array.isArray(months))return;
  const candidates=[...new Set(months)].filter(month=>/^\d{4}-(0[1-9]|1[0-2])$/.test(month)).slice(0,4);
  if(!candidates.length)return;
  const requestKey=key+'|'+username.toLowerCase()+'|'+candidates.join(',');
  const existing=archiveChecks.get(requestKey);
  if(existing&&Date.now()<existing.retryAt)return;
  if(archiveChecks.size>=64)archiveChecks.delete(archiveChecks.keys().next().value);
  archiveChecks.set(requestKey,{retryAt:Date.now()+60000});
  const signal=AbortSignal.timeout(18000);
  try {
    for(const month of candidates){
      if(boardPorts.get(tabId)!==port||await currentGameKey(tabId)!==key)return;
      const pgn=await fetchVerifiedPgn(key,username,month,signal);
      if(!pgn)continue;
      if(verifiedGames.size>=16)verifiedGames.delete(verifiedGames.keys().next().value);
      verifiedGames.set(key,pgn);
      if(boardPorts.get(tabId)===port&&await currentGameKey(tabId)===key){
        safePost(port,{type:'VERIFIED_GAME',key,pgn});
      }
      return;
    }
  } catch {
    // A missing match or unavailable archive never authorizes analysis.
  }
}

async function ensureReviewDocument() {
  if (!chrome.offscreen?.createDocument) throw Error('Offscreen workers are unsupported by this browser');
  if (!reviewDocumentPromise) reviewDocumentPromise = (async () => {
    const exists = chrome.offscreen.hasDocument ? await chrome.offscreen.hasDocument() :
      (await chrome.runtime.getContexts({ contextTypes: ['OFFSCREEN_DOCUMENT'] })).length > 0;
    if (!exists) await chrome.offscreen.createDocument({
      url: 'review-engine.html', reasons: ['WORKERS'],
      justification: 'Run local Stockfish analysis for completed chess games'
    });
  })().catch(error => { reviewDocumentPromise = null; throw error; });
  return reviewDocumentPromise;
}

function initializeAction() {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(console.warn);
}
chrome.runtime.onInstalled.addListener(initializeAction);
chrome.runtime.onStartup.addListener(initializeAction);
initializeAction();

function safePost(port, message) { try { port?.postMessage(message); } catch {} }
function isPanelConnected(tabId) {
  for (const panel of panels) if (panel.tabId === tabId) return true;
  return false;
}
function sendPanelState(tabId, open) {
  if (!Number.isInteger(tabId)) return;
  desiredPanelState.set(tabId, !!open);
  safePost(boardPorts.get(tabId), { type: 'PANEL_STATE', open: !!open });
}
function broadcast(tabId, state) {
  for (const panel of panels) if (panel.tabId === tabId) {
    safePost(panel.port, { type: 'SNAPSHOT', state });
  }
}
function bindPanel(item) {
  const request = ++item.bindingRequest;
  const query = item.windowId===null ? {active:true,lastFocusedWindow:true} : {active:true,windowId:item.windowId};
  chrome.tabs.query(query, tabs => {
    if (request!==item.bindingRequest || !panels.has(item)) return;
    const tab = tabs?.[0];
    const tabId = tab?.id;
    if (!Number.isInteger(tabId)) return;
    const previousTabId = item.tabId;
    item.tabId = tabId;
    item.windowId = tab.windowId;
    if (previousTabId!==null && previousTabId!==tabId) safePost(boardPorts.get(previousTabId), {type:'ARROW',uci:null});
    if (previousTabId !== null && previousTabId !== tabId && !isPanelConnected(previousTabId)) {
      sendPanelState(previousTabId, false);
    }
    safePost(item.port, { type: 'CONNECTED', tabId });
    sendPanelState(tabId, true);
    const boardState = latest.get(tabId);
    const gameKey=tab.pendingUrl?null:chessComGameKey(tab.url);
    if (boardState && boardState.gameKey===gameKey) safePost(item.port,{type:'SNAPSHOT',state:boardState});
    else safePost(item.port,{type:'SNAPSHOT',state:{allowed:false,restricted:true,gameKey,
      reason:gameKey?'No analysis available for this game.':'Open a Live or Daily game on Chess.com.'}});
    safePost(boardPorts.get(tabId), { type: 'GET_STATE' });
  });
}

function toggleSidePanel(sender, sendResponse) {
  const tabId = sender.tab?.id;
  const windowId = sender.tab?.windowId;
  if (!Number.isInteger(tabId)) {
    sendResponse({ ok: false, error: 'ChessLens is only available on a Chess.com tab' });
    return false;
  }
  const open = desiredPanelState.has(tabId) ? desiredPanelState.get(tabId) : isPanelConnected(tabId);
  if (open) {
    if (typeof chrome.sidePanel.close !== 'function') {
      sendResponse({ ok: false, error: 'Closing the side panel requires Chrome 141 or newer' });
      return false;
    }
    // For Chrome 145+ closing a global panel via tabId rejects. Retry with windowId.
    let operation = chrome.sidePanel.close({ tabId });
    if (Number.isInteger(windowId)) {
      operation = operation.catch(() => chrome.sidePanel.close({ windowId }));
    }
    operation.then(() => {
      sendPanelState(tabId, false);
      sendResponse({ ok: true, open: false });
    }).catch(error => sendResponse({ ok: false, error: String(error) }));
  } else {
    // Must be issued during the extension's user gesture, without awaits before open().
    const operation = chrome.sidePanel.open({ tabId });
    operation.then(() => {
      sendPanelState(tabId, true);
      sendResponse({ ok: true, open: true });
    }).catch(error => sendResponse({ ok: false, error: String(error) }));
  }
  return true;
}

chrome.runtime.onConnect.addListener(port => {
  if (port.name === 'chesslens-board') {
    const tabId = port.sender?.tab?.id;
    if (!Number.isInteger(tabId)) { port.disconnect(); return; }
    boardPorts.set(tabId, port);
    port.onMessage.addListener(async msg => {
      if(msg?.type==='GET_VERIFICATION')verifyBoardGame(port,tabId,msg);
      if (msg?.type === 'SNAPSHOT' && msg.state) {
        if(msg.state.allowed&&!verifiedGames.has(msg.state.gameKey))return;
        const previous=latest.get(tabId);
        latest.set(tabId,msg.state);
        if(previous?.gameKey!==msg.state.gameKey || msg.state.restricted){
          if(previous?.allowed)reviewPorts.get(tabId)?.disconnect();
        }
        broadcast(tabId,msg.state);
      }
    });
    port.onDisconnect.addListener(() => {
      if (boardPorts.get(tabId) === port) {
        boardPorts.delete(tabId);
        latest.delete(tabId);
        broadcast(tabId, { allowed: false, reason: 'Page disconnected' });
      }
    });
    safePost(port, { type: 'PANEL_STATE', open: isPanelConnected(tabId) || desiredPanelState.get(tabId) === true });
    safePost(port, { type: 'GET_STATE' });
  } else if (port.name === 'chesslens-review') {
    const tabId = port.sender?.tab?.id;
    if (!Number.isInteger(tabId)) { port.disconnect(); return; }
    reviewPorts.set(tabId, port);
    port.onMessage.addListener(async msg => {
      if (!['REVIEW_GAME', 'REVIEW_PRIORITY'].includes(msg?.type) || !Number.isInteger(msg.gameId)) return;
      try {
        if(!verifiedGames.has(msg.gameKey)||await currentGameKey(tabId)!==msg.gameKey)return;
        await ensureReviewDocument();
        if(reviewPorts.get(tabId)!==port||await currentGameKey(tabId)!==msg.gameKey)return;
        const request = { target: 'review-offscreen', type: msg.type, tabId, gameId: msg.gameId };
        if (msg.type === 'REVIEW_GAME') request.positions = msg.positions;
        else request.fens = msg.fens;
        if (msg.type === 'REVIEW_GAME') {
          request.preferred = msg.preferred;
          request.moves = msg.moves;
        }
        const ack = await chrome.runtime.sendMessage(request);
        if (!ack?.ok) throw Error(ack?.error || 'Review engine did not acknowledge the request');
        if (msg.type === 'REVIEW_GAME') safePost(port, { type: 'REVIEW_ACCEPTED', gameId: msg.gameId, count: ack.count });
      } catch (error) { safePost(port, { type: 'REVIEW_ERROR', gameId: msg.gameId, error: String(error) }); }
    });
    port.onDisconnect.addListener(() => {
      if (reviewPorts.get(tabId) === port) {
        reviewPorts.delete(tabId);
        chrome.runtime.sendMessage({ target: 'review-offscreen', type: 'REVIEW_CANCEL', tabId }).catch(() => {});
      }
    });
  } else if (port.name === 'chesslens-panel') {
    const item = { port, tabId: null, windowId: null, bindingRequest: 0 };
    panels.add(item);
    bindPanel(item);
    port.onMessage.addListener(msg => {
      if (msg?.type === 'REFRESH') bindPanel(item);
      const state=latest.get(item.tabId);
      if(msg?.type==='NAVIGATE_GAME_MOVE'&&msg.tabId===item.tabId&&msg.gameKey&&
        state?.gameKey===msg.gameKey&&['ArrowLeft','ArrowRight'].includes(msg.key)){
        safePost(boardPorts.get(item.tabId),msg);
      }
      if (msg?.type === 'ARROW' && (msg.uci===null || (msg.tabId===item.tabId && state?.allowed && state.gameKey===msg.gameKey))) {
        safePost(boardPorts.get(item.tabId), msg);
      }
      if (msg?.type === 'GET_STATE') safePost(boardPorts.get(item.tabId), { type: 'GET_STATE' });
    });
    port.onDisconnect.addListener(() => {
      panels.delete(item);
      if (!isPanelConnected(item.tabId)) sendPanelState(item.tabId, false);
      safePost(boardPorts.get(item.tabId), { type: 'ARROW', uci: null });
    });
  }
});

chrome.tabs.onActivated.addListener(() => { for (const panel of panels) bindPanel(panel); });
chrome.tabs.onUpdated.addListener((tabId, change) => {
  if(change.url&&chessComGameKey(change.url)!==latest.get(tabId)?.gameKey){
    latest.delete(tabId);
    reviewPorts.get(tabId)?.disconnect();
    for(const panel of panels)if(panel.tabId===tabId)bindPanel(panel);
  }
  if (change.status === 'complete') {
    for (const panel of panels) if (panel.tabId === tabId) bindPanel(panel);
  }
});
chrome.tabs.onRemoved.addListener(tabId => {
  boardPorts.delete(tabId);
  latest.delete(tabId);
  desiredPanelState.delete(tabId);
});

// The native X button may close the side panel without going through ChessLens.
// Reconcile both browser events and the panel-port disconnect to avoid stale buttons.
if (chrome.sidePanel.onOpened?.addListener) {
  chrome.sidePanel.onOpened.addListener(info => {
    if (!String(info?.path || '').endsWith('panel.html')) return;
    if (Number.isInteger(info.tabId)) sendPanelState(info.tabId, true);
    else if (Number.isInteger(info.windowId)) {
      chrome.tabs.query({ active: true, windowId: info.windowId }, tabs => sendPanelState(tabs?.[0]?.id, true));
    }
  });
}
if (chrome.sidePanel.onClosed?.addListener) {
  chrome.sidePanel.onClosed.addListener(info => {
    if (!String(info?.path || '').endsWith('panel.html')) return;
    if (Number.isInteger(info.tabId)) sendPanelState(info.tabId, false);
    else if (Number.isInteger(info.windowId)) {
      chrome.tabs.query({ active: true, windowId: info.windowId }, tabs => sendPanelState(tabs?.[0]?.id, false));
    }
  });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.target === 'review-background' && msg.type === 'REVIEW_POSITION_RESULT') {
    safePost(reviewPorts.get(msg.tabId), {
      type: 'REVIEW_POSITION_RESULT', gameId: msg.gameId,
      fen: msg.fen, move: msg.move, result: msg.result, error: msg.error
    });
    sendResponse({ ok: true });
    return false;
  }
  if (['TOGGLE_PANEL', 'OPEN_PANEL'].includes(msg?.type)) {
    if (msg.type === 'TOGGLE_PANEL') return toggleSidePanel(sender, sendResponse);
    const tabId = sender.tab?.id;
    if (!Number.isInteger(tabId)) {
      sendResponse({ ok: false, error: 'Missing tab' }); return false;
    }
    chrome.sidePanel.open({ tabId }).then(() => {
      sendPanelState(tabId, true);
      sendResponse({ ok: true, open: true });
    }).catch(error => sendResponse({ ok: false, error: String(error) }));
    return true;
  }
});
