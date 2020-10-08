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
        this.engine = engine;
        this.previous = {
            x: getCoordinate(X),
            y: getCoordinate(Y),
        };
        this.current = this.previous;
        this.sign = COVER;
    }

    _getCell(point) {
        return this.engine.getCell(point);
    }

    _set() {
        this.engine.setCursor();
    }

    _clear() {
        this.engine.clearCursor();
    }

    _userAction() {
        this.engine.userAction();
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

    move(direction, initialization) {
        if (initialization) {
            this._set();
            return true;
        }

        if (!ALLOWED_DIRECTION_KEYS.includes(direction)) {
            return false;
        }

        const changed = this._changeCoordinates(direction);
        
        if (changed) {
            this._userAction();
            this._clear();
            this._set();
        }
        
        return true;
    }
}

module.exports = Cursor;
