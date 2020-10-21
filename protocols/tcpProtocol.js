const BaseProtocol = require('./baseProtocol');
const { TCPServerHandler, TCPClientHandler } = require('../handlers');
const { HOST, PORT } = require('../config');

const net = require('net');

class TCPProtocol extends BaseProtocol {
    static start() {
        const netServer = net.createServer(TCPServerHandler.onCreate);
        
        netServer.on('error', TCPServerHandler.onError);
        
        netServer.listen(PORT, HOST, TCPServerHandler.onListen);

        return netServer;
    }

    static connect(rl) {
        const netClient = new net.Socket();

        netClient.connect(PORT, HOST, TCPClientHandler.onConnect(netClient, rl));
        
        netClient.on('data', TCPClientHandler.onData);
        
        netClient.on('error', TCPClientHandler.onError);
        
        netClient.on('close', TCPClientHandler.onClose);

        return netClient;
    }
}

module.exports = TCPProtocol;
