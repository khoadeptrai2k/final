const router = require('express').Router()
const user_controller = require('../controllers/controller_user')
const auth = require('../middleware/auth')

router.post('/register', user_controller.register)

router.post('/activation', user_controller.activateEmail)

router.post('/login', user_controller.login)

router.post('/refresh_token', user_controller.getAccessToken)

router.post('/forgot', user_controller.forgotPassword)

router.post('/reset', auth, user_controller.resetPassword)

router.get('/infor', auth, user_controller.getUserInfor)

module.exports = router