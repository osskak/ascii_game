const BaseSocket = require('./baseSocket');

class TCPSocket extends BaseSocket {
    constructor(socket) {
        super(socket);
    }

    _init() {
        this.address = this._socket.remoteAddress;
        this.port = this._socket.remotePort;
    }

    write(message) {
        if (!this._socket.destroyed) {
            this._socket.write(message);
        }   
    }

    destroy() {
        if (!this._socket.destroyed) {
            this._socket.destroy();
            this.destroyed = true;
        }
    }
}

module.exports = TCPSocket;
