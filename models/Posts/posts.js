const { Timestamp, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const postsSchema = mongoose.Schema({
    userId:{
        type:ObjectId,
        required:true
    },
    image: {
        type: String,
        required: true
    },
    caption: {
        type: String,
    },
    postType:{
        type: String
    },
    liked: [],
},
{timestamps:true}
);

module.exports = mongoose.model('posts',postsSchema);