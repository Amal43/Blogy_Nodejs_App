
const express = require('express');
const User=require('../Models/user');
const route=express.Router();
const path=require('path');
const  Blog=require('../Models/blog');
const multer= require('multer');
const cookies = require('cookie-parser');
const Jwt = require('jsonwebtoken');
const { verify } = require('crypto');
const cookieParser = require('cookie-parser');
const key= "keystring";
const bodyParser = require('body-parser');
route.use(bodyParser.json());
route.use(cookieParser());
route.use(express.static('Front/assets/'));
route.use(express.static('./uploads'));

// route.use(express.urlencoded({extended:true})); 
// route.use(express.json());

let filestorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
let upload = multer({ storage:filestorage })
// route.get('/', async function(req,res){
//     res.send("DOne ")
// })



route.post('/register',async function(req,res){
    let userRegister= await User.create({
        username:req.body.username,
        password:req.body.password,
    });
    if(userRegister){
        let pathfile=path.join(__dirname,"../Front/login.html");
        res.sendFile(pathfile);
    }else{
        res.status(404).send('not found');
    }    
})

route.post('/login',async function(req,res)
{
    let userRegister= await User.findOne({$and:[{username:req.body.username},{password:req.body.password}]})
    let token=Jwt.sign(userRegister?.username,key)
    res.cookie('token',token, {maxAge: 360000000000});
    if(userRegister){
        let pathfile=path.join(__dirname,"../Front/blog.html");
        res.sendFile(pathfile);
    }else{
        res.status(404).send('not found');
    }    
});

route.get('/getblog',async function(req,res)
{
    let usernameToken=Jwt.verify(req.cookies.token,key)
    let info = await User.findOne({username:usernameToken})
    let blogs= await Blog.find({userId:info._id});
    if(blogs)
    {
        res.send(blogs);
    }
    else
    {
        res.status(404).send('not found');
    }
})


route.get('/getallblog',async function(req,res)
{
    let blogs= await Blog.find({});
    if(blogs)
    {
        res.send(blogs);
    }
    else
    {
        res.status(404).send('not found');
    }
})




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