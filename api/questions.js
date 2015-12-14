'use strict';

const models = require('../models.js');
const sequelize = models.sequelize;

function createQuestion(req, res) {
  models.Question.create({
    title: req.body.title,
    Answers: req.body.answers,
    UserId: req.session.user.id
  }, {
    include: [ models.Answer, models.User ]
  }).then(function() {
    res.send();
  }).catch(function() {
    res.sendStatus(500);
  });
}

function getQuestions(req, res) {
  models.Question.findAll({
    where: {
      UserId: req.session.user.id
    }
  }).then(function(questions) {
    questions = questions.map(function(question) {
      return question.toJSON();
    });

    res.send(questions);
  });
}

function showQuestionWithResults(req, res) {
  let question;
  models.Question.findOne({
    where: {
      id: req.params.id,
      UserId: req.session.user.id
    },
    include: [models.Answer]
  }).then(function(foundQuestion) {
    question = foundQuestion.toJSON();
    const responseCounts = question.Answers.map(function(answer) {
      return models.Response.count({
        where: {
          AnswerId: answer.id
        }
      })
    });
    return Promise.all(responseCounts);
  }).then(function(responseCounts) {
    let totalResponses = 0;
    question.Answers.forEach(function(answer, index) {
      const responseCount = responseCounts[index];
      answer.responseCount = responseCount;
      totalResponses+= responseCount;
    });

    question.totalResponses = totalResponses;

    res.send(question);
  }).catch(console.error);
}

function showRandomQuestion(req, res) {
  models.Response.findAll({
    where: {
      UserId: req.session.user.id
    },
    attributes: ['QuestionId']
  }).then(function(responses) {
    const questionIds = responses.map(function(response) {
      return response.QuestionId;
    });
    const query = {
      order: [
        [sequelize.fn('RAND')]
      ],
      include: [models.Answer]
    };

    if(questionIds.length) {
      query.where = {
        id: {
          $notIn: questionIds
        }
      };
    }
    return models.Question.findOne(query);
  }).then(function(question) {
    if(!question) {
      return res.sendStatus(404);
    } else {
      res.send(question.toJSON());
    }
  }).catch(console.error);
}

module.exports = {
  create: createQuestion,
  get: getQuestions,
  results: showQuestionWithResults,
  random: showRandomQuestion
};
