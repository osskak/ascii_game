const { 
    HEIGHT,
    WIDTH,
    COVER,
    WALL_SIGN,
    CURSOR,
    SIZE,
    CLEAR,
    CELL_PERCETAGE,
    CELL_KEYS,
    CELL_TYPES,
    CUSTOM_CELL,
    WALL,
    MONET,
    X,
    Y,
    RECURSION_MAX_CALL,
    USUAL_STEP_LIMIT,
    DIAGONAL_STEP_LIMIT,
} = require('../config');
const { getCoordinate } = require('../lib/helpers');

class Scheme {
    constructor(socket, cursors) {
        this._cursors = cursors;
        this._restarts = 0;
        this._size = SIZE;
        this._maxCalls = RECURSION_MAX_CALL;

        this._rows = null;
        this.counts = {};
        this._create(socket);
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

    _isNotWall(cell) {
        return cell !== WALL_SIGN;
    }

    _getUsualSteps(x, y) {
        const up = this._rows[y][x + 1];
        const down = this._rows[y][x - 1];
        const left = this._rows[y - 1][x]
        const right = this._rows[y + 1][x];

        const usual = [up, down, left, right];
        return usual;
    }

    _getDiagonalSteps(x, y) {
        const upLeft = this._rows[y + 1][x - 1];
        const upRight = this._rows[y + 1][x + 1];
        const downLeft = this._rows[y - 1][x - 1];
        const downRight = this._rows[y - 1][x + 1];

        const diagonal = [upLeft, upRight, downLeft, downRight];
        return diagonal;
    }

    _existsNextStep(x, y) {
        const usual = this._getUsualSteps(x, y);
        const diagonal = this._getDiagonalSteps(x, y);
        const atEnd = [1, WIDTH].includes(x) || [1, HEIGHT].includes(y);
       
        const usualLimit = USUAL_STEP_LIMIT;
        const filteredUsual = usual.filter(this._isNotWall);
        const allowedUsual = filteredUsual.length >= usualLimit;

        const diagonalLimit = atEnd ? USUAL_STEP_LIMIT : DIAGONAL_STEP_LIMIT;
        const filteredDiagonal = diagonal.filter(this._isNotWall);
        const allowedDiagonal = filteredDiagonal.length >= diagonalLimit;
        
        return allowedUsual && allowedDiagonal;
    }

    _existsFullWall() {
        for (let i = 1; i <= HEIGHT; i++) {
            // check if exists horizontal wall line
            const exists = this._rows[i].every(cell => cell === WALL_SIGN);
            if (exists) return true;
        }
        for (let i = 1; i <= WIDTH; i++) {
            // check if exists vertical wall line
            const vertical = this._rows.map(row => row[i]);
            const exists = vertical.every(cell => cell === WALL_SIGN);
            if (exists) return true;
        }
        return false;
    }

    setCursor(socket) {
        const { x, y } = this._cursors.get(socket).current;
        this._rows[y][x] = CURSOR;
    }

    clearCursor(socket) {
        const { x, y } = this._cursors.get(socket).previous;
        this._rows[y][x] = CLEAR;
    }

    _create(socket) {
        const fenceRow = new Array(WIDTH + 2).fill(WALL_SIGN);
        const row = new Array(WIDTH + 2).fill(COVER);
        row[0] = row[row.length - 1] = WALL_SIGN;

        this._rows = Array.from(Array(HEIGHT), () => row.slice());
        this._rows.push(fenceRow.slice());
        this._rows.unshift(fenceRow.slice());

        this.setCursor(socket);
        this._setCells(WALL);
        this._setCells(MONET);

        if (this._existsFullWall()) {
            this._create(socket);
        }
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
