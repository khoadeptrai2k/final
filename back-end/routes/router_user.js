const router = require('express').Router()
const user_controller = require('../controllers/controller_user')

router.post('/register', user_controller.register)

module.exports = router