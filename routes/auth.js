const router = require('express').Router()
const User = require('../models/User')
const passport = require('passport')
const zxcvbn = require('zxcvbn')


function checkRole(role, role2, role3) {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role || req.user.role === role2 || req.user.role === role3) {
      next()
    } else {
      res.redirect('/login')
    }
  }
}
function checkUser(userId) {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.id === userId) {
      next()
    } else {
      res.redirect('/list')
    }
  }
}

// add user
router.get('/addUser', (req, res, next) => {
  res.render('auth/addUser')
})
router.post('/addUser', (req, res, next) => {
  const { password, password2 } = req.body
  if (password !== password2) return res.render('auth/addUser', { error: 'Confirme que las contraseñas son iguales' })
  if (zxcvbn(password).score <= 1) return res.render('auth/addUser', zxcvbn(password).feedback)
  User.register(req.body, req.body.password)
    .then(user => res.redirect('/login'))
    .catch(error => next(error))
})
// login
router.get('/login', (req, res, next) => {
  res.render('auth/login')
})
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res, next) => {
  res.redirect('/listExternal')
})

// list external
router.get('/listExternal', checkRole('client', 'projectManager', 'employee'), (req, res, next) => {
  User.find().then(users => {
    res.render('auth/listExternal', { users })
  })
})

// list internal
router.get('/listInternal', checkRole('projectManager', 'employee'), (req, res, next) => {
  User.find().then(users => {
    res.render('auth/listInternal', { users })
  })
})

module.exports = router