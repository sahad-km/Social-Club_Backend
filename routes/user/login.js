const express = require('express');
const router = express.Router();
const logController = require('../../controllers/user/loginController');
const {validateUserToken} = require('../../Middleware/jwtAuth')

router.get('/',logController.loginLoad);
router.post('/login',logController.loginCheck);
router.post('/logout',logController.logout);

module.exports = router;