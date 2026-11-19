# Changelog

## 2.7.17

- Add a compact Stockfish evaluation graph and per-player accuracy to Game Review.
- Recognize the current Chess.com player labels and use the finish date when the native Info tab displays it.
- Prepare the English Chrome Web Store listing, reviewer instructions, and privacy disclosures.

## 2.7.10

- Use larger, dedicated toolbar icons while retaining the Chrome Web Store icon's 16 px transparent margin.
- Keep Left and Right available for move navigation when the side panel has focus.
- Display matching move badges in the game review table and on the board.
- Verify completed Live and Daily games automatically using the public Chess.com archive before starting Stockfish.
- Recover from disconnected extension ports and retry a failed panel worker once.

## 2.2.0

- Rename the extension and its launcher to ChessLens.
- Show a destination-square badge for the selected move and update it when Stockfish finishes.
- Resolve moves in analysis variations when a legal continuation can be reconstructed.

## v2.1.0 — English UI, clock-side toggle
- Place Analyze directly to the left of the upper Chess.com game clock; keep it outside the board and avoid covering the timer or settings gear.
- Follow clock movement and window resizing, and use a compact icon-only control where there is not enough horizontal space.
- Toggle the Chrome side panel open and closed with the same button; handle Chrome 145+ global-panel close via windowId fallback.
- Sync the toggle's active state when Chrome's built-in close button is used or the active tab changes.
- Translate Chess.com detection and approximate-FEN warnings into English throughout the extension.
- Retain the review progress tooltip and the v2.0 smooth panel, Stockfish, and move badges.
- Add deterministic side-panel toggle tests and a Chromium visual/interaction test using a synthetic clock + board fixture.

## v2.0.0 — Smooth, persistent side panel
- Stop rebuilding variation cards every time Stockfish reports progress.
- Render at a capped rate, and change text only when data actually changes.
- Cache the current-position evaluation so revisiting moves does not blank the UI.
- Keep three stable placeholders while the next position is being calculated.
- Avoid hiding the panel on temporary page DOM interruptions.
- Do not mark an interrupted engine search as fully complete.
- Add a browser-free repeatable panel regression test.

## v1.9.0 — Full-game reviews
- Analyze all detected main-line positions rather than the viewed move only.
- Preserve the queued moves when the user navigates; prioritize newly selected moves.
- Cache Stockfish position results and stream ratings to the board.
- Handle terminal checkmate and stalemate positions.
- Keep generic/pending icons hidden; use only verified engine evaluations.
- Add a small progress tooltip to the existing Analyze launcher.
- Add realistic board smoke and end-to-end pipeline tests.
