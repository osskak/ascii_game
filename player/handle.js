const {
    removeSocket,
    getKey,
} = require('../lib/helpers');
const { rooms } = require('../lib/database');

const handle = (socket, engine, data) => {
    const key = getKey(socket, data);
    if (!key) return;
    
    const initialization = false;
    const output = engine.render(socket, key, initialization);

    const room = rooms.find(room => room.engine === engine);
    room.players.forEach(socket => {
        if (!socket.destroyed) socket.write(output);
        if (!engine.over) return;
        const error = false;
        removeSocket(socket, engine.over, error);
    });
};

module.exports = handle;
