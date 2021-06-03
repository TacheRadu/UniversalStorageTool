const dbConfig = require("../../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model")(sequelize, Sequelize);
db.googleDrives = require("./googleDrive.model")(sequelize, Sequelize);
db.dropboxes = require("./dropbox.model")(sequelize, Sequelize);
db.users.hasOne(db.googleDrives);
db.users.hasOne(db.dropboxes);
db.sequelize.sync();

module.exports = db;
