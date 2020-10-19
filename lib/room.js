const { rooms } = require('./database');
const { MAX_PLAYERS, MULTI_PLAYER_VALUE } = require('../config');

class Room {
    static addData(socket, gameLoop, parsed) {
        const { username, gameType } = parsed;
        const room = Room.getByGameLoop(gameLoop);
        if (room) {
            return room.players.push(socket);
        }
    
        const roomData = {
            gameType,
            gameLoop,
            players: [socket],
            creator: {
                socket,
                username,
            },
        };
        rooms.push(roomData);
    }

    static removeData(gameLoop) {
        const room = Room.getByGameLoop(gameLoop);
        const index = rooms.findIndex(room);
        if (index > -1) {
            rooms.splice(index, 1);
        }
    }

    static getFree() {
        const freeRooms = rooms.filter(({ players, gameType }) => {
            const notFull = players.length < MAX_PLAYERS;
            const isMultiplayer = gameType === MULTI_PLAYER_VALUE;
            return notFull && isMultiplayer;
        });
        return freeRooms && freeRooms[0];
    }

    static getByGameLoop(gameLoop) {
        return rooms.find(room => room.gameLoop === gameLoop);
    }
}

module.exports = Room;
