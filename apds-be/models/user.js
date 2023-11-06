const mongoose = require('mongoose');

// Code Attribution
// Author: Yingqi Chen
// Link: https://chanwingkeihaha.medium.com/do-you-know-the-unique-option-is-not-a-validator-in-mongoose-85267fb1a085
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username : { 
        type: String, 
        required: true,
        unique: true,
        uniqueCaseInsensitive: true},
    password: { type: String, required: true },
    department : {type: String, required: true},
});

userSchema.plugin(uniqueValidator,
    { message: 'Error, expected {PATH} to be unique.' });

module.exports = mongoose.model('User', userSchema);