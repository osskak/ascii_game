const serverHandlers = require('./serverHandlers');
const clientHandlers = require('./clientHandlers');

module.exports = {
    ...serverHandlers,
    ...clientHandlers,
};