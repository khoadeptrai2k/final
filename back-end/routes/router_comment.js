const router = require('express').Router()
const comment_controller = require('../controllers/controller_comment')
const auth = require('../middleware/auth')

router.post('/comment', auth, comment_controller.createComment)

router.patch('/comment/:id', auth, comment_controller.updateComment)

router.patch('/comment/:id/like', auth, comment_controller.likeComment)

router.patch('/comment/:id/unlike', auth, comment_controller.unLikeComment)

router.delete('/comment/:id', auth, comment_controller.deleteComment)



module.exports = router