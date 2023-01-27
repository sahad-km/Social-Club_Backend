const user = require("../../models/user/userModel");
const posts = require("../../models/Posts/posts");
const { default: mongoose } = require("mongoose");

//Get all users with their Details

const allUsers = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  try {
    // Find all users in the collection except the current user
    const userDetails = await user.aggregate([
      { $match: { _id: { $ne: id } } },
      { $project: { password: 0 } },
    ]);
    console.log("gg we are leaving...",userDetails)
    res.json({ userDetails });
  } catch (err) {
    console.log(err);
  }
};

//User Profile
const userDetails = async (req, res) => {
  const userId = req.params.id;
  console.log("first ingott call vannoi")
  try {
    const userExists = await user.findById(userId);
    if (!userExists) {
      res.json({err: 'User does not exist'});
      return;
    }
    console.log("checking nadannu")
    const postCount = await posts.find({userId:userId}).count();
    const details = await user.aggregate([
        {
            $match: {
              _id: mongoose.Types.ObjectId(userId),
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
    console.log(postCount,details);
    res.json({ details:{...details[0],postCount:postCount}});
  } catch (err) {
    console.log(err);
    console.log("kooi")
    res.status(404).json({error:'problem with id'});
  }
};

// Get following Details

const followingDetails = async (req,res) => {
  console.log("firstIdey....")
  const userId = req.params.id;
  try{
    const details = await user.aggregate([
      {
          $match: {
            _id: mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "following",
            foreignField: "userId",
            as: "followingFriends",
          },
        }
  ]);
  console.log(details)
  res.send({details})
  }catch(err){
    console.log(err)
  }
}


//Follow or Unfollow a User

const followUser = async(req,res) => {
  try {
      console.log('hi')
      const id = mongoose.Types.ObjectId(req.params.id);
      const myId = mongoose.Types.ObjectId(req.body.myId)
      const userToFollow = await user.findById(id)
      if(!userToFollow.followers.includes(myId)) {
          await user.findByIdAndUpdate(id, {$push:{followers:myId}})
          await user.findByIdAndUpdate(myId, {$push:{following:id}})
          res.json({status:'follow',id:id})
      } else {
          await user.findByIdAndUpdate(id, {$pull:{followers:myId}})
          await user.findByIdAndUpdate(myId, {$pull:{following:id}})
          res.json({status:'unfollow',id:id})
      }
  } catch (err) {
      console.log(err)
  }
}

module.exports = { followUser, userDetails, allUsers, followingDetails };
