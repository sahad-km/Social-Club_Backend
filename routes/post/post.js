const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController');
const postController = require('../../controllers/post/postController');
const commentController = require('../../controllers/post/commentController');
const {validateUserToken} = require('../../Middleware/jwtAuth');

router.get('/all_post/:id',validateUserToken,postController.allPosts)
router.post('/upload_image/:id',validateUserToken,postController.uploadImg);
router.get('/:id',validateUserToken,postController.getPost);
router.put('/update_post/:id',validateUserToken,postController.updatePosts);
router.delete('/delete/:id',validateUserToken,postController.deletePost);
router.post('/like_unlike/:id',validateUserToken,postController.likeOrDislike);
router.get('/timeline_posts/:id',validateUserToken,postController.timeLinePost);
router.post('/add_comment/:id',validateUserToken,commentController.addComments);
router.get('/comments/:id',validateUserToken,commentController.loadComments);
router.post('/scheduled_post/:id',validateUserToken,postController.addScheduledPost);

module.exports = router;