const { Util } = require('../lib');

class BaseSocket {
    constructor(socket) {
        this._socket = socket;
        this.destroyed = false;
        this.address = null;
        this.port = null;
        this._init();
    }

    _init() {
        // set address and port defined
        Util.throwMethodError('_init', this.name);
    }

    write() {
        // write data to socket
        Util.throwMethodError('write', this.name);
    }

    destroy() {
        // destroy socket connection
        Util.throwMethodError('destroy', this.name);
    }
}

module.exports = BaseSocket;
