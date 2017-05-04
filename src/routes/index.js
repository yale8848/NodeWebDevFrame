var express = require('express');
var router = express.Router();

let logger = require('../utils/Log');


/* GET home page. */
router.get('/', function(req, res, next) {
    logger.info("log-----");
    if (!req.session.test) {
        logger.info("test-----false");
        req.session.test = true;
    } else {
        logger.error("test-----true");
    }
    res.render('index', { title: 'Express111' });
});
module.exports = router;