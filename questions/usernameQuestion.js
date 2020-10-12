const { askQuestion } = require('./helpers');

const usernameMessage = 'Please, enter your username and press "enter" key\n';
const usernameResponse = (username) => `Your username is "${username}"`;
const regExp = /^[a-zA-Z0-9]{3,20}$/;

const checkUsername = (username) => {
    const valid = regExp.test(username);
    if (!valid) {
        return `Allowed only letter and digits in username with length from 3 to 20 symbols`;
    }
};

const usernameQuestion = async (rl) => {
    return askQuestion({ 
        rl,
        message: usernameMessage, 
        response: usernameResponse, 
        checkAnswer: checkUsername,
    });
};

module.exports = usernameQuestion;
