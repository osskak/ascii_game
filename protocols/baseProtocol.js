const { Util } = require('../lib');

class BaseProtocol {
    static start() {
        // create server side of protocol
        Util.throwMethodErrorMessage('start', this.name);
    }

    static connect() {
        // client side connection (connect to server side of protocol)
        Util.throwMethodErrorMessage('connect', this.name);
    }
}

module.exports = BaseProtocol;
