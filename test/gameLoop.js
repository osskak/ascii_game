/*
Test field generation and posibility to finish game by predefined count of steps with current config.
In case of errors first of all please change config values.
*/

const initialize = require('../player/initialize');
const { getTime } = require('../lib/helpers');

const { ALLOWED_DIRECTION_KEYS, DIRECTION_KEYS } = require('../config');
const {
    UP,
    DOWN,
    LEFT,
    RIGHT,
} = DIRECTION_KEYS;
const TOTAL = 'total';

const DIRECTION_LIST = [
    ...ALLOWED_DIRECTION_KEYS,
    ...ALLOWED_DIRECTION_KEYS,
    ...ALLOWED_DIRECTION_KEYS,
    ...ALLOWED_DIRECTION_KEYS,
];
const DIRECTION_MULTIPLIER = DIRECTION_LIST.length - 1;
const directions = {
    [UP]: 0,
    [DOWN]: 0,
    [LEFT]: 0,
    [RIGHT]: 0,
    [TOTAL]: 0,
};
const initializeErrors = [];
const renderErrors = [];
const sockets = [];

let finished = 0;
let counter = 1;
const startTime = new Date();
const TOTAL_GAMES = 1e3;
const TOTAL_STEPS = 5e5;

const getDirection = () => {
    const index = Math.round(Math.random() * DIRECTION_MULTIPLIER);
    const direction = DIRECTION_LIST[index];
    directions[direction]++;
    directions[TOTAL]++;
    return direction;
};
const format = (number) => new Intl.NumberFormat('ru-RU').format(number);
const getUserData = () => {
    const username = Math.random().toString(36).slice(2);
    const socket = { username };
    sockets.push(socket);
    return {
        username,
        socket,
    };
};

function testGameLoop() {
    for (; counter <= TOTAL_GAMES; counter++) {
        const { socket, username } = getUserData();
        const engine = init(socket, username);
        if (!engine) break;

        render(engine);
        engineLogs();
    }
    return finishLogs();
}

function render(engine) {
    try {
        for (let step = 1; step <= TOTAL_STEPS; step++) {
            const initialized = false;
            let output;
            sockets.forEach(socket => {
                const direction = getDirection();
                output = engine.render(socket, direction, initialized)
            });

            if (engine.over) {
                finished++;
                break;
            }
        }
        sockets.length = 0;
    } catch (e) {
        renderErrors.push(e);
    }
}

function init(socket, username) {
    try {
        const engine = initialize(socket, username);

        const direction = null;
        const initialized = true;
        engine.render(socket, direction, initialized);

        const user = getUserData();
        engine.addUser(user.socket, user.username);
        return engine;
    } catch (e) {
        initializeErrors.push(e);
    }
}

function engineLogs() {
    process.stdout.write('\x1b[H\x1b[2J');
    process.stdout.write(`Processed games: ${format(counter)}/${format(TOTAL_GAMES)}\n`);
    process.stdout.write(`Finished games: ${format(finished)}/${format(TOTAL_GAMES)}\n`);
    process.stdout.write(`Spent time: ${getTime(startTime, new Date())}\n`);
}

function finishLogs() {
    const directionsCopy = { ...directions };
    Object.keys(directionsCopy).forEach(
        key => directionsCopy[key] = format(directionsCopy[key])
    );
    const data = {
        directions: directionsCopy,
        totalGames: format(TOTAL_GAMES),
        totalSteps: format(TOTAL_STEPS),
        finished: format(finished),
        initializeErrorsCount: format(initializeErrors.length),
        renderErrorsCount: format(renderErrors.length),
    };
    console.log({
        initializeErrors,
        renderErrors,
    });
    console.log(data);
    return data;
}

module.exports = testGameLoop;
