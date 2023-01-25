const User = require("../../models/user/userModel");
const posts = require("../../models/Posts/posts");
const commentModel = require("../../models/Posts/comments");
const scheduledPostModel = require('../../models/Posts/scheduledPost')
const { default: mongoose } = require("mongoose");


//Get all post
const allPosts = async (req,res) => {
  console.log("hi da ... monuse...")
  const id = req.params.id;
  try{
    const details = await posts.aggregate([
      { $match: { userId: { $ne: id } } },
    ]);
    console.log("CHOSHOUA",details);
    res.json({details:details})
  }catch(err){
    console.log(err)
  }
}

//Upload Image as Post
const uploadImg = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const { url, description,type } = req.body;
    console.log("chu chi chu chi",type)
    const post = new posts({
      userId: id,
      image: url,
      caption: description,
      postType:type
    });
    await post.save();
    res.json({ post });
  } catch (err) {
    console.log(err);
  }
};


//Get Our Posts along with Comments

const getPost = async (req,res) => {
    const id = req.params.id;
    try{
        const postandComment = await posts.aggregate([
                {
                  $match: {
                    _id: mongoose.Types.ObjectId(id),
                  },
                },
                {
                  $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments",
                  },
                },
              ]);
        console.log("postey",postandComment)
        // console.log('commentsey...',comments);
        res.json({post:postandComment})
    } catch(err){
        console.log(err)
    }
}


//Update the  Posts

const updatePosts = async (req, res) => {
  console.log("firstEditDA")
  const postId = req.params.id;
  const { caption } = req.body;
  try {
    const detailsToUpdate={$set:{
      caption:caption
    }}
    await posts.findByIdAndUpdate(postId,detailsToUpdate);
      res.json({ status: "updated" });
  } catch (err) {
    console.log(err);
  }
};

//Delete a post

const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    await posts.findByIdAndDelete(postId);
    await commentModel.deleteMany({postId:postId})
    res.json({ status: "deleted" });
  } catch (err) {
    console.log(err);
  }
};

//Like/Dislike a Post

const likeOrDislike = async (req, res) => {
  const postId = new mongoose.Types.ObjectId(req.params.id);
  const userId = new mongoose.Types.ObjectId(req.body.userId);
  try {
    const postLike = await posts.findById(postId);
    if (!postLike.liked.includes(userId)) {
      await posts.updateOne({ _id: postId }, { $push: { liked: userId } });
      res.json({ status: "liked" });
    } else {
      await posts.updateOne({ _id: postId }, { $pull: { liked: userId } });
      res.json({ status: "Disliked" });
    }
  } catch (err) {
    console.log(err);
  }
};

//Get Time line posts for home page

const timeLinePost = async (req, res) => {
  const userId = req.params.id;
  try {
    const userPost = await posts.find({ userId: userId });
    const followingPosts = await User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    
    res.json(
      userPost.concat(...followingPosts[0].followingPosts).sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );
  } catch (err) {}
};

// Setting post into scheduled collection

const addScheduledPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { url, description,type,scheduleTime } = req.body;
    const scheduledPost = new scheduledPostModel({
      userId:id,
      image:url,
      caption:description,
      postType:type,
      scheduleTime:scheduleTime
    });
    await scheduledPost.save();
    res.json({status:"success"});
  } catch (error) {
    console.log(error)
  }
};



// Checking scheduled posts and moving them to post collection

const checkScheduledPosts = async () => {
  const scheduledPosts = await scheduledPostModel.find({
    scheduleTime: { $lte: new Date() }
  });
  scheduledPosts.forEach(async scheduledPost => {
    const post = new posts({
      userId: scheduledPost.userId,
      image: scheduledPost.image,
      caption:scheduledPost.caption,
      postType:scheduledPost.postType
    });
    await post.save();
    await scheduledPost.remove();
  });
};

setInterval(checkScheduledPosts, 60000);

module.exports = {
  uploadImg,
  getPost,
  updatePosts,
  deletePost,
  likeOrDislike,
  timeLinePost,
  addScheduledPost,
  allPosts
};
