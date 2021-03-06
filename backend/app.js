const path = require('path');
const express = require ('express');

const bodyParser = require("body-parser");
const mongoose = require('mongoose');

 const postsRoutes = require("./routes/posts");
const userRoutes = require('./routes/user');
const dataRoutes = require("./routes/data");
const usersRoutes = require("./routes/users");
const likesRoutes = require("./routes/like");
const app = express();

mongoose.connect("mongodb+srv://Raja:"+process.env.MONGO_ATLAS_PW+"@cluster0.ibk5p.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true  })

.then(()=> {
    console.log('connected to database');
})
.catch((error)=>{
    console.log(error)
    console.log('connection faild');
    
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req,res,next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST ,PUT, PATCH, DELETE, OPTIONS")
    next();
})

app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes);
app.use("/api/user", dataRoutes);
app.use("/api/user", usersRoutes);
app.use("api/likes", likesRoutes);
module.exports = app;