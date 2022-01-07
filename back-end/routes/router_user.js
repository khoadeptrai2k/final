const router = require('express').Router()
const user_controller = require('../controllers/controller_user')

router.post('/register', user_controller.register)

router.post('/activation', user_controller.activateEmail)

router.post('/login', user_controller.login)

module.exports = router