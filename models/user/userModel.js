const { Timestamp, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        trim:true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    livesIn: {
        type: String,
    },
    worksAs: {
        type: String,
    },
    relationship: {
        type: String,
    },
    country: {
        type: String,
    },
    profilePicture: {
        type: String
    },
    coverPicture: {
        type: String
    },
    followers:[],
    following:[]
},{Timestamp:true}
);

module.exports = mongoose.model('user',userSchema);