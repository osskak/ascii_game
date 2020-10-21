const readline = require('readline');
const App = require('./app');

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = App.connect(readlineInterface);

process.on('uncaughtException', (err) => {
    console.error(err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

module.exports = client;
