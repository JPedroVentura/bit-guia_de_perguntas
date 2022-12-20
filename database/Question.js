const Sql = require('sequelize');
const Connection = require('./db');

const Question = Connection.define('question', {
    title: {
        type: Sql.STRING,
        allowNull: false
    },
    description: {
        type: Sql.TEXT,
        allowNull: false
    }
});

Question.sync({ force: false }).then(() => { });

module.exports = Question;