const {
    database: { socketsMap },
    Util,
    Socket,
    Room,
} = require('../lib');
const GameLoop = require('./gameLoop');
const { MULTI_PLAYER_VALUE } = require('../config');

class GameClient {
    static launch(socket, data) {
        if (socketsMap.has(socket)) {
            const { gameLoop } = socketsMap.get(socket);
            return gameLoop;
        }
    
        const parsed = JSON.parse(data);
        const { username } = parsed;
        const isValid = Util.checkUsername(socket, username);
        if (!isValid) return null;
    
        const { gameLoop, initialized } = GameClient.getGameLoop(socket, parsed);
        if (!initialized) gameLoop.addPlayer(socket, username);
    
        Socket.addData(socket, gameLoop, username);
        Room.addData(socket, gameLoop, parsed);
    
        const direction = null;
        const initialization = true;
        const output = gameLoop.render(socket, direction, initialization);
        
        const room = Room.getByGameLoop(gameLoop);
        room.players.forEach(socket => {
            if (!socket.destroyed) socket.write(output);
        });
        return gameLoop;
    }

    static initialize(socket, username) {
        try {
            Socket.add(socket);
            const gameLoop = new GameLoop(socket, username);
            return gameLoop;
        } catch (error) {
            const over = false;
            Socket.remove(socket, over, error);
        } 
    }

    static getGameLoop(socket, parsed) {
        const { gameType, username } = parsed;
        
        if (gameType !== MULTI_PLAYER_VALUE) {
            const gameLoop = GameClient.initialize(socket, username);
            return {
                gameLoop,
                initialized: true,
            };
        }
      
        const room = Room.getFree();
        const gameLoop = room ? room.gameLoop : GameClient.initialize(socket, username);
        return {
            gameLoop,
            initialized: !room,
        };
    }

    static handle(socket, gameLoop, data) {
        const key = Util.getKey(socket, data);
        if (!key) return;
        
        const initialization = false;
        const output = gameLoop.render(socket, key, initialization);
    
        const room = Room.getByGameLoop(gameLoop);
        room.players.forEach(socket => {
            if (!socket.destroyed) socket.write(output);
            if (!gameLoop.over) return;
            const error = false;
            Socket.remove(socket, gameLoop.over, error);
        });
    }
}

module.exports = GameClient;
