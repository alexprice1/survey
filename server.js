'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('./set-middleware')(app);
require('./set-routes')(app);

app.listen(port, function () {
  console.log(`Survey app is listening on ${port}`);
});
