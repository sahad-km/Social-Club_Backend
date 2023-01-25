const { Timestamp, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({
    chatId:{
        type:ObjectId,
    },
    senderId:{
        type:ObjectId,
    },
    text: {
        type: String,
    },
    type: {
        type: String
    }
},{timestamps:true}
);

module.exports = mongoose.model('messages',messageSchema);