const express = require('express');
const router = express.Router();
const User = require("../models/user")





router.get("", (req, res, next) => {

    const userQuery = User.find();
    let fetchedUser;
    
    
    userQuery.then(document => {
        fetchedUser = document
        return User.count();
    }).then(count =>{
        res.status(200).json({
            message: "users are fetched successfully", 
            user : fetchedUser
        })
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Fetching Posts Faild!"
        })
    });
     
     })

     





module.exports = router 