const { HOST, PORT } = require('./config');
const net = require('net');
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log(`CONNECTED TO: ${HOST}:${PORT}`);
    process.stdin.on('keypress', (str, key) => {
        try {
            if (client.destroyed) return;
            client.write(JSON.stringify(key));
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    });
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
