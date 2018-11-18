const { Router } = require('express');
const bcrypt = require('bcrypt');

const User = require('../Users/model');

const { toJWT, toData } = require('./jwt');

const router = new Router();

router.post('/tokens', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res
      .status(400)
      .send({ message: `Please submit a valid email and(or) password` });
  } else {
    User.findOne({
      where: { email: req.body.email }
    })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: 'This email is not registered'
          });
        }

        if (bcrypt.compareSync(req.body.password, entity.password)) {
          res.send({
            jwt: toJWT({ userId: entity.id })
          });
        } else {
          res.status(400).send({
            message: 'Password is incorrect'
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: 'Something went wrong'
        });
      });
  }
});

module.exports = router;