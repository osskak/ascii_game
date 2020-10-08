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
} = require('./config');
const { getCoordinate } = require('./helpers');

class Scheme {
    constructor(cursor) {
        this.cursor = cursor;
        this.rows = null;
        this.restarts = 0;
        this.size = SIZE;
        this.counts = {};
        this._create();
    }

    _setCells(type) {
        if (!CELL_KEYS.includes(type)) {
            throw new Error(`Unresolved type: "${type}" of cell`);
        }

        const percentage = CELL_PERCETAGE[type];
        const count = Math.floor(this.size * percentage / 100);
        this.counts[type] = count;
     
        for (let i = 0; i < count; i++) {
            this._setCell(type);
        }
    }

    _setCell(type) {
        if (this.restarts >= this.size) {
            throw new Error(`
                Cell rendering was called ${this.restarts} times. 
                Can't create such map, please change configuration
            `);
        }

        const x = getCoordinate(X);
        const y = getCoordinate(Y);
        const cell = this.rows[y][x];

        const isCustomCell = CUSTOM_CELL.includes(cell);
        const isWall = type === WALL;
        const notExistsNextStep = isWall && !this._existsNextStep(x, y)

        if (isCustomCell || notExistsNextStep) {
            this.restarts++;
            return this._setCell(type);
        }

        this.restarts = 0;
        this.rows[y][x] = CELL_TYPES[type];
    }

    _existsNextStep(x, y) {
        const up = this.rows[y][x + 1];
        const down = this.rows[y][x - 1];
        const left = this.rows[y - 1][x]
        const right = this.rows[y + 1][x];

        const steps = [up, down, left, right];
        const filtered = steps.filter(step => step !== WALL_SIGN);
        return filtered.length > 1;
    }

    setCursor() {
        const { x, y } = this.cursor.current;
        this.rows[y][x] = CURSOR;
    }

    clearCursor() {
        const { x, y } = this.cursor.previous;
        this.rows[y][x] = CLEAR;
    }

    _create() {
        const fenceRow = new Array(WIDTH + 2).fill(WALL_SIGN);
        const row = new Array(WIDTH + 2).fill(COVER);
        row[0] = row[row.length - 1] = WALL_SIGN;

        this.rows = Array.from(Array(HEIGHT), () => row.slice());
        this.rows.push(fenceRow.slice());
        this.rows.unshift(fenceRow.slice());

        this.setCursor();
        this._setCells(WALL);
        this._setCells(MONET);
    }

    getCell(point) {
        const { x, y } = point;
        return this.rows[y][x];
    }

    render() {
        return this.rows.map(row => row.join('')).join('\n');
    }
}

module.exports = Scheme;
