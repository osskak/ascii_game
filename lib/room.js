const { rooms } = require('./database');
const { MAX_PLAYERS, MULTI_PLAYER_VALUE } = require('../config');

class Room {
    static addData(socket, gameState, parsed) {
        const { username, gameType } = parsed;
        const room = Room.getByGameState(gameState);
        if (room) {
            return room.players.push(socket);
        }
    
        const roomData = {
            gameType,
            gameState,
            players: [socket],
            creator: {
                socket,
                username,
            },
        };
        rooms.push(roomData);
    }

    static removeData(gameState) {
        const room = Room.getByGameState(gameState);
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

    static getByGameState(gameState) {
        return rooms.find(room => room.gameState === gameState);
    }
}

module.exports = Room;
