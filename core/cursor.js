const { 
    COVER,
    WALL_SIGN,
    CURSOR,
    MONET_SIGN,
    ALLOWED_DIRECTION_KEYS,
    X,
    Y,
    COORDINATES_MAX,
    DIRECTION_COORDINATES,
    DIRECTION_STEPS,
} = require('../config');
const { Util } = require('../lib');

class Cursor {
    constructor(socket, gameState, gameStarted) {
        this._socket = socket;
        this._gameState = gameState;
        this.sign = COVER;

        this.previous = null;
        this.current = null;
        this._init(gameStarted);
    }

    _init(gameStarted) {
        const point = {
            x: Util.getCoordinate(X),
            y: Util.getCoordinate(Y),
        };

        if (gameStarted) {
            const cell = this._getCell(point);
            if ([MONET_SIGN, WALL_SIGN].includes(cell)) {
                return this._init(gameStarted);
            }
        }

        this.previous = point;
        this.current = point;
    }

    _getCell(point) {
        return this._gameState.getCell(point);
    }

    _set() {
        this._gameState.setCursor(this._socket);
    }

    _clear() {
        this._gameState.clearCursor(this._socket);
    }

    _playerAction() {
        this._gameState.playerAction(this._socket);
    }

    _changeCoordinates(direction) {
        const coordinate = DIRECTION_COORDINATES[direction];
        const step = DIRECTION_STEPS[direction];
        const max = COORDINATES_MAX[coordinate];
        
        const value = this.current[coordinate] + step;
        const current = {
            ...this.current,
            [coordinate]: value,
        };
        const sign = this._getCell(current);

        if (value < 1 || value > max || [WALL_SIGN, CURSOR].includes(sign)) {
            return false;
        }

        this.previous = this.current;
        this.current = current;
        this.sign = sign;
        return true;
    }

    move(direction) {
        if (!ALLOWED_DIRECTION_KEYS.includes(direction)) {
            return false;
        }

        const changed = this._changeCoordinates(direction);
        if (!changed) return false;

        this._playerAction();
        this._clear();
        this._set();
        
        return true;
    }
}

module.exports = Cursor;
