const { Timestamp, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const commentsSchema = mongoose.Schema({
    userId:{
        type:ObjectId,
        required:true
    },
    postId:{
        type:ObjectId,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    replies:[
        {
            userId:{
                type:ObjectId
            },
            reply:{
                type:String
            }
        }
    ]
},{timestamps:true}
);

module.exports = mongoose.model('comments',commentsSchema);