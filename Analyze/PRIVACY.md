# ChessLens privacy policy

Effective November 19, 2026.

ChessLens is an independent Chrome extension for reviewing finished Live and Daily games on Chess.com.

On a Chess.com Live or Daily game page, ChessLens uses the URL to identify the game. It uses public player names or profile links and date hints from the page to identify a public archive month. It automatically sends a public player username and candidate months to the official Chess.com Published-Data API. Requests omit cookies and do not send the game ID or current tab URL. Chess.com receives ordinary network information, such as your IP address, under its own privacy policy.

ChessLens compares the game identifier against the archive locally. Once it confirms a final result, it processes the archived PGN with Stockfish on your device. ChessLens matches the visible piece positions on the Chess.com board to the verified archive and places local review overlays there. Move history and final results come from the documented archive endpoint. Archived game data and evaluations are held in memory. ChessLens saves your analysis depth and best-move-arrow preferences in local extension storage. Removing the extension deletes those preferences.

ChessLens does not operate a server and contains no analytics, advertising or account system.

For privacy questions, contact the maintainer through the [ChessLens project](https://github.com/marcogarganigo/ChessLens).
