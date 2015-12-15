'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize('survey', 'survey-user', 'password');

const User = sequelize.define('User', {
  type: Sequelize.ENUM('admin', 'customer'),
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

const Question = sequelize.define('Question', {
  title: Sequelize.STRING,
});

const Answer = sequelize.define('Answer', {
  answer: Sequelize.STRING,
});

const Response = sequelize.define('Response', {});

Response.belongsTo(Answer);
Answer.hasMany(Response);

Response.belongsTo(Question);
Question.hasMany(Response);

Response.belongsTo(User);
User.hasMany(Response);

Answer.belongsTo(Question);
Question.hasMany(Answer);

Question.belongsTo(User);
User.hasMany(Question);

module.exports = {
  Answer,
  Response,
  Question,
  User,
  sequelize,
};
