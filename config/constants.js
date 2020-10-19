const LEFT_KEY = 'c';

module.exports = {
    MOVE_POINTS: 1,
    UP: 'up',
    DOWN : 'down',
    LEFT : 'left',
    RIGHT: 'right',
    WALL: 'wall',
    MONET: 'monet',
    X: 'x',
    Y: 'y',
    LEFT_KEY,
    EXIT_MESSAGE: `To exit please press "Ctrl + ${LEFT_KEY.toUpperCase()}"`,
    LEFT_MESSAGE: 'You left the game',
    SERVER_ERROR: 'Server error',
    OVER_MESSAGE: 'Game over',
    TIME_MESSAGE: 'Game time',
    USERNAME_ERROR: 'Username is already exists. Please chose another one.',
    SINGLE_PLAYER_VALUE: '1',
    SINGLE_PLAYER_TYPE: 'single-player',
    MULTI_PLAYER_VALUE: '2',
    MULTI_PLAYER_TYPE: 'multi-player',
};
