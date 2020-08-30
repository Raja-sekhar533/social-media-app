const mongoose = require('mongoose');


const likeSchema = mongoose.Schema({
    likes : {type: Number},
    
});

module.exports = mongoose.model('Like', likeSchema);