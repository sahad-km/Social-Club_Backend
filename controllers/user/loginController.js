const bcrypt = require('bcrypt');
const User = require('../../models/user/userModel');
const { default: mongoose } = require("mongoose");
const jwt = require('jsonwebtoken')
const loginLoad = (req,res)=>{
    res.render('./user/login/loginPage',{title:'Login',msg:'',errmsg:''});
}
const loginCheck = async (req,res)=> {
    const {email,password} = req.body;
    let logger = await User.findOne({email:email});
    if(logger) {
        const validPassword = await bcrypt.compare(password, logger.password);
        if(validPassword) {
            console.log(logger._id)
            const token = jwt.sign(
                {
                    userId: logger._id,
                    email: logger.email,
                },
                'secret123'
            )
            const details = await User.aggregate([
                {
                    $match: {
                      _id: mongoose.Types.ObjectId(logger._id),
                    },
                  },
                  {
                    $lookup: {
                      from: "users",
                      localField: "following",
                      foreignField: "_id",
                      as: "followingFriends",
                    },
                  }
            ]);
            res.json({ status: 'user',user: token, details:details[0]})
        }else {
            res.json({ status: 'wrong'})
        }
    }else{
        res.json({ status: 'fail'})
    }
}

const logout = (req,res)=> {
    req.session.destroy();
    res.redirect('/');
}

module.exports = {loginLoad,loginCheck,logout};