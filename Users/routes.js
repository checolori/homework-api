const { hashSync } = require('bcrypt')
const { Router } = require('express')
const router = new Router()

const User = require('./model')

router.post('/users', (req, res, next) => User
  .create({
    ...req.body,
    password: hashSync(req.body.password, 10)
  })
  .then(user => res.status(201).send(user))
  .catch(error => next(error))
)

module.exports = router