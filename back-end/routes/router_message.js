const router = require('express').Router()
const message_controller = require('../controllers/controller_message')
const auth = require('../middleware/auth')

router.post('/message', auth, message_controller.createMessage)

router.get('/conversations', auth, message_controller.getConversations)

router.get('/message/:id', auth, message_controller.getMessages)


module.exports = router