const { addSocket } = require('./helpers');
const Engine = require('./engine');

const initialize = (socket) => {
    addSocket(socket);
    const engine = new Engine(socket);
    const direction = null;
    const initialization = true;
    const output = engine.render(direction, initialization);
    socket.write(output);
    return engine;
};

module.exports = initialize;
