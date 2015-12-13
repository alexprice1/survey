const models = require('./models');

models.sequelize.sync().then(function() {
}).then(function(user) {
  console.log(user);
});
