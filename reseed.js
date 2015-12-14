const models = require('./models');

dropTables().then(function() {
  return seedData();
}).then(function() {
  console.log('Done reseed data!');
  models.sequelize.close();
}).catch(console.error);

function dropTables() {
  return models.Response.drop().then(function() {
    return models.Answer.drop();
  }).then(function() {
    return models.Question.drop();
  }).then(function() {
    return models.User.drop();
  }).then(function() {
    return models.sequelize.sync()
  });
}

function seedData() {
  return Promise.all([
    models.User.create({
      type: 'admin',
      username: 'admin',
      password: 'password'
    }),
    models.User.create({
      type: 'admin',
      username: 'admin2',
      password: 'password'
    })
  ]);
}
