var express = require('express');
var router = express.Router();
let service = require('../service/{{service}}').new();
router.get('/', function(req, res, next) {

    res.render('test', { test: 'test' });
});
router.get('/:id', function(req, res, next) {

    if (req.params.id && (parseInt(req.params.id) + '') == req.params.id) {
        service.get(req.params.id, r => {
            res.render('test', { test: 'test' });
        });
    }
});
router.post('/test', (req, res, next) => {
    service.get(req.body, r => {
        res.render('test', { test: 'test' });
    });
});

module.exports = router;