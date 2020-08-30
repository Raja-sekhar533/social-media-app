const express = require('express');

const router = express.Router();
const UserControllers = require("../controllers/user");
const extract = require("../middleware/file")
const checkAuth = require("../middleware/check-auth")


const { readSync } = require('fs');

router.post('/signup',extract,UserControllers.createUser );

router.post("/login",UserControllers.userLogin );
// router.get("", extract, UserControllers.getUsers);




module.exports = router 