const { 
    LEFT_KEY,
    COORDINATES_MAX,
} = require('../config');
const { socketsMap } = require('./database');
const Socket = require('./socket');

class Util {
    static getKey(socket, data) {
        try {
            const key = JSON.parse(data && data.toString());
            if (!key || !key.name) {
                return;
            }
    
            if (key.ctrl && key.name === LEFT_KEY) {
                const error = false;
                const over = false;
                return Socket.remove(socket, over, error);
            }
    
            return key.name;
        } catch (error) {
            const over = false;
            Socket.remove(socket, over, error);
        }
    }

    static getCoordinate(type) {
        const multiplier = COORDINATES_MAX[type];
        if (!multiplier) {
            throw new Error(`Unresolved type of coordinate: "${type}" of cursor coordinate`);
        }
        
        const coordinate = Math.round(Math.random() * multiplier);
        if (coordinate < 1) {
            return Util.getCoordinate(type);
        }
    
        return coordinate;
    }

    static getTime(start, finish) {
        if (!start || !finish) return;
        let difference = Math.abs(finish - start);
        const milliseconds = difference % 1000;
    
        difference = (difference - milliseconds) / 1000;
        const seconds = difference % 60;

        difference = (difference - seconds) / 60;
        const minutes = difference % 60;
        const hours = (difference - minutes) / 60;
    
        const parts = [hours, minutes, seconds, milliseconds];
        return parts.reduce((acc, curr, index) => {
            const last = index === parts.length - 1;
            acc += Util.getfullFormat(curr);
            if (last) return acc;
            const penultimate = index === parts.length - 2;
            acc += penultimate ? '.' : ':';
            return acc;
        }, '');
    }

    static getfullFormat(number) {
        return number.toString().padStart(2, '0');
    }

    static capitalizeFirstLetter(phrase) {
        return `${phrase.slice(0, 1).toUpperCase()}${phrase.slice(1)}`;
    }

    static checkUsername(socket, username) {
        let usernames = Array.from(socketsMap.values());
        usernames = usernames.map(({ username }) => username);
        if (!usernames.includes(username)) return true;
    
        const over = false;
        Socket.remove(socket, over, USERNAME_ERROR);
        return false;
    }
}

module.exports = Util;
