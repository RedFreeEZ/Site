const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    text: {
        type: String,
        requaired: true,
    },

    title: {
        type: String,
        requaired: true,
    },
    author: {
        type: String,
        requaired: true,
    },

},{ timestaps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;