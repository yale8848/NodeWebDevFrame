var express = require('express');

var config = require('./config/config');
var test = require('./routes/test');

var app = express();

app.use(config.getContextPath(), express.static(path.join(__dirname, 'public')));

config.addRouter(app, '/test', test);

module.exports = app;