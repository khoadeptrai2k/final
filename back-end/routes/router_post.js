const router = require('express').Router();
const post_controller = require('../controllers/controller_post')


router.get('/getPosts', post_controller.getPosts)
router.get('/getPost/:id', post_controller.getPost)

router.post('/createPost', post_controller.createPost)
router.patch('/updatePost/:id', post_controller.updatePost)
router.delete('/deletePost/:id', post_controller.deletePost)

module.exports = router