const Sql = require('sequelize');

const connection = new Sql('question_guide', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;