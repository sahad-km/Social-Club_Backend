const detailsModel = require('../../models/user/userModel');

const dashboardLoad = async (req,res)=> {
    let userDisplay = await detailsModel.find({userType:{$ne:'admin'}});
    res.json({userDisplay})
}
const sessionCheck = (req,res,next) => {
    if(req.session.userId) {
        if(req.session.userType == 'admin') {
            next();
        }else {
            res.redirect('/dashboard');
        }
    }else {
        res.redirect('/');
    }
}


const userDetailsLoad = async (req,res) => {
    // console.log(req.params);
    const userId = req.params.id;
    // console.log(userId);
    const editUser = await detailsModel.findById(userId);
    // console.log(editUser);
    res.json({editUser})
    res.render('./admin/userEdit',{editUser});
}

const userUpdate = async (req,res) => {
    const userId = req.params.id;
    console.log(userId)
    const {firstName,lastName,mobNumber,email} = req.body;
    console.log(req.body);
        const detailsToUpdate={$set:{
            firstName:firstName,
            lastName:lastName,
            mobNumber:mobNumber,
            email:email
}};
    await detailsModel.findByIdAndUpdate(userId,detailsToUpdate);
    res.json({status: 'updated'})
}
const userDelete = async (req,res)=> {
    const userId = req.params.id;
    await detailsModel.findByIdAndDelete(userId);
    res.json({status : 'deleted'})
}
const addUser = (req,res)=>{
    res.render('./admin/userRegister.ejs');
}
const insertUser = async (req,res) => {
    const already_user = await detailsModel.findOne({email:req.body.email});
        if(already_user) {
            res.render('./admin/userRegister.ejs',{msg:'User already registered'});
        }else {
            const {firstName,lastName,gender,mobNumber,category,email,password,userType} = req.body;
        const user = new detailsModel({
            firstName,
            lastName,
            gender,
            mobNumber,
            category,
            email,
            password,
            userType
        });
        await user.save();
        res.redirect('/admin/dashboard');
    }
}

module.exports = {dashboardLoad,sessionCheck,userDetailsLoad,userUpdate,userDelete,addUser,insertUser};