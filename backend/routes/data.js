const express = require('express');
const router = express.Router();
const User = require("../models/user")





router.get("/:id", (req, res, next) => {

    const userQuery = User.findById(req.params.id);
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
        res.status(500).json({
            message: "Fetching Posts Faild!"
        })
    });
     
     })

     





module.exports = router 