const { Sequelize } = require('sequelize');
const Sql = require('sequelize');
const Connection = require('./db');

const Answer = Connection.define('answer', {
    body: {
        type: Sql.TEXT,
        allowNull: false
    },
    questionId: {
        type: Sql.INTEGER,
        allowNull: false
    }
})

Answer.sync({ force: false });

module.exports = Answer;