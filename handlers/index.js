const { removeSocket } = require('../lib/helpers');
const { handle, launch } = require('../player');

const dataHandler = (socket) => (data) => {
    try {
        const engine = launch(socket, data);
        if (!engine) {
            const over = false;
            const error = false;
            return removeSocket(socket, over, error);
        }
        handle(socket, engine, data);
    } catch (error) {
        const over = false;
        removeSocket(socket, over, error);
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
