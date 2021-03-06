const router = require('express').Router();
const post_controller = require('../controllers/controller_post')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.get('/getPosts', auth, post_controller.getPosts)
router.get('/getPost/:id',auth, post_controller.getPost)
router.get('/authPost/:id', post_controller.getAuthPost)
router.get('/post_discover', post_controller.getPostsDicover)

router.post('/createPost',auth, post_controller.createPost)
router.patch('/updatePost/:id',auth, authAdmin,  post_controller.updatePost)
router.delete('/deletePost/:id',auth, authAdmin, post_controller.deletePost)
router.patch('/updatePost/:id/like',auth, post_controller.likePost)
router.patch('/updatePost/:id/unlike',auth, post_controller.unLikePost)

module.exports = router