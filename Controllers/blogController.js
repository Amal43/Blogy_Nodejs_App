const User= require('../Models/user');
const Blog= require('../Models/blog');
const path=require('path');
const bcrypt= require('bcrypt');
const Jwt = require('jsonwebtoken');
const key= "keystring";
const asyncWrapper= require('../Middleware/asyncWrapper');

const updateBlog= asyncWrapper(async(req ,res ,next)=>{
    const update= await Blog.findByIdAndUpdate(
        req.params.id,
        {
            title : req.body.title,
            description : req.body.description,
            img:req.file.filename, 
        },
        { new: true } 
    );

    if(update){
        return res.json({ success: true, redirectUrl:"/User/blog" });
    }else{
        return res.status(404).send('blog not found');
    } 
});

const addBlog= asyncWrapper(async(req ,res, next)=>{
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

    if(addPost){
        return res.json({ success: true, redirectUrl:"/User/blog" });
    }else{
        return res.status(404).send('not found');
    } 
});

const getBlogById = asyncWrapper(async (req, res ,next)=>{
    const blog= await Blog.findOne({_id:req.params.id})
    
    if(!blog){
        return res.status(404).send('blog not found');
    }else{
        return  res.send(blog);
    }
}); 

const deleteBlog = asyncWrapper(async(req,res ,next)=>{
    const deleteData= await Blog.deleteOne({_id:req.params.id})
    
    if(!deleteData){
        return res.status(404).send('blog not found');
    }else{
        return res.redirect('/User/blog/');
    }
});

module.exports={
    updateBlog,
    addBlog,
    getBlogById,
    deleteBlog
}