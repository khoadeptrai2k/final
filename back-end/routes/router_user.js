const router = require('express').Router()
const user_controller = require('../controllers/controller_user')

router.post('/register', user_controller.register)

router.post('/activation', user_controller.activateEmail)

module.exports = router