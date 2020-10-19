const net = require('net');
const readline = require('readline');
const { HOST, PORT } = require('./config');
const { 
    UsernameQuestion,
    GameTypeQuestion,
 } = require('./questions');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const client = new net.Socket();

const handleKeyboard = () => {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
        try {
            if (client.destroyed) return;
            client.write(JSON.stringify(key));
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    });
};

client.connect(PORT, HOST, async () => {
    try {
        console.log(`CONNECTED TO: ${HOST}:${PORT}`);
    
        const username = await UsernameQuestion.ask(rl);
        const gameType = await GameTypeQuestion.ask(rl);

        handleKeyboard();

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
});

client.on('data', (data) => {
    process.stdout.write('\x1b[H\x1b[2J');
    process.stdout.write(data);
});

client.on('error', (err) => {
    console.error(`\n${err}`);   
    process.exit(1);
});

client.on('close', () => {
    console.log('\nConnection closed');   
    process.exit(0);
});

process.on('uncaughtException', (err) => {
    console.error(err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

module.exports = client;
