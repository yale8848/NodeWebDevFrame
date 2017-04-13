var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

var nunjucks = require('nunjucks');


var config = require('./config/config');
var routers = require('./routes/routers');

//var index = require('./routes/index');

var app = express();

nunjucks.configure(path.join(__dirname, 'views'), { // 设置模板文件的目录，为views
    autoescape: true,
    express: app
});
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//add static context path
app.use(config.getContextPath(), express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1) // trust first proxy cookie-session

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 100 * 24 * 60 * 60 * 1000
}))

app.all('*', function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    //res.header("Content-Type", "application/json;charset=utf-8");
    let render = res.render;
    res.render = function(view, data) {
        data || (data = {});
        data.contextPath = config.getContextPath();
        render.call(this, view, data);
    }
    let redirect = res.redirect;
    res.redirect = function(path) {
        redirect.call(this, config.getContextPath() + path);
    }
    if (req.originalUrl != config.getContextPath() + '/' &&
        req.originalUrl != config.getContextPath() + '/user/login' &&
        !req.session.login) {
        res.redirect('/');
        return;
    }
    next();
});

//use config add all routes with context path
//config.addRouter(app, '/', index);
routers.init(app).addRouters();


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

if (process.env.NODE_ENV != "production") {
    app.disable('view cache');
} else {
    app.enable('view cache');
}

module.exports = app;