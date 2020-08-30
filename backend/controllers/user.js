const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.createUser = (req,res,next)=> {
    bcrypt.hash(req.body.password, 10).then(hash =>{
        const url =  req.protocol + '://'+ req.get("host");
        const user = new User({
            imagePath: url + "/images/" + req.file.filename,
            name:req.body.name,
            email: req.body.email,
            password :hash,
            mobile:req.body.mobile,
            gender:req.body.gender,
            address:req.body.address
    })
    user.save()
    .then(result =>{
        res.status(201).json({
            message: 'user created',
            result: result
        });
    })
    .catch(err => { 
        console.log(err)
        res.status(500).json({
            error : {
                
                message: "Invalid Authentication Credentials!"
            }
        })
    })
})
}
exports.userLogin = (req,res,next) => {
    let fetchedUser;
    User.findOne({email: req.body.email})
    .then(user => {
        
        if(!user){
            return res.status(401).json({
                message: 'Auth faild'
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        
        if(!result){
            return res.status(401).json({
                message: 'Auth faild'
            })
        }
        const token = jwt.sign({email:fetchedUser.email, userId: fetchedUser._id}, process.env.JWT_KEY, {expiresIn: "1h"});
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId : fetchedUser._id
        })
    })
    .catch(err =>{
        
        return res.status(401).json({
            message:"Invalid Authentication Credentials!"
        })
    })

// get user data from the database
 
   
}
   
    