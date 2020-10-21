const { PROTOCOL, TCP } = require('./config');
const { TCPProtocol } = require('./protocols');

class App {
    static start() {
        const Protocol = App.getProtocol(PROTOCOL);
        return Protocol.start();
    }

    static connect(readlineInterface) {
        const Protocol = App.getProtocol(PROTOCOL);
        return Protocol.connect(readlineInterface);
    }

    static getProtocol(protocol) {
        switch(protocol) {
            case TCP:
                return TCPProtocol;
            default:
                throw new Error(`Unresolved protocol type: ${protocol}`);
        }
    }
}

module.exports = App;
