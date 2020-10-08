const {
    removeSocket,
    getKey,
} = require('./helpers');

const dataHandler = (socket, engine) => (data) => {
    const { remoteAddress, remotePort } = socket;
    const key = getKey(socket, data);
    if (!key) return;

    console.log({
        time: new Date().toISOString(),
        clientAddress: `${remoteAddress}:${remotePort}`,
        data: key,
    });
    
    const initialization = false;
    const output = engine.render(key, initialization);
    socket.write(output);
    if (engine.over) {
        const error = false;
        removeSocket(socket, engine.over, error);
    }
};

const closeHandler = (socket) => () => {
    const error = false;
    const over = false;
    removeSocket(socket, over, error);
};

const endHandler = (socket) => () => {
    const error = false;
    const over = false;
    removeSocket(socket, over, error);
};

const errorHandler = (socket) => (error) => {
    const over = false;
    removeSocket(socket, over, error);
};

module.exports = {
    dataHandler,
    closeHandler,
    endHandler,
    errorHandler,
};