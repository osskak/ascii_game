const { socketsMap, rooms } = require('../lib/database');
const {
    checkUsername,
    getEngine,
    addRoomData,
    addSocketData,
} = require('./helpers');

const launch = (socket, data) => {
    if (socketsMap.has(socket)) {
        const { engine } = socketsMap.get(socket);
        return engine;
    }

    const parsed = JSON.parse(data);
    const { username } = parsed;
    const isValid = checkUsername(socket, username);
    if (!isValid) return null;

    const { engine, initialized } = getEngine(socket, parsed);
    if (!initialized) engine.addUser(socket, username);

    addSocketData(socket, engine, username);
    addRoomData(socket, engine, parsed);

    const direction = null;
    const initialization = true;
    const output = engine.render(socket, direction, initialization);
    
    const room = rooms.find(room => room.engine === engine);
    room.players.forEach(socket => {
        if (!socket.destroyed) socket.write(output);
    });
    return engine;
};

module.exports = launch;
