const Question = require('./question');
const { Util } = require('../lib');
const {
    SINGLE_PLAYER_VALUE,
    SINGLE_PLAYER_TYPE,
    MULTI_PLAYER_VALUE,
    MULTI_PLAYER_TYPE,
    GAME_TYPES,
    ALLOWED_GAME_TYPES,
} = require('../config');

const message = `Please, chose type of game (press number on keyboard)
    ${SINGLE_PLAYER_VALUE}. ${Util.capitalizeFirstLetter(SINGLE_PLAYER_TYPE)}
    ${MULTI_PLAYER_VALUE}. ${Util.capitalizeFirstLetter(MULTI_PLAYER_TYPE)}
`;
const validationMessage = `Allowed only next game types: ${ALLOWED_GAME_TYPES.join(', ')}`

class GameTypeQuestion {
    static _message = message;

    static _response(answer) {
        return `You choose "${GAME_TYPES[answer]}" game.`;
    } 

    static _checkAnswer(gameType) {
        const valid = ALLOWED_GAME_TYPES.includes(gameType);
        if (!valid) {
            return validationMessage;
        }
    }

    static ask(rl) {
        return Question.ask({ 
            rl,
            message: GameTypeQuestion._message, 
            response: GameTypeQuestion._response, 
            checkAnswer: GameTypeQuestion._checkAnswer,
        });
    }
}

module.exports = GameTypeQuestion;
