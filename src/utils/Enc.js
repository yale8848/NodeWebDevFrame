let crypto = require('crypto');
class Enc {
    md5(str) {
        let md5sum = crypto.createHash('md5');
        md5sum.update(str);
        let ret = md5sum.digest('hex');
        return ret;
    };
}

module.exports = new Enc();