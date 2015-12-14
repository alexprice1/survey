'use strict';

const questionAPI = require('./api/questions');
const responseAPI = require('./api/responses');
const sessionAPI = require('./api/sessions');

module.exports = function(app) {
  app.get('/', sessionAPI.get);
  app.get('/login', sessionAPI.get);
  app.post('/login', sessionAPI.create);
  app.post('/logout', sessionAPI.delete);

  app.post('/login/guest', sessionAPI.createGuest);

  //Admin
  app.post('/api/questions', requireAdmin, questionAPI.create);
  app.get('/api/questions', requireAdmin, questionAPI.get);
  app.get('/api/questions/results/:id', requireAdmin, questionAPI.results);

  //Customer
  app.get('/api/questions/random', requireCustomer, questionAPI.random);
  app.post('/api/responses', requireCustomer, responseAPI.create);
};

function requireAdmin(req, res, next) {
  if(!req.session.user || req.session.user.type !== 'admin') {
    res.sendStatus(401);
  } else {
    next();
  }
}

function requireCustomer(req, res, next) {
  if(!req.session.user || req.session.user.type !== 'customer') {
    res.sendStatus(401);
  } else {
    next();
  }
}