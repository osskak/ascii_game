const {
    dataHandler,
    closeHandler,
    endHandler,
    errorHandler,
} = require('./handlers');
const { HOST, PORT } = require('./config');

const net = require('net');

const netServer = net.createServer((socket) => {
    const { remoteAddress, remotePort } = socket;
    console.log(`CONNECTED: ${remoteAddress}:${remotePort}`);

    socket.on('data', dataHandler(socket));

    socket.on('close', closeHandler(socket));

    socket.on('end', endHandler(socket));

    socket.on('error', errorHandler(socket));
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
