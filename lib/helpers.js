const { 
    LEFT_KEY,
    LEFT_MESSAGE,
    SERVER_ERROR,
    COORDINATES_MAX,
} = require('../config');
const {
    sockets,
    socketsMap,
} = require('./database');

const getKey = (socket, data) => {
    try {
        const key = JSON.parse(data && data.toString());
        if (!key || !key.name) {
            return;
        }

        if (key.ctrl && key.name === LEFT_KEY) {
            const error = false;
            const over = false;
            return removeSocket(socket, over, error);
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

    if (error && typeof error !== 'string') {
        console.error(error);
    }
    if (index > -1) {
        sockets.splice(index, 1);
    }
    if (socketsMap.has(socket)) {
        socketsMap.delete(socket);
    }

    if (socket.destroyed) return;
    if (!over) {
        const message = error
            ? typeof error === 'string' ? error : SERVER_ERROR
            : LEFT_MESSAGE;
        socket.write(`\n${message}`);
    }
    
    socket.destroy();
    console.log(`DISCONNECTED: ${remoteAddress}:${remotePort}`);
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

const capitalizeFirstLetter = (phrase) => `${phrase.slice(0, 1).toUpperCase()}${phrase.slice(1)}`;

module.exports = {
    addSocket,
    removeSocket,
    getKey,
    getCoordinate,
    getTime,
    capitalizeFirstLetter,
};
