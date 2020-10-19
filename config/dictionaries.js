const {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    X,
    Y,
    MOVE_POINTS,
    WALL,
    MONET,
    SINGLE_PLAYER_TYPE,
    SINGLE_PLAYER_VALUE,
    MULTI_PLAYER_TYPE,
    MULTI_PLAYER_VALUE,
} = require('./constants');
const {
    WIDTH,
    HEIGHT,
    WALL_PERCENTAGE,
    MONET_PERCENTAGE,
    WALL_SIGN,
    MONET_SIGN,
} = require('./variables');

module.exports = {
    DIRECTION_KEYS: {
        UP,
        DOWN,
        LEFT,
        RIGHT,
    },
    GAME_TYPES: {
        [SINGLE_PLAYER_VALUE]: SINGLE_PLAYER_TYPE,
        [MULTI_PLAYER_VALUE]: MULTI_PLAYER_TYPE,
    },
    COORDINATES_MAX: {
        [X]: WIDTH,
        [Y]: HEIGHT,
    },
    DIRECTION_COORDINATES: {
        [UP]: Y,
        [DOWN]: Y,
        [LEFT]: X,
        [RIGHT]: X,  
    },
    DIRECTION_STEPS: {
        [UP]: -MOVE_POINTS,
        [DOWN]: MOVE_POINTS,
        [LEFT]: -MOVE_POINTS,
        [RIGHT]: MOVE_POINTS,
    },
    CELL_PERCETAGE: {
        [WALL]: WALL_PERCENTAGE,
        [MONET]: MONET_PERCENTAGE,
    },
    CELL_TYPES: {
        [WALL]: WALL_SIGN,
        [MONET]: MONET_SIGN,
    },
};
