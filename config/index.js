const constants = require('./constants');
const variables = require('./variables');
const dictionaries = require('./dictionaries');
const lists = require('./lists');

module.exports = {
    ...constants,
    ...variables,
    ...dictionaries,
    ...lists,
};
