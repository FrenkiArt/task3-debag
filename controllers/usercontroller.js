const express = require('express');

const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/signup', (req, res) => {
  console.log(req);
  User.create({
    full_name: req.body.user.full_name,
    username: req.body.user.username,
    passwordhash: bcryptjs.hashSync(req.body.user.password, 10),
    email: req.body.user.email,
  }).then(
    (user) => {
      const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', {
        expiresIn: 60 * 60 * 24,
      });
      console.log('пользователь создан', user);
      res.status(200).json({
        user,
        token,
      });
    },

    (err) => {
      res.status(500).send(err.message);
    }
  );
});

router.get('/signin', (req, res) => {
  console.log(req);
  User.findOne({ where: { username: req.body.user.username } }).then((user) => {
    if (user) {
      bcryptjs.compare(
        req.body.user.password,
        user.passwordHash,
        (err, matches) => {
          if (matches) {
            const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', {
              expiresIn: 60 * 60 * 24,
            });
            res.json({
              user,
              message: 'Successfully authenticated.',
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: 'Passwords do not match.' });
          }
        }
      );
    } else {
      res.status(403).send({ error: 'User not found.' });
    }
  });
});

module.exports = router;
