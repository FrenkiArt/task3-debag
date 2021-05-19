var express = require('express');
var app = express();
var db = require('./db');
var sequelize = require('./db');
var user = require('./controllers/usercontroller');
var game = require('./controllers/gamecontroller');
var bodyParser = require('body-parser');
var validateSession = require('./middleware/validate-session');

sequelize
  .sync()
  .then((result) => {
    console.log('Связь с базой установлена');
  })
  .catch((err) => console.log(err));

app.use(bodyParser);

app.use('/api/auth', user);
app.use(validateSession);
app.use('/api/game', game);

app.get('/', function (request, response) {
  // отправляем ответ
  response.send('<h2>Сервер запущен</h2>');
});

app.listen(4000, function () {
  console.log('App is listening on 4000');
});
