const { 
    EXIT_MESSAGE, 
    OVER_MESSAGE,
    TIME_MESSAGE,    
    MONET,
} = require('../config');

const { Util } = require('../lib');
const Cursor = require('./cursor');
const Player = require('./player');
const GameMap = require('./gameMap');

class GameLoop {
    constructor(socket, username) {
        const gameStarted = false;
        const cursor = new Cursor(socket, this, gameStarted);
        const player = new Player(cursor, username);

        this._cursors = new Map([[socket, cursor]]);
        this._players = new Map([[socket, player]]);
        this._map = new GameMap(socket, this._cursors);
        
        this._output = null;
        this._startDate = null;
        this._finishDate = null;
        this.over = false;
    }

    addPlayer(socket, username) {
        const gameStarted = true;
        const cursor = new Cursor(socket, this, gameStarted);
        const player = new Player(cursor, username);

        this._players.set(socket, player);
        this._cursors.set(socket, cursor);
        this.setCursor(socket);
    }

    setCursor(socket) {
        this._map.setCursor(socket);
    }

    clearCursor(socket) {
        this._map.clearCursor(socket);
    }

    getCell(point) {
        return this._map.getCell(point);
    }

    playerAction(socket) {
        this._players.get(socket).action();
    }

    _totalScore() {
        let players = this._players.values();
        players = Array.from(players);
        return players.reduce((total, player) => total += player.score, 0);
    }

    _checkOver() {
        if (this._totalScore() === this._map.counts[MONET]) {
            this._finishDate = new Date();
            this.over = true;
        }
    }

    _getPlayersData() {
        let players = this._players.values();
        players = Array.from(players);
        return players.reduce((total, player, index) => {
            const { name, score, steps } = player;
            total += `Player: "${name}" score: ${score} steps: ${steps}`;
            if (index !== players.length - 1) {
                total += '\n';
            }
            return total;
        }, '');
    }

    _renderOutput() {
        const map = this._map.render();
        const playersData = this._getPlayersData();
        let output = `${map}\n${playersData}`;
        
        if (this.over) {
            const time = Util.getTime(this._startDate, this._finishDate);
            output = `${output}\n${OVER_MESSAGE}\n${TIME_MESSAGE}: ${time}`;
        } else {
            output = `${EXIT_MESSAGE}\n${output}`;
        }

        this._output = output;
    }

    render(socket, direction, initialization) {
        if (initialization) {
            this._startDate = new Date();
            this._renderOutput();
        } else {
            const moved = this._cursors.get(socket).move(direction);
            if (moved) {
                this._checkOver();
                this._renderOutput();
            }
        }

        return this._output;
    }
}

module.exports = GameLoop;
