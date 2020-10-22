# ASCII Game
Simple ASCII game. Realized a single-player and multi-player format. For now, realized only support of TCP protocol.

To create server please run command in the projects root directory:
```
npm run server
```
![running of server](https://github.com/osskak/ascii_game/blob/master/static/img/server.png?raw=true)


For creating each client please run command in the projects root directory:
```
npm run client
```
![running of client](https://github.com/osskak/ascii_game/blob/master/static/img/client.png?raw=true)

The Player can move on the field with walls using the keyboard arrows (up, down, left, right), collect coins.
On the terminal, he sees a map, the number of coins, and the number of steps.
![game started](https://github.com/osskak/ascii_game/blob/master/static/img/game_started.png?raw=true)

After collecting all coins will see the time he spent on it.
![game over](https://github.com/osskak/ascii_game/blob/master/static/img/game_over.png?raw=true)

In the config file(in the root directory "env.json"), you can choose map size, change default symbols, and so on.
Here is a default example.
```
{
    "PROTOCOL": "TCP",
    "HOST": "127.0.0.1",
    "PORT": 6969,
    "WALL_SIGN": "#",
    "CURSOR": "@",
    "MONET_SIGN": "$",
    "COVER": ".",
    "CLEAR": " ",
    "WALL_PERCENTAGE": 15,
    "MONET_PERCENTAGE": 15,
    "MAX_PLAYERS": 2,
    "USUAL_STEP_LIMIT": 2,
    "DIAGONAL_STEP_LIMIT": 4,
    "HEIGHT": 10,
    "WIDTH": 25,
    "RECURSION_MAX_CALL_MULTIPLIER": 20
}
```