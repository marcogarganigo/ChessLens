# Chrome Web Store listing

- **Name** — ChessLens
- **Short description** — Review verified finished Chess.com Live and Daily games with local Stockfish and badges on the Chess.com board.
- **Primary language** — English
- **Category** — Tools
- **Browser** — Chrome desktop 141 and later

## Detailed description

Review finished Chess.com Live and Daily games with ChessLens. Open the game on Chess.com, then open ChessLens next to the board or from the Chrome toolbar. ChessLens automatically verifies the result against the official Chess.com archive before starting Stockfish.

Step through the verified game on the Chess.com board. See move ratings and the best-move arrow on that board, then compare White and Black and explore Stockfish evaluations and variations in the side panel. ChessLens stays locked when the game is ongoing or the archive cannot confirm the result. Recently finished games may take time to appear.

ChessLens is independent and is not affiliated with or endorsed by Chess.com. Local ratings may differ from Chess.com Game Review.

## Privacy practices

**Single purpose** — Verify and review finished Chess.com games using local Stockfish analysis.

| Permission | Dashboard justification |
| --- | --- |
| `sidePanel` | Displays the local analysis, review summary and settings next to the Chess.com board. |
| `storage` | Saves analysis depth and arrow preferences on the device. |
| `offscreen` | Runs the bundled Stockfish worker for the verified game's review. |
| `https://www.chess.com/*` | Identifies the current game URL and displays the launcher and review overlays on the existing board. |
| `https://api.chess.com/*` | Retrieves the public monthly archive using the public player and month inferred from the game page to verify the game result. |

The engine and scripts are bundled. Disclose that the extension uses the current Chess.com game URL locally and automatically sends a public player username and candidate archive months directly to the official archive. See the [privacy policy](PRIVACY.md).

## Reviewer steps

Open a finished standard Live or Daily game on Chess.com. Open ChessLens from the Chrome toolbar and wait for automatic verification. Use the Chess.com move controls to review an earlier move and expand **Game review** for both players. Switch to an unfinished game or another tab and confirm that ChessLens clears the analysis and automatically checks the new game before showing any analysis.

Use a current screenshot showing the review overlays on the Chess.com board. Publish the privacy policy at a publicly accessible URL before submitting the ZIP.
