const { 
    LEFT_KEY,
    LEFT_MESSAGE,
    SERVER_ERROR,
    COORDINATES_MAX,
} = require('./config');

const sockets = [];

const getKey = (socket, data) => {
    try {
        const key = JSON.parse(data && data.toString());
        if (!key || !key.name) {
            return;
        }
        if (key.ctrl && key.name === LEFT_KEY) {
            const error = false;
            const over = false;
            removeSocket(socket, over, error);
            return;
        }
        return key.name;
    } catch (err) {
        const over = false;
        removeSocket(socket, over, error);
    }
};

const addSocket = (socket) => {
    sockets.push(socket);
};

const removeSocket = (socket, over, error) => {
    const { remoteAddress, remotePort } = socket;
    const index = sockets.indexOf(socket);
    if (error) console.error(error);
    if (index > -1) {
        sockets.splice(index, 1);
    }
    if (!socket.destroyed) {
        if (!over) {
            const message = error ? SERVER_ERROR : LEFT_MESSAGE;
            socket.write(`\n${message}`);
        }
        socket.destroy();
        console.log(`DISCONNECTED: ${remoteAddress}:${remotePort}`);
    }
};

const getCoordinate = (type) => {
    const multiplier = COORDINATES_MAX[type];
    if (!multiplier) {
        throw new Error(`Unresolved type of coordinate: "${type}" of cursor coordinate`);
    }
    
    const coordinate = Math.round(Math.random() * multiplier);
    if (coordinate < 1) {
        return getCoordinate(type);
    }

    return coordinate;
};

const getTime = (start, finish) => {
    if (!start || !finish) return;
    let difference = Math.abs(finish - start);
    const milliseconds = difference % 1000;

    difference = (difference - milliseconds) / 1000;
    const seconds = difference % 60;

    difference = (difference - seconds) / 60;
    const minutes = difference % 60;

    const hours = (difference - minutes) / 60;

    return `${fullFormat(hours)}:${fullFormat(minutes)}:${fullFormat(seconds)}.${fullFormat(milliseconds)}`;
};

const fullFormat = (number) => number.toString().padStart(2, '0');

module.exports = {
    addSocket,
    removeSocket,
    sockets,
    getKey,
    getCoordinate,
    getTime,
};