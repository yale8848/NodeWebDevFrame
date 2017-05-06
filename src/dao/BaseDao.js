let log = require('../utils/Log');
module.exports = class BaseDao {
    constructor(dao) {
        this.dao = dao;

    }
    find(option) {
        return new Promise((res, rej) => {
            this.dao.findAll(option).then(s => {
                res(s);
            }, e => {
                log.error("" + e);
                rej(e);
            });
        });
    };
    add(data) {

        return new Promise((res, rej) => {
            this.dao.create(data).then(s => {
                res(s);
            }, e => {
                log.error("" + e);
                rej(e);
            });
        });

    }
    deleteWhere(whr) {

        return new Promise((res, rej) => {
            this.dao.destroy({
                where: whr
            }).then(s => {
                res(s);
            }, e => {
                log.error("" + e);
                rej(e);
            });
        });

    }
    findWhere(whr) {
        return new Promise((res, rej) => {
            this.dao.findOne({ where: whr }).then(s => {
                res(s);
            }, e => {
                log.error("" + e);
                rej(e);
            });
        });


    }
    updateWhere(data, whr) {

        return new Promise((res, rej) => {
            this.dao.update(data, { where: whr }).then(s => {
                res(s);
            }, e => {
                log.error("" + e);
                rej(e);
            });
        });
    }
}