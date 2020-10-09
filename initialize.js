const { addSocket, removeSocket } = require('./helpers');
const Engine = require('./engine');

const initialize = (socket) => {
    try {
        addSocket(socket);

        const engine = new Engine(socket);
        const direction = null;
        const initialization = true;
        const output = engine.render(direction, initialization);
        
        socket.write(output);
        return engine;
    } catch (error) {
        const over = false;
        removeSocket(socket, over, error);
    } 
};

module.exports = initialize;
