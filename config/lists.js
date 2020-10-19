const {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    SINGLE_PLAYER_VALUE,
    MULTI_PLAYER_VALUE,
    WALL,
    MONET,
} = require('./constants');
const {
    MONET_SIGN, 
    WALL_SIGN, 
    CURSOR,
} = require('./variables');

module.exports = {
    ALLOWED_GAME_TYPES: [
        SINGLE_PLAYER_VALUE, 
        MULTI_PLAYER_VALUE
    ],
    ALLOWED_DIRECTION_KEYS: [
        UP,
        DOWN,
        LEFT,
        RIGHT
    ],
    CELL_KEYS: [
        WALL, 
        MONET
    ],
    CUSTOM_CELL: [
        MONET_SIGN, 
        WALL_SIGN, 
        CURSOR
    ],
};
