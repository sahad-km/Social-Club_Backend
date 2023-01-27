const User = require('../../models/user/userModel');
const bcrypt = require('bcrypt');
const registerLoad = (req,res)=> {
    res.render('./user/register/register',{title:'Create Account',msg:''});
}

const signUp = async (req,res) => {
    const exist_user = await User.findOne({email:req.body.email});
        if(exist_user) {
            res.json({ status: 'fail'})
        }else {
            const {userName,email,password} = req.body;
            const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            userName:userName,
            email:email,
            password:hashedPassword
        });
        await user.save();
        res.json({ status: 'ok' })
    }
}

const insertDetails = async (req,res) => {
    const {firstName,lastName,worksAs,livesIn,country,status,profileUrl,coverUrl} = req.body;
        const detailsToUpdate={$set:{
            firstName:firstName,
            lastName:lastName,
            livesIn:livesIn,
            worksAs:worksAs,
            relationship:status,
            country:country,
            profilePicture:profileUrl,
            coverPicture:coverUrl
    }};
    await User.findByIdAndUpdate(req.body.userId,detailsToUpdate);
    const details = await User.findById(req.body.userId)
    res.json({ status: 'user',details:details})
}

module.exports = {registerLoad,insertDetails,signUp};