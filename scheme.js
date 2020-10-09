const { 
    ASCII: { 
        HEIGHT,
        WIDTH,
        COVER,
        WALL_SIGN,
        CURSOR,
        SIZE,
        CLEAR,
    },
    CELL_PERCETAGE,
    CELL_KEYS,
    CELL_TYPES,
    CUSTOM_CELL,
    WALL,
    MONET,
    X,
    Y,
    RECURSION_MAX_CALL,
} = require('./config');
const { getCoordinate } = require('./helpers');

class Scheme {
    constructor(cursor) {
        this._cursor = cursor;
        this._restarts = 0;
        this._size = SIZE;
        this._maxCalls = RECURSION_MAX_CALL;

        this._rows = null;
        this.counts = {};
        this._create();
    }

    _setCells(type) {
        if (!CELL_KEYS.includes(type)) {
            throw new Error(`Unresolved type: "${type}" of cell`);
        }

        const percentage = CELL_PERCETAGE[type];
        const count = Math.floor(this._size * percentage / 100);
        this.counts[type] = count;
     
        for (let i = 0; i < count; i++) {
            this._setCell(type);
        }
    }

    _setCell(type) {
        if (this._restarts >= this._maxCalls) {
            throw new Error(`
                Cell rendering was called ${this._restarts} times. 
                Can't create such map, please change configuration
            `);
        }

        const x = getCoordinate(X);
        const y = getCoordinate(Y);
        const cell = this._rows[y][x];

        const isCustomCell = CUSTOM_CELL.includes(cell);
        const existsNextStep = this._existsNextStep(x, y);

        if (isCustomCell || !existsNextStep) {
            this._restarts++;
            return this._setCell(type);
        }

        this._restarts = 0;
        this._rows[y][x] = CELL_TYPES[type];
    }

    _existsNextStep(x, y) {
        const up = this._rows[y][x + 1];
        const down = this._rows[y][x - 1];
        const left = this._rows[y - 1][x]
        const right = this._rows[y + 1][x];

        const steps = [up, down, left, right];
        const filtered = steps.filter(step => step !== WALL_SIGN);
        return filtered.length > 2;
    }

    setCursor() {
        const { x, y } = this._cursor.current;
        this._rows[y][x] = CURSOR;
    }

    clearCursor() {
        const { x, y } = this._cursor.previous;
        this._rows[y][x] = CLEAR;
    }

    _create() {
        const fenceRow = new Array(WIDTH + 2).fill(WALL_SIGN);
        const row = new Array(WIDTH + 2).fill(COVER);
        row[0] = row[row.length - 1] = WALL_SIGN;

        this._rows = Array.from(Array(HEIGHT), () => row.slice());
        this._rows.push(fenceRow.slice());
        this._rows.unshift(fenceRow.slice());

        this.setCursor();
        this._setCells(WALL);
        this._setCells(MONET);
    }

    getCell(point) {
        const { x, y } = point;
        return this._rows[y][x];
    }

    render() {
        return this._rows.map(row => row.join('')).join('\n');
    }
}

module.exports = Scheme;
