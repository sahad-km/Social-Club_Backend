const { Timestamp, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const schedulePostsSchema = mongoose.Schema({
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
    scheduleTime:{
        type: Date,
        required: true
    }
}
);

module.exports = mongoose.model('schedule_posts',schedulePostsSchema);