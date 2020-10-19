const Question = require('./question');

const message = 'Please, enter your username and press "enter" key\n';
const validationMessage = 'Allowed only letter and digits in username with length from 3 to 20 symbols';
const regExp = /^[a-zA-Z0-9]{3,20}$/;

class UsernameQuestion {
    static _message = message;

    static _response(username) {
        return `Your username is "${username}"`;
    }

    static _checkAnswer(username) {
        const valid = regExp.test(username);
        if (!valid) {
            return validationMessage;
        }
    }

    static ask(rl) {
        return Question.ask({
            rl,
            message: UsernameQuestion._message, 
            response: UsernameQuestion._response, 
            checkAnswer: UsernameQuestion._checkAnswer,
        });
    }
}

module.exports = UsernameQuestion;
