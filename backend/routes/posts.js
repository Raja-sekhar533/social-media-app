const express =require ('express');
const postController = require ("../controllers/post");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");



const router  = express.Router();


// it is using for posting data to the server & db


router.post("",checkAuth,extractFile,postController.createPost );

// it is sends the data to the front end

router.get("",postController.getPosts);

// it is using for editing the data


router.put("/:id",checkAuth,extractFile,postController.updatePost);


// it is using for get single data


router.get("/:id",postController.getPost)





// it using for deleting the data


router.delete("/:id",checkAuth,postController.deleteUser);


module.exports = router;