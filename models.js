const Sequelize = require('sequelize');
const sequelize = new Sequelize('survey', 'survey-user', 'password');

const Question = sequelize.define('Question', {
  title: Sequelize.STRING
});

const Answer = sequelize.define('Answer', {
  answer: Sequelize.STRING
});

const CustomerAnswer = sequelize.define('CustomerAnswer', {
  answer: Sequelize.STRING
});

CustomerAnswer.belongsTo(Question);
Question.hasMany(CustomerAnswer);

Answer.belongsTo(Question);
Question.hasMany(Answer);

module.exports = {
  Answer,
  CustomerAnswer,
  Question,
  sequelize
};
