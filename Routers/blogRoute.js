
const express = require('express');
const route=express.Router();
const path=require('path');
const Blog=require('../Models/blog');
const User=require('../Models/user');
const cookieParser = require('cookie-parser');
const Jwt = require('jsonwebtoken');
const key= "keystring";
route.use(cookieParser());
const bodyParser = require('body-parser');
const multer = require('multer');

const filestorage = multer.diskStorage({
    destination: (req, file, callbackfun) => {
        // console.log(req,file);
        callbackfun(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname.replaceAll(" ", ''))
    }
})
const multerFilter = function (req, file, cb) {
    if (file.mimetype.split("/")[0] == "image") {
        cb(null, true);
    } else {
        cb(new Error("Not image"), false);
    }
};
let upload = multer({
    storage: filestorage,
    fileFilter: multerFilter
})


route.put('/update/:id',upload.single("img"),bodyParser.urlencoded({ extended: false }),async function(req,res){
    console.log(req.params.id);
    console.log(req.body);
    let update= await Blog.findByIdAndUpdate(
        req.params.id,
        {
            title : req.body.title,
            description : req.body.description,
            img:req.file.filename, 
        },
        { new: true } 
    );
    console.log(update)
    if(update){
        console.log('amal')
        res.json({ success: true, redirectUrl:"/User/blog" });
    }else{
        res.status(404).send('not found');
    } 
})

route.post('/addblog',upload.single("img"),bodyParser.urlencoded({ extended: false }),async function(req,res){
    console.log(req.body)
    let arr=[];
    req.body.tags.forEach(element => {
        if(element !== ""){
            arr.push(element)
        }
    });
    let usernameToken=Jwt.verify(req.cookies.token,key);
    let info = await User.findOne({username:usernameToken});
    let addPost= await Blog.create({
        title: req.body.title,
        description:req.body.description,
        tags: arr,
        img: req.file.filename,
        author:info,
        userId:info._id,
    })
    console.log(addPost);

    if(addPost){
        res.json({ success: true, redirectUrl:"/User/blog" });
    }else{
        res.status(404).send('not found');
    } 
    // console.log(addPost)
    // res.redirect("/User/blog");
})


route.get('/:id',async function(req,res){
    let blog= await Blog.findOne({_id:req.params.id})
    res.send(blog);
}) 
route.delete('/del/:id',async function(req,res){
    let deleteData= await Blog.deleteOne({_id:req.params.id})
    res.redirect('/User/blog/');
})







module.exports=route;