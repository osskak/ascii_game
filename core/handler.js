const { Socket } = require('../lib');
const GameClient = require('./gameClient');

class Handler {
    static onData(socket) {
        return (data) => {
            try {
                const gameLoop = GameClient.launch(socket, data);
                if (!gameLoop) {
                    const over = false;
                    const error = false;
                    return Socket.remove(socket, over, error);
                }
                GameClient.handle(socket, gameLoop, data);
            } catch (error) {
                const over = false;
                Socket.remove(socket, over, error);
            }
        };
    }

    static onClose(socket) {
        return () => {
            const error = false;
            const over = false;
            Socket.remove(socket, over, error);
        };
    }

    static onEnd(socket) {
        return () => {
            const error = false;
            const over = false;
            Socket.remove(socket, over, error);
        };
    }

    static onError(socket) {
        return (error) => {
            const over = false;
            Socket.remove(socket, over, error);
        };
    }
}

module.exports = Handler;
