const { HOST, PORT } = require('../../config');
const { Util } = require('../../lib');
const { 
    UsernameQuestion,
    GameTypeQuestion,
 } = require('../../questions');

class TCPClientHandler {
    static onConnect(client, readlineInterface) {
        return async () => {
            try {
                console.log(`CONNECTED TO: ${HOST}:${PORT}`);
            
                const username = await UsernameQuestion.ask(readlineInterface);
                const gameType = await GameTypeQuestion.ask(readlineInterface);
        
                TCPClientHandler.handleKeyboard(client);
        
                const data = {
                    username,
                    gameType,
                };
                client.write(JSON.stringify(data));
            } catch (error) {
                console.error(error);
                if (!client.destroyed) {
                    client.destroy();
                }
                process.exit(1);
            }
        };
    }

    static onData(data) {
        process.stdout.write('\x1b[H\x1b[2J');
        process.stdout.write(data);
    }

    static onError(error) {
        console.error(`\n${error}`);   
        process.exit(1);
    }

    static onClose() {
        console.log('\nConnection closed');   
        process.exit(0);
    }

    static handleKeyboard(client) {
        Util.handleKeyboard((str, key) => {
            try {
                if (client.destroyed) return;
                client.write(JSON.stringify(key));
            } catch (err) {
                console.error(err);
                process.exit(1);
            }
        });
    }
}

module.exports = TCPClientHandler;
