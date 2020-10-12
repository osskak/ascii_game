const { askQuestion } = require('./helpers');
const { capitalizeFirstLetter } = require('../lib/helpers');
const {
    SINGLE_PLAYER_VALUE,
    SINGLE_PLAYER_TYPE,
    MULTI_PLAYER_VALUE,
    MULTI_PLAYER_TYPE,
    GAME_TYPES,
    ALLOWED_GAME_TYPES,
} = require('../config');

const gameTypeMessage = `Please, chose type of game (click number on keyboard)
    ${SINGLE_PLAYER_VALUE}. ${capitalizeFirstLetter(SINGLE_PLAYER_TYPE)}
    ${MULTI_PLAYER_VALUE}. ${capitalizeFirstLetter(MULTI_PLAYER_TYPE)}
`;
const gameTypeResponse = (answer) => `You choose "${GAME_TYPES[answer]}" game.`;

const checkGameType = (gameType) => {
    const valid = ALLOWED_GAME_TYPES.includes(gameType);
    if (!valid) {
        return `Allowed only next game types: ${ALLOWED_GAME_TYPES.join(', ')}`;
    }
};

const gameTypeQuestion = async (rl) => {
    return askQuestion({ 
        rl,
        message: gameTypeMessage, 
        response: gameTypeResponse, 
        checkAnswer: checkGameType,
    });
};

module.exports = gameTypeQuestion;
