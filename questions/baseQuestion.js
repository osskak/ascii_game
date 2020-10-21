const { Util } = require('../lib');

class BaseQuestion {
    static _message;

    static _response() {
        // send response to the client
        Util.throwMethodError('_response', this.name);
    } 

    static _checkAnswer() {
        // check client input
        Util.throwMethodError('_checkAnswer', this.name);
    }

    static ask(readlineInterface) {
        if (!this._message) {
            Util.throwPropertyError('_message', this.name);
        }

        return new Promise((resolve) => {
            readlineInterface.question(
                this._message, 
                (answer) => {
                    const error = this._checkAnswer(answer);
                    if (!error) {
                        console.log(this._response(answer));
                        return resolve(answer);
                    }
                    console.error(error);
                    resolve(this.ask(readlineInterface));
                }
            );
        }); 
    }
}

module.exports = BaseQuestion;
