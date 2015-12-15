'use strict';

const models = require('../models.js');

function createSession(req, res) {
  models.User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password,
    },
  }).then(function (user) {
    if (user) {
      req.session.user = user.toJSON();
      // console.log(req.session.user);
      req.session.save(function () {
        res.redirect(`/${user.type}`);
      });
    } else {
      res.render('login', {
        errorMessage: 'Invalid username or password',
      });
    }
  }).catch(function () {
    res.render('login', {
      errorMessage: 'Error logging in, try again',
    });
  });
}

function createGuestSession(req, res) {
  models.User.create({
    type: 'customer',
  }).then(function (user) {
    if (user) {
      req.session.user = user.toJSON();
      req.session.save(function () {
        res.redirect(`/${user.type}`);
      });
    } else {
      res.render('login', {
        errorMessage: 'Invalid username or password',
      });
    }
  }).catch(function () {
    res.render('login', {
      errorMessage: 'Error logging in, try again',
    });
  });
}

function deleteSession(req, res) {
  req.session.destroy(function () {
    res.redirect('/login');
  });
}

function getSession(req, res) {
  res.render('login');
}

module.exports = {
  create: createSession,
  createGuest: createGuestSession,
  delete: deleteSession,
  get: getSession,
};
