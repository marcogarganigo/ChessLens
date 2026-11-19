# ChessLens

ChessLens is an independent Chrome extension for reviewing finished standard Live and Daily games on Chess.com. It uses the documented [Chess.com Published-Data API](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-games-archive) and runs Stockfish locally.

## Use

1. Load `Analyze/extension` from `chrome://extensions` in Chrome desktop.
2. Open the exact Live or Daily game on Chess.com, then open ChessLens beside the board or from the browser toolbar.
3. ChessLens checks the public archive in the background. Once it confirms the game ID, end time and final PGN result, use the Chess.com move controls to review any position in the game.

ChessLens stays locked until the public archive confirms that the game ended. Recently finished games may take time to appear, and some games lack the public player or date information needed to find the archive. ChessLens uses the board on Chess.com to match the displayed position against the archived game and place the launcher, arrow and badge.

See the [changelog](Analyze/CHANGELOG.md), [privacy policy](Analyze/PRIVACY.md), [Chrome Web Store listing](Analyze/CHROME-WEB-STORE.md), and [Stockfish source notice](Analyze/extension/licenses/Stockfish-SOURCE.txt).
