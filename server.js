const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

require('./set-routes.js')(app);

app.listen(port, function () {
  console.log(`Survey app is listening on ${port}`);
});
