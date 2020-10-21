const {
    database: { socketsMap },
    Util,
    Socket,
    Room,
} = require('../lib');
const GameState = require('./gameState');
const { MULTI_PLAYER_VALUE } = require('../config');

class GameLoop {
    constructor(socket, data) {
        this._socket = socket;
        this._data = data;
        this._initialized = false;
        this._cached = false;

        this._parsed = null;
        this._username = null;
        this._gameType = null;
        this._gameState = null;
    }

    _launch() {
        this._gameState = this._getGameState();
        if (!this._gameState || this._cached) return;

        if (!this._initialized) {
            this._gameState.addPlayer(this._socket, this._username);
        }
        Socket.addData(this._socket, this._gameState, this._username);
        Room.addData(this._socket, this._gameState, this._parsed);
    
        const direction = null;
        const initialization = true;
        this._write(direction, initialization);
    }

    initialize() {
        try {
            Socket.add(this._socket);
            this._initialized = true;
            return new GameState(this._socket, this._username);
        } catch (error) {
            const over = false;
            Socket.remove(this._socket, over, error);
        } 
    }

    _getGameState() {     
        if (socketsMap.has(this._socket)) {
            const { gameState } = socketsMap.get(this._socket);
            this._cached = true;
            return gameState;
        }
    
        this._parsed = Util.parseJSON(this._data);
        this._username = this._parsed.username;
        this._gameType = this._parsed.gameType;

        const isValid = Util.checkUsername(this._socket, this._username);
        if (!isValid) return null;

        if (this._gameType !== MULTI_PLAYER_VALUE) {
            return this.initialize();
        }
      
        const room = Room.getFree();
        return room ? room.gameState : this.initialize();
    }

    _handle() {
        if (!this._gameState) return;
        const key = Util.getKey(this._socket, this._data);
        if (!key) return;
        const initialization = false;
        this._write(key, initialization);
    }

    _write(direction, initialization) {
        const output = this._gameState.render(this._socket, direction, initialization);
        const room = Room.getByGameState(this._gameState);
        const players = room && room.players;

        if (!players || !players.length) return;

        players.forEach(socket => {
            if (!socket.destroyed) socket.write(output);
            if (!this._gameState.over) return;
            const error = false;
            Socket.remove(socket, this._gameState.over, error);
        });
    }

    execute() {
        try {
            this._launch();
            this._handle();
        } catch (error) {
            const over = false;
            Socket.remove(this._socket, over, error);
        }
    }
}

module.exports = GameLoop;
