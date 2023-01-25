const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/user/registerController');
const otpController = require('../../controllers/Otp/otpController');
const {validateUserToken} = require('../../Middleware/jwtAuth')

// router.get('/',registerController.registerLoad);
router.post('/signup',registerController.signUp);
router.post('/insert',registerController.insertDetails);
router.post('/otpsend',otpController.sendOTPVerificationEmail);
router.post('/verifyotp',otpController.otpVerify);
router.post('/forgot/otp',otpController.forgotPasswordOTP);
router.post('/forgot/otp/verify',otpController.forgotOTPVerify);
router.post('/insert_details',registerController.insertDetails);

module.exports = router;