'use strict';

const models = require('../models.js');

function createResponses(req, res) {
  console.log(req.body);
  models.Response.create({
    AnswerId: req.body.answerId,
    UserId: req.session.user.id,
    QuestionId: req.body.questionId,
  }).then(function () {
    res.send();
  }).catch(console.error);
}

module.exports = {
  create: createResponses,
};
