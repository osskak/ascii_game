const { 
    ASCII: {
        MONET_SIGN,
    },
} = require('../config');

class User {
    constructor(cursor) {
        this.score = 0;
        this.steps = 0;
        this._cursor = cursor;
    }

    action() {
        this.steps++;
        if (this._cursor.sign === MONET_SIGN) {
            this.score++;
        }
    }
}

module.exports = User;
