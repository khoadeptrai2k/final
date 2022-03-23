const router = require('express').Router()
const user_controller = require('../controllers/controller_user')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register', user_controller.register)

router.post('/activation', user_controller.activateEmail)

router.post('/login', user_controller.login)

router.post('/refresh_token', user_controller.getAccessToken)

router.post('/forgot', user_controller.forgotPassword)

router.post('/reset', auth, user_controller.resetPassword)

router.get('/infor/:id', auth, user_controller.getUserInfor)

router.get('/all_infor', auth, authAdmin, user_controller.getUsersAllInfor)

router.post('/logout', user_controller.logout)

router.patch('/update', auth, user_controller.updateUser)

router.patch('/update_role/:id', auth, authAdmin, user_controller.updateUsersRole)
 
router.delete('/delete/:id', auth, authAdmin, user_controller.deleteUser)





module.exports = router