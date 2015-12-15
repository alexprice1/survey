'use strict';

const models = require('../models.js');

function createResponses(req, res) {
  models.Response.create({
    AnswerId: req.body.answerId,
    UserId: req.session.user.id,
    QuestionId: req.body.questionId,
  }).then(function () {
    res.send();
  }).catch(function () {
    res.sendStatus(500);
  });
}

module.exports = {
  create: createResponses,
};
