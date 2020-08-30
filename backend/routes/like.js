const express = require('express');
const router = express.Router();
const Like = require("../models/like");





router.post("/like", (req, res, next) => {

    const userQuery = new Like(req.body.likes);
    let fetchedData;
    
    
    userQuery.save().then(document => {
        fetchedUser = document
        return User.count();
    }).then(count =>{
        res.status(200).json({
            message: "users are fetched successfully", 
            user : fetchedUser
        })
    }).catch(error => {
        res.status(500).json({
            message: "Fetching Posts Faild!"
        })
    });
     
     })

     





module.exports = router 