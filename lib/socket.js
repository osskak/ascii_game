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
        const index = sockets.indexOf(socket);
        if (index === -1) {
            sockets.push(socket);
        }
    }

    static remove(socket, over, error) {
        const { address, port } = socket;
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
        console.log(`DISCONNECTED: ${address}:${port}`);
    }

    static addData(socket, gameState, username) {
        const socketData = {
            username,
            gameState,
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
