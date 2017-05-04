let Dao = require('../dao/{{daoName}}');
let BasService = require('./BaseService');

module.exports = class TPLSERVICE extends BasService {

    demo(cb) {
        let resp = super.getResp();
        Dao.get().then(r => {
            cb(resp.ok());
        }, e => {
            cb(resp.fail());
        });
    }
    static new() {
        return new TPLSERVICE();
    }

}