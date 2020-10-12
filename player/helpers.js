const {
    MULTI_PLAYER_VALUE,
    MAX_PLAYERS,
    USERNAME_ERROR,
} = require('../config');
const {
    rooms,
    socketsMap,
} = require('../lib/database');
const initialize = require('./initialize');
const { removeSocket } = require('../lib/helpers');

const checkUsername = (socket, username) => {
    let usernames = Array.from(socketsMap.values());
    usernames = usernames.map(({ username }) => username);
    if (!usernames.includes(username)) return true;

    const over = false;
    removeSocket(socket, over, USERNAME_ERROR);
    return false;
};

const addSocketData = (socket, engine, username) => {
    const socketData = {
        username,
        engine,
    };
    socketsMap.set(socket, socketData);
};

const addRoomData = (socket, engine, parsed) => {
    const { username, gameType } = parsed;
    const room = rooms.find(room => room.engine === engine);
    if (room) {
        return room.players.push(socket);
    }

    const roomData = {
        gameType,
        engine,
        players: [socket],
        creator: {
            socket,
            username,
        },
    };
    rooms.push(roomData);
};

const getEngine = (socket, parsed) => {
    const { gameType, username } = parsed;
    
    if (gameType !== MULTI_PLAYER_VALUE) {
        const engine = initialize(socket, username);
        return {
            engine,
            initialized: true,
        };
    }
  
    const freeRooms = rooms.filter(({ players, gameType }) => {
        const notFull = players.length < MAX_PLAYERS;
        const isMultiplayer = gameType === MULTI_PLAYER_VALUE;
        return notFull && isMultiplayer;
    });
    
    const room = freeRooms && freeRooms[0];
    const engine = room ? room.engine : initialize(socket, username);
    return {
        engine,
        initialized: !room,
    };
};

module.exports = {
    getEngine,
    addRoomData,
    addSocketData,
    checkUsername,
};
