const bcrypt = require('bcrypt');
const otpVerification = require('../../models/user/otpVerify');
const User = require('../../models/user/userModel');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.AUTH_EMAIL, 
        pass: process.env.AUTH_PASS
    }
})

const sendOTPVerificationEmail = async(req,res) => {
    const email = req.body.email;
    const exist_otp = await otpVerification.findOne({ email });
    if (exist_otp) {
        await otpVerification.deleteMany({email});
    }
    const exist_email = await User.findOne({email:email});
    if(exist_email) {
        res.json({ status: 'existedEmail'});
    } else {
        try{
            const otp = `${Math.floor(1000 + Math.random() * 9000)}`
            const mailOptions = {
                from: process.env.AUTH_EMAIL,
                to: email,
                subject: "Verify your email",
                html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the sign up </p><p> This code <b> Expires in 10 Minutes</b>.</p>`
            }
            const hashedOTP = await bcrypt.hash(otp,10);
            const newOTPVerification = new otpVerification({
                email: email,
                otp: hashedOTP,
                createdAt: Date.now(),
                expiresAt: Date.now() + 600000
            })
            await newOTPVerification.save()
            await transporter.sendMail(mailOptions)
            res.json({status:"sended"});
        }
        catch(err){
            res.json({
                status: "failed",
                message: err.message,
            })
        }
    }
    
}



const otpVerify = async (req,res)=> {
    const email = req.body.email;
    const otp = req.body.otp.trim();
    console.log("hi man0...")
    const user = await otpVerification.findOne({ email });
    if (user) {
        console.log("hi man1...",user.otp)
        const validOtp = await bcrypt.compare(otp, user.otp);
        console.log(typeof(otp),typeof(user.otp))
        if (validOtp) {
            console.log("hi man2...")
            await otpVerification.deleteMany({email})
            res.json({status:"success"});
        }
        else {
            console.log("hi man3...")
            res.json({ status: 'fail'});
        }
    }
    else {
        res.json({ status: 'failed'});
    }
}


const forgotPasswordOTP = async(req,res) => {
    console.log(req.body)
    const email = req.body.email;
    const exist_email = await User.findOne({email:email});
    if(exist_email) {
        console.log("456")
        try{
            const otp = `${Math.floor(1000 + Math.random() * 9000)}`
            const mailOptions = {
                from: process.env.AUTH_EMAIL,
                to: email,
                subject: "Verify your email",
                html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the sign up </p><p> This code <b> Expires in 10 Minutes</b>.</p>`
            }
            const hashedOTP = await bcrypt.hash(otp,10);
            const newOTPVerification = new otpVerification({
                email: email,
                otp: hashedOTP,
                createdAt: Date.now(),
                expiresAt: Date.now() + 600000
            })
            await newOTPVerification.save()
            await transporter.sendMail(mailOptions)
            res.json({status:"sended"});
        }
        catch(err){
            res.json({
                status: "failed",
                message: err.message,
            })
        }
    } else {
        res.json({ status: 'emailNotExisted'});
    }
    
}

const forgotOTPVerify = async (req,res)=> {
    console.log(req.body)
    const email = req.body.email;
    const otp = req.body.otp.trim();
    const user = await otpVerification.findOne({ email });
    if (user) {
        console.log("inside out",user.otp,otp)
        const validOtp = bcrypt.compare(otp, user.otp);
        if (validOtp) {
            console.log("inside out 2")
            await otpVerification.deleteMany({email})
            res.json({status:"success"});
        }
        else {
            res.json({ status: 'fail'});
        }
    }
    else {
        res.json({ status: 'failed'});
    }
}


module.exports = {sendOTPVerificationEmail,otpVerify,forgotPasswordOTP,forgotOTPVerify};