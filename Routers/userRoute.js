const express = require('express');
const route=express.Router();
const path=require('path');
const userController = require('../Controllers/userController');
route.use(express.static('Front/assets/'));
route.use(express.static('./uploads'));


route.post('/register', userController.register);

route.post('/login', userController.login);

route.get('/getblog', userController.getBlog);

route.get('/getallblog', userController.getAllBlogs);


route.get('/article',async function(req,res){
    let pathfile=path.join(__dirname,"../Front/articles.html");
    res.sendFile(pathfile);
})

route.get('/blog',async function(req,res){
    let pathfile=path.join(__dirname,"../Front/blog.html");
    res.sendFile(pathfile);
})

route.get('/home',async function(req,res){
    let pathfile=path.join(__dirname,"../Front/index.html");
    res.sendFile(pathfile);
})

route.get('/update',async function(req,res){
    let pathfile=path.join(__dirname,"../Front/update.html");
    res.sendFile(pathfile);
})

module.exports=route;