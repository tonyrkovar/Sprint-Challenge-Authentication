const jwt = require('jsonwebtoken');
const router = require('express').Router();
const bcrypt = require('bcryptjs')

const authMiddle = require('./authenticate-middleware');

const db = require('../users/users-model')

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  db.add(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body
  db.findBy(username)
    .first()
    .then(user => {
      console.log(user, 'this is in login then')
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user.username)
        res.status(200).json({
          message: `welcome ${user.username}`,
          token
        })
      } else {
        res.status(400).json({ Error: `unverified account` })
      }
    })
    .catch(error => {
      res.status(500).json({ Error: `Server is unreachable ${error}` })
    })
});

function getJwtToken(username) {
  const payload = {
    username,
    role: 'helper'
  }

  const secret = process.env.JWT_SECRET || "This is secret"

  const options = {
    expiresIn: '2d'
  }

  return jwt.sign(payload, secret, options)
}

module.exports = router;
