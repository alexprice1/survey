const questionAPI = require('./apis/questions.js');

module.exports = function(app) {
  app.post('/api/questions', questionAPI.create);
  app.get('/api/questions', questionAPI.get);
  app.get('/api/questions/results/:id', questionAPI.results);
};
