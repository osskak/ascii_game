const env = require('../env');
const { TCP } = require('./constants');

const HEIGHT = env.HEIGHT || 10;
const WIDTH = env.WIDTH || 25;
const RECURSION_MAX_CALL_MULTIPLIER = env.RECURSION_MAX_CALL_MULTIPLIER || 20;

const SIZE = WIDTH * HEIGHT;
const RECURSION_MAX_CALL = SIZE * RECURSION_MAX_CALL_MULTIPLIER;

module.exports = {
    HOST: env.HOST || '127.0.0.1',
    PORT: env.PORT || 6969,
    WALL_SIGN: env.WALL_SIGN || '#',
    CURSOR: env.CURSOR || '@',
    MONET_SIGN: env.MONET_SIGN || '$',
    COVER: env.COVER || '.',
    CLEAR: env.CLEAR || ' ',
    WALL_PERCENTAGE: env.WALL_PECENTAGE || 15,
    MONET_PERCENTAGE: env.MONET_PERCENTAGE || 15,
    MAX_PLAYERS: env.MAX_PLAYERS || 2,
    USUAL_STEP_LIMIT: env.USUAL_STEP_LIMIT || 2,
    DIAGONAL_STEP_LIMIT: env.DIAGONAL_STEP_LIMIT || 4,
    HEIGHT,
    WIDTH,
    SIZE,
    RECURSION_MAX_CALL,
    PROTOCOL: env.PROTOCOL || TCP,
};
