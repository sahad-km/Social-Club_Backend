const User = require("../../models/user/userModel");
const posts = require("../../models/Posts/posts");
const commentModel = require("../../models/Posts/comments");
const { default: mongoose } = require("mongoose");  

const loadComments = async (req, res) => {
    console.log("first",req.params.id)
  try {
    const postId = req.params.id;
    console.log(postId)
    const comments = await commentModel.aggregate([
      {
        $match: {
          postId: mongoose.Types.ObjectId(postId),
        }
      },
      {
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
      }
    ]);
    console.log("comments",comments)
    res.json({comments:comments})
  } catch (err) {
    console.log(err)
  }
};

const addComments = async (req, res) => {
  console.log(req.params.id)
  console.log("first")
  try {
    const postId = req.params.id;
    const { userId, comment } = req.body;
    const newComment = new commentModel({
      userId: userId,
      postId: postId,
      comment: comment,
    });
    await newComment.save();
    res.json({ newComment:newComment });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addComments, loadComments };
