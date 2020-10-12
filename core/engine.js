const { 
    EXIT_MESSAGE, 
    OVER_MESSAGE,
    TIME_MESSAGE,    
    MONET,
} = require('../config');
const { getTime } = require('../lib/helpers');

const Cursor = require('./cursor');
const User = require('./user');
const Scheme = require('./scheme');

class Engine {
    constructor(socket, username) {
        const cursor = new Cursor(socket, this);
        const user = new User(cursor, username);

        this._cursors = new Map([[socket, cursor]]);
        this._users = new Map([[socket, user]]);
        this._scheme = new Scheme(socket, this._cursors);
        
        this._output = null;
        this._startDate = null;
        this._finishDate = null;
        this.over = false;
    }

    addUser(socket, username) {
        const cursor = new Cursor(socket, this);
        const user = new User(cursor, username);

        this._users.set(socket, user);
        this._cursors.set(socket, cursor);
        this.setCursor(socket);
    }

    setCursor(socket) {
        this._scheme.setCursor(socket);
    }

    clearCursor(socket) {
        this._scheme.clearCursor(socket);
    }

    getCell(point) {
        return this._scheme.getCell(point);
    }

    userAction(socket) {
        this._users.get(socket).action();
    }

    _totalScore() {
        let users = this._users.values();
        users = Array.from(users);
        return users.reduce((total, user) => total += user.score, 0);
    }

    _checkOver() {
        if (this._totalScore() === this._scheme.counts[MONET]) {
            this._finishDate = new Date();
            this.over = true;
        }
    }

    _getUsersData() {
        let users = this._users.values();
        users = Array.from(users);
        return users.reduce((total, user, index) => {
            const { name, score, steps } = user;
            total += `Player: "${name}" score: ${score} steps: ${steps}`;
            if (index !== users.length - 1) {
                total += '\n';
            }
            return total;
        }, '');
    }

    _renderOutput() {
        const map = this._scheme.render();
        const usersData = this._getUsersData();
        let output = `${map}\n${usersData}`;
        
        if (this.over) {
            const time = getTime(this._startDate, this._finishDate);
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

module.exports = Engine;
