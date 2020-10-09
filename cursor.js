const { 
    ASCII: {
        COVER,
        WALL_SIGN,
    },
    ALLOWED_DIRECTION_KEYS,
    X,
    Y,
    COORDINATES_MAX,
    DIRECTION_COORDINATES,
    DIRECTION_STEPS,
} = require('./config');
const { getCoordinate } = require('./helpers');

class Cursor {
    constructor(engine) {
        this._engine = engine;
        this.previous = {
            x: getCoordinate(X),
            y: getCoordinate(Y),
        };
        this.current = this.previous;
        this.sign = COVER;
    }

    _getCell(point) {
        return this._engine.getCell(point);
    }

    _set() {
        this._engine.setCursor();
    }

    _clear() {
        this._engine.clearCursor();
    }

    _userAction() {
        this._engine.userAction();
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

        if (value < 1 || value > max || sign === WALL_SIGN) {
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

        this._userAction();
        this._clear();
        this._set();
        
        return true;
    }
}

module.exports = Cursor;
