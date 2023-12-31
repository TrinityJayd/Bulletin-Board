const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    username : { 
        type: String, 
        required: true},
    title: { type: String, required: true },
    content: { type: String, required: true },
    date : {type: String, required: true},
    department: {type: String, required: true},
});

module.exports = mongoose.model('Post', postSchema);