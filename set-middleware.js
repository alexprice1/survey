const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const models = require('./models.js');
const mustacheExpress = require('mustache-express');

module.exports = function(app) {
  app.use(session({
    store: new FileStore(),
    secret: 'cookie secret',
    resave: false,
    saveUninitialized: true
  }));

  //middleware
  app.get('/admin', redirectIfNotAdmin);
  app.get('/customer', redirectIfNotCustomer);

  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());

  app.use(express.static('public'));

  app.engine('mustache', mustacheExpress());
  app.set('view engine', 'mustache');
  app.set('views', __dirname + '/views');
};

function redirectIfNotAdmin(req, res, next) {
  if(!req.session.user || req.session.user.type !== 'admin') {
    res.redirect('/login');
  } else {
    next();
  }
}

function redirectIfNotCustomer(req, res, next) {
  if(!req.session.user || req.session.user.type !== 'customer') {
    res.redirect('/login');
  } else {
    next();
  }
}
