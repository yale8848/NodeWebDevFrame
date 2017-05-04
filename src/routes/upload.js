var express = require('express')
var router = express.Router();
var formidable = require('formidable');
var util = require('util');
var path = require('path');
var OSS = require('ali-oss').Wrapper;
var store = new OSS(config.oss);


router.post('/title', function(req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (err) {
            res.send(JSON.stringify({ success: false }));
            return;
        } else {

            for (let i in files) {

                let e = files[i];
                let ext = path.extname(e.name);
                let n = (new Date()).getTime();
                store.put('dxhweb/news/titleimg/' + n + ext, e.path).then(function(val) {
                    res.send(JSON.stringify({ success: true, url: val.url }));
                }).catch(function(err) {
                    res.send(JSON.stringify({ success: false, message: err }));
                });;
            }
        }
    });

});
router.post('/content', function(req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (err) {
            res.send(JSON.stringify({ success: false }));
            return;
        } else {

            let callback = req.query.CKEditorFuncNum;
            for (let i in files) {

                let e = files[i];
                let ext = path.extname(e.name);
                let n = (new Date()).getTime();
                store.put('dxhweb/news/contentfile/' + n + ext, e.path).then(function(val) {
                    res.send("<script type=\"text/javascript\">" + "window.parent.CKEDITOR.tools.callFunction(" + callback + ",'" + val.url + "','')</script>");
                }).catch(function(err) {
                    res.send(JSON.stringify({ success: false, message: err }));
                });;
            }
        }
    });

});
module.exports = router;