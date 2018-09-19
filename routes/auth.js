const router = require('express').Router()
const User = require('../models/User')
const passport = require('passport')


// agregar usuario
router.get('/addUser', (req, res, next) => {
  res.render('auth/addUser')
})
router.post('/addUser', (req, res, next) => {
  User.register(req.body, req.body.password)
    .then(user => res.redirect('/list'))
    .catch(error => next(error))
})

// iniciar sesion
router.get('/login', (req, res, next) => {
  res.render('auth/login')
})
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.redirect('/list')
})

// listado de usuarios
router.get('/list', (req, res, next) => {
  User.find().then(users => {
    res.render('auth/list', { users })
  })
})

module.exports = router