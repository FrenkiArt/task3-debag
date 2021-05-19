const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');
const validateSession = require('./middleware/validate-session');

sequelize
  .sync()
  .then((result) => {
    console.log('Связь с базой установлена');
    console.log(result);
  })
  .catch((err) => console.log(err));

app.use(bodyParser);

app.use('/api/auth', user);
app.use(validateSession);
app.use('/api/game', game);

app.get('/', (request, response) => {
  // отправляем ответ
  response.send('<h2>Сервер запущен</h2>');
});

app.listen(4000, () => {
  console.log('App is listening on 4000');
});
