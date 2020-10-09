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
        this._cursor = new Cursor(this);
        this._scheme = new Scheme(this._cursor);
        this._user = new User(this._cursor);
        
        this._output = null;
        this._startDate = null;
        this._finishDate = null;
        this.over = false;
    }

    setCursor() {
        this._scheme.setCursor();
    }

    clearCursor() {
        this._scheme.clearCursor();
    }

    getCell(point) {
        return this._scheme.getCell(point);
    }

    userAction() {
        this._user.action();
    }

    _checkOver() {
        if (this._user.score === this._scheme.counts[MONET]) {
            this._finishDate = new Date();
            this.over = true;
        }
    }

    _renderOutput() {
        const map = this._scheme.render();
        const { score, steps } = this._user;
        let output = `${map}\nscore: ${score}\nsteps: ${steps}`;
        
        if (this.over) {
            const time = getTime(this._startDate, this._finishDate);
            output = `${output}\n${OVER_MESSAGE}\n${TIME_MESSAGE}: ${time}`;
        } else {
            output = `${EXIT_MESSAGE}\n${output}`;
        }

        this._output = output;
    }

    render(direction, initialization) {
        if (initialization) {
            this._startDate = new Date();
            this._renderOutput();
        } else {
            const moved = this._cursor.move(direction);
            if (moved) {
                this._checkOver();
                this._renderOutput();
            }
        }

        return this._output;
    }
}

module.exports = Engine;
