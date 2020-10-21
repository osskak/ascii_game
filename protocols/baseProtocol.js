const { Util } = require('../lib');

class BaseProtocol {
    static start() {
        // create server side of protocol
        Util.throwMethodError('start', this.name);
    }

    static connect() {
        // client side connection (connect to server side of protocol)
        Util.throwMethodError('connect', this.name);
    }
}

module.exports = BaseProtocol;
