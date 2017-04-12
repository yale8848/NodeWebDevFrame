module.exports = class UserDao {
    constructor(dao) {
        this.dao = dao;

    }
    find(option) {
        return this.dao.findAll(option);
    };
    add(data) {
        return this.dao.create(data);
    }
    deleteWhere(whr) {
        return this.dao.destroy({
            where: whr
        });
    }
    findWhere(whr) {
        return this.dao.findOne({ where: whr });
    }
    updateWhere(data, whr) {
        return this.dao.update(data, { where: whr });
    }
}