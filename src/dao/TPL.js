let Model = require('../models/{{modelName}}');
let DB = require('./DB')(Model);
let BaseDao = require('./BaseDao');

module.exports = class TPLDAO extends BaseDao {

    constructor() {
        super(DB);
    }

    find() {
        return super.find({
            order: [
                ['{{id}}', 'DESC']
            ]
        });
    };
    delete(id) {
        return super.deleteWhere({
            '{{id}}': id
        });
    }
    get(id) {
        return super.findWhere({ '{{id}}': id });
    }
    update(data, id) {
        return super.updateWhere(data, { '{{id}}': id });
    }
}