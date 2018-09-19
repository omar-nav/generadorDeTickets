const router = require('express').Router()
const User = require('../models/User')
const passport = require('passport')
const zxcvbn = require('zxcvbn')

// add user
router.get('/addUser', (req, res, next) => {
  res.render('auth/addUser')
})
router.post('/addUser', (req, res, next) => {
  const { password, password2 } = req.body

  if (password !== password2) return res.render('auth/addUser', { error: 'Confirma que las contraseñas son iguales' })
  if (zxcvbn(password).score <= 1) return res.render('auth/addUser', zxcvbn(password).feedback)

  User.register(req.body, req.body.password)
    .then(user => res.redirect('/list'))
    .catch(error => next(error))
})

// login
router.get('/login', (req, res, next) => {
  res.render('auth/login')
})
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.redirect('/list')
})

// list users
router.get('/list', (req, res, next) => {
  User.find().then(users => {
    res.render('auth/list', { users })
  })
})

module.exports = router