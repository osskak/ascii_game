const { Handler } = require('./core');
const { HOST, PORT } = require('./config');

const net = require('net');

const netServer = net.createServer((socket) => {
    const { remoteAddress, remotePort } = socket;
    console.log(`CONNECTED: ${remoteAddress}:${remotePort}`);

    socket.on('data', Handler.onData(socket));

    socket.on('close', Handler.onClose(socket));

    socket.on('end', Handler.onEnd(socket));

    socket.on('error', Handler.onError(socket));
});

netServer.on('error', (err) => {
    console.error(err);
    process.exit(1);
});

netServer.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
});

process.on('uncaughtException', (err) => {
    console.error(err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

module.exports = netServer;
