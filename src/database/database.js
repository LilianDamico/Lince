const Sequelize = require('sequelize');

const connection = new Sequelize('bank', 'root', 'Lila349*', {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;
