let config = {};

const env = process.env.NODE_ENV;
config = require('./configLocal');
if (env == 'local') {
    config = require('./configLocal');
} else if (env == 'test') {
    config = require('./configTest');
} else if (env == 'production') {
    config = require('./configProd');
}

config.addRouter = function(app, path, router) {
    app.use(this.getContextPath() + path, router);
}
config.getContextPath = function() {
    if (this.contextPath == undefined || this.contextPath == '/') {
        return "";
    }
    return this.contextPath;
}

module.exports = config;