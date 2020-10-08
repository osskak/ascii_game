const { 
    EXIT_MESSAGE, 
    OVER_MESSAGE,
    TIME_MESSAGE,    
    MONET,
} = require('./config');
const { getTime } = require('./helpers');

const Cursor = require('./cursor');
const User = require('./user');
const Scheme = require('./scheme');

class Engine {
    constructor() {
        this.output = null;
        this.cursor = new Cursor(this);
        this.scheme = new Scheme(this.cursor);
        this.user = new User(this.cursor);
        this.startDate = null;
        this.finishDate = null;
        this.over = false;
    }

    setCursor() {
        this.scheme.setCursor();
    }

    clearCursor() {
        this.scheme.clearCursor();
    }

    getCell(point) {
        return this.scheme.getCell(point);
    }

    userAction() {
        this.user.action();
    }

    _checkOver() {
        if (this.user.score === this.scheme.counts[MONET]) {
            this.finishDate = new Date();
            this.over = true;
        }
    }

    _getOutput() {
        const map = this.scheme.render();
        let output = `${map}\nscore: ${this.user.score}\nsteps: ${this.user.steps}`;
        if (this.over) {
            const time = getTime(this.startDate, this.finishDate);
            output = `${output}\n${OVER_MESSAGE}\n${TIME_MESSAGE}: ${time}`;
        }
        output = `${EXIT_MESSAGE}\n${output}`;
        return output;
    }

    render(direction, initialization) {
        if (initialization) {
            this.startDate = new Date();
        }

        const moved = this.cursor.move(direction, initialization);
        if (moved) {
            this._checkOver();
            this.output = this._getOutput();
        }
        return this.output;
    }
}

module.exports = Engine;
