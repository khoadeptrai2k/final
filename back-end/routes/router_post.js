const router = require('express').Router();
const post_controller = require('../controllers/controller_post')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.get('/getPosts', auth, post_controller.getPosts)
router.get('/getPost/:id',auth, post_controller.getPost)

router.post('/createPost',auth, post_controller.createPost)
router.patch('/updatePost/:id',auth, authAdmin,  post_controller.updatePost)
router.delete('/deletePost/:id',auth, authAdmin, post_controller.deletePost)
router.patch('/likePosts/:id/likePost', post_controller.likePost)


module.exports = router