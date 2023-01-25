const express = require('express');
const router = express.Router();
const chatController = require('../../controllers/Chat/chatController');
const {validateUserToken} = require('../../Middleware/jwtAuth');

router.post('/',validateUserToken,chatController.createChat);
router.get('/:id',validateUserToken,chatController.userChat);
router.get('/find/:firstId/:secondId',validateUserToken,chatController.findChat);
router.post('/add_message',validateUserToken,chatController.addMessage);
router.get('/message/:chatId',validateUserToken,chatController.getMessage);

module.exports = router;