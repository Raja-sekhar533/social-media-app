 const mongoose = require('mongoose');
 const uniqueValidator = require('mongoose-unique-validator');


 const userSchema = mongoose.Schema({
imagePath: {type:String, required:true},
name: {type:String, required: true},
email: {type: String , reqiured: true, unique: true},
password: { type: String, required: true},
mobile: {type:Number, required: true},
gender:{ type:String, required: true},
address:{type:String, required: true}
 })
userSchema.plugin(uniqueValidator);
 module.exports = mongoose.model('User', userSchema);