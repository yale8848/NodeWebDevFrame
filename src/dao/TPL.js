let Model = require('../models/{{modelName}}');
let DB = require('./DB')(Model);
let BaseDao = require('./BaseDao');

module.exports = class TPLDAO extends BaseDao {

    constructor() {
        super(DB);
    }

    findAll() {
        return super.findAll({
            order: [
                ['{{id}}', 'DESC']
            ]
        });
    };
    delete(id) {
        return super.delete({
            '{{id}}': id
        });
    }
    get(id) {
        return super.get({ '{{id}}': id });
    }
    update(data, id) {
        return super.update(data, { '{{id}}': id });
    }
}