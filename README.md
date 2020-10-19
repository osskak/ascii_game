# ascii_game
TCP ASCII game.
Realized a single-player and multi-player format for (up to 2 players per room).
Includes server (npm run server), the client (npm run client), and a simple ASCII game.
The Player (@ symbol) can move on the field with walls (# symbol) using the keyboard arrows (up, down, left, right), collect coins ($ symbol) and after collecting all coins will see the time he spent on it.
On the terminal, he sees a map, the number of coins, and the number of steps.
In the config file(path: "./env.json"), you can choose map size, change default symbols, and so on.
