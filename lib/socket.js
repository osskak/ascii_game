const { 
    LEFT_MESSAGE,
    SERVER_ERROR,
} = require('../config');
const {
    sockets,
    socketsMap,
} = require('./database');

class Socket {
    static add(socket) {
        sockets.push(socket);
    }

    static remove(socket, over, error) {
        const { remoteAddress, remotePort } = socket;
        const index = sockets.indexOf(socket);
    
        if (error && typeof error !== 'string') {
            console.error(error);
        }
        if (index > -1) {
            sockets.splice(index, 1);
        }
        Socket.removeData(socket);
    
        if (socket.destroyed) return;
        if (!over) {
            const message = error
                ? typeof error === 'string' ? error : SERVER_ERROR
                : LEFT_MESSAGE;
            socket.write(`\n${message}`);
        }
        
        socket.destroy();
        console.log(`DISCONNECTED: ${remoteAddress}:${remotePort}`);
    }

    static addData(socket, gameLoop, username) {
        const socketData = {
            username,
            gameLoop,
        };
        socketsMap.set(socket, socketData);
    }

    static removeData(socket) {
        if (socketsMap.has(socket)) {
            socketsMap.delete(socket);
        }
    }
}

module.exports = Socket;
