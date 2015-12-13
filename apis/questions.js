const models = require('../models.js');

function createQuestion(req, res) {
  models.Question.create({
    title: req.body.title,
    Answers: req.body.answers
  }, {
    include: [ models.Answer ]
  }).then(function() {
    res.send();
  });
}

function getQuestion(req, res) {
  models.Question.findAll().then(function(questions) {
    questions = questions.map(function(question) {
      return question.toJSON();
    });

    res.send(questions);
  });
}

function showQuestionResults(req, res) {
  models.Question.findOne({
    id: req.params.id,
    include: [ models.Answer, models.CustomerAnswer ]
  }).then(function(question) {
    res.send(question.toJSON());
  });
}

module.exports = {
  create: createQuestion,
  get: getQuestion,
  results: showQuestionResults
};
