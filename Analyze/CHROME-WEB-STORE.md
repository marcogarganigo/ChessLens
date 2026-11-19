# Chrome Web Store listing

- **Name** — ChessLens
- **Short description** — Review finished Chess.com Live and Daily games with local Stockfish, move badges, an evaluation graph, and accuracy.
- **Primary language** — English
- **Category** — Tools
- **Browser** — Chrome desktop 141 and later

## Detailed description

Review finished Chess.com Live and Daily games with ChessLens. Open the game on Chess.com, then open ChessLens next to the board or from the Chrome toolbar. ChessLens automatically verifies the result against the official Chess.com archive before starting Stockfish.

Step through the verified game on the Chess.com board. See move ratings and an optional best-move arrow on the board. In the side panel, explore Stockfish evaluations and variations, see how the position changed over the game, and compare both players' move ratings and estimated accuracy.

ChessLens stays locked when a game is ongoing or the public archive cannot confirm its result. Recently finished games may take time to appear. Some games may lack the public information needed to locate their archive entry.

To verify a result, ChessLens reads the Chess.com game URL and public information visible on the game page. It sends the public player username and candidate archive months directly to the official Chess.com Published-Data API without login credentials. Stockfish runs on your device. ChessLens has no analytics, ads, or separate account.

ChessLens is independent and is not affiliated with or endorsed by Chess.com. Local ratings may differ from Chess.com Game Review.

## Privacy practices

**Single purpose** — Verify and review finished Chess.com games using local Stockfish analysis.

**Remote code** — No. All executable JavaScript and WebAssembly are bundled in the extension. The Chess.com API returns game data.

| Permission | Dashboard justification |
| --- | --- |
| `sidePanel` | Displays the local analysis, review summary and settings next to the Chess.com board. |
| `storage` | Saves analysis depth and arrow preferences on the device. |
| `offscreen` | Runs the bundled Stockfish worker for the verified game's review. |
| `https://www.chess.com/*` | Identifies the current game URL and displays the launcher and review overlays on the existing board. |
| `https://api.chess.com/*` | Retrieves the public monthly archive using the public player and month inferred from the game page to verify the game result. |

**Data categories** — Disclose **Web history** (current game URL), **Website content** (visible game information and public PGN), and **Personally identifiable information** (public player usernames). A username can identify a player even though it is publicly visible. Analysis depth and arrow preferences are saved locally. See the [privacy policy](PRIVACY.md).

**Limited Use** — Certify the statements in the dashboard after confirming the published policy matches the extension. ChessLens uses this data to verify and review the selected game and does not sell it, use it for advertising, or use it for lending.

**Privacy policy URL** — Host the supplied privacy policy at a public HTTPS URL that loads without signing in. Enter the deployed URL in Privacy practices. Use a monitored developer contact for the Chrome Web Store listing.

## Reviewer steps

1. Open the [public finished Live example](https://www.chess.com/game/live/97872578329) in Chrome. This test needs no Chess.com login. Click **Info** in Chess.com's game panel to expose the finish date used to locate this older archive entry.
2. Open ChessLens from the Chrome toolbar and wait for the completed-game analysis. Switch back to **Moves** on Chess.com and step through earlier moves. Check the destination-square badge and optional best-move arrow.
3. Expand **Game review** to see the evaluation graph and both players' move categories. Let the full review finish for both accuracy percentages.
4. Navigate to an ongoing Live or Daily game, or switch to a non-game tab. ChessLens should hide its analysis and overlays until a finished game is independently verified.

## Upload

1. Upload the versioned extension ZIP as the package. It contains `manifest.json` at the root.
2. Set the listing language to English and the category to Tools. Paste the detailed description and upload the screenshot. Upload the small promotion tile if desired.
3. Fill in Privacy practices, add the public privacy policy URL, and paste the reviewer steps under Test instructions.
4. Choose the intended visibility and regions under Distribution, then submit for review.
