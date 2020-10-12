const askQuestion = ({ rl, message, response, checkAnswer }) => {
    return new Promise((resolve) => {
        rl.question(message, (answer) => {
            const error = checkAnswer(answer);
            if (!error) {
                console.log(response(answer));
                return resolve(answer);
            }
            console.error(error);
            resolve(askQuestion({ rl, message, response, checkAnswer }));
        });
    }); 
};

module.exports = {
    askQuestion,
};
