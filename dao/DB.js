let Sequelize = require('sequelize');
let config = require('../config/config');
let db = config.db;
let sequelize = new Sequelize(db.dbName, db.user, db.password, db.config);
module.exports = (model) => {
    return model(sequelize, Sequelize);
}