let config = {};

(() => {
    const env = process.env.NODE_ENV;
    config = require('./configLocal');
    if (env == 'local') {
        config = require('./configLocal');
    } else if (env == 'test') {
        config = require('./configTest');
    } else if (env == 'prod') {
        config = require('./configProd');
    }
})();

module.exports = config;