const MOVE_POINTS = 1;
const HEIGHT = 5;
const WIDTH = 25;
const WALL_SIGN = '#';
const CURSOR = '@';
const MONET_SIGN = '$';
const COVER = '.';
const CLEAR = ' ';
const WALL_PERCENTAGE = 2;
const MONET_PERCENTAGE = 2;
const SIZE = WIDTH * HEIGHT;

const UP = 'up';
const DOWN = 'down';
const LEFT = 'left';
const RIGHT = 'right';

const WALL = 'wall';
const MONET = 'monet';

const X = 'x';
const Y = 'y';
const LEFT_KEY = 'c';
const EXIT_MESSAGE = `To exit please press "Ctrl + ${LEFT_KEY.toUpperCase()}"`;
const LEFT_MESSAGE = 'You left the game';
const SERVER_ERROR = 'Server error';
const OVER_MESSAGE = 'Game over';
const TIME_MESSAGE = 'Your time';

const DIRECTION_KEYS = {
    UP,
    DOWN,
    LEFT,
    RIGHT,
};

const COORDINATES_MAX = {
    [X]: WIDTH,
    [Y]: HEIGHT,
};

const DIRECTION_COORDINATES = {
    [UP]: Y,
    [DOWN]: Y,
    [LEFT]: X,
    [RIGHT]: X,
};

const DIRECTION_STEPS = {
    [UP]: -MOVE_POINTS,
    [DOWN]: MOVE_POINTS,
    [LEFT]: -MOVE_POINTS,
    [RIGHT]: MOVE_POINTS,
};

const CELL_PERCETAGE = {
    [WALL]: WALL_PERCENTAGE,
    [MONET]: MONET_PERCENTAGE,
};

const CELL_TYPES = {
    [WALL]: WALL_SIGN,
    [MONET]: MONET_SIGN,
};

module.exports = {
    HOST: '127.0.0.1',
    PORT: 6969,
    X,
    Y,
    DIRECTION_COORDINATES,
    COORDINATES_MAX,
    DIRECTION_STEPS,
    ASCII: {
        MOVE_POINTS,
        HEIGHT,
        WIDTH,
        WALL_SIGN,
        CURSOR,
        MONET_SIGN,
        COVER,
        SIZE,
        CLEAR,
    },
    ALLOWED_DIRECTION_KEYS: Object.values(DIRECTION_KEYS),
    DIRECTION_KEYS,
    EXIT_MESSAGE,
    LEFT_MESSAGE,
    LEFT_KEY,
    SERVER_ERROR,
    OVER_MESSAGE,
    TIME_MESSAGE,
    WALL,
    MONET,
    CELL_PERCETAGE,
    CELL_TYPES,
    CELL_KEYS: Object.keys(CELL_PERCETAGE),
    CUSTOM_CELL: [MONET, WALL_SIGN, CURSOR],
};
