const { addSocket, removeSocket } = require('../lib/helpers');
const Engine = require('../core/engine');

const initialize = (socket, username) => {
    try {
        addSocket(socket);
        const engine = new Engine(socket, username);
        return engine;
    } catch (error) {
        const over = false;
        removeSocket(socket, over, error);
    } 
};

module.exports = initialize;
