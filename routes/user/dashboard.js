const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/user/userController');
const postController = require('../../controllers/post/postController');
const {validateUserToken} = require('../../Middleware/jwtAuth')

router.get('/:id',validateUserToken,dashboardController.userDetails);
router.get('/following/:id',validateUserToken,dashboardController.followingDetails)
router.get('/all_users/:id',validateUserToken,dashboardController.allUsers);
router.post('/follow/:id',validateUserToken,dashboardController.followUser);
module.exports = router;