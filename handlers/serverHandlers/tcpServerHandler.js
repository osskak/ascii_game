const { HOST, PORT } = require('../../config');
const { GameLoop } = require('../../core');
const { Socket } = require('../../lib');
const { TCPSocket } = require('../../sockets');

class TCPServerHandler {
    static onCreate(socket) {
        const { remoteAddress, remotePort } = socket;
        console.log(`CONNECTED: ${remoteAddress}:${remotePort}`);
        const tcpSocket = new TCPSocket(socket);

        socket.on('data', TCPServerHandler.onSocketData(tcpSocket));
    
        socket.on('close', TCPServerHandler.onSocketClose(tcpSocket));
    
        socket.on('end', TCPServerHandler.onSocketEnd(tcpSocket));
    
        socket.on('error', TCPServerHandler.onSocketError(tcpSocket));
    }

    static onError(error) {
        console.error(error);
        process.exit(1);
    }

    static onListen() {
        console.log(`TCP server listening on ${HOST}:${PORT}`);
    }

    static onSocketData(socket) {
        return (data) => {
            const gameLoop = new GameLoop(socket, data);
            gameLoop.execute();
        };
    }

    static onSocketClose(socket) {
        return () => {
            const error = false;
            const over = false;
            Socket.remove(socket, over, error);
        };
    }

    static onSocketEnd(socket) {
        return () => {
            const error = false;
            const over = false;
            Socket.remove(socket, over, error);
        };
    }

    static onSocketError(socket) {
        return (error) => {
            const over = false;
            Socket.remove(socket, over, error);
        };
    }
}

module.exports = TCPServerHandler;
