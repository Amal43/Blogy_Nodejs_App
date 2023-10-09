const User= require('../Models/user');
const Blog= require('../Models/blog');
const path=require('path');
const bcrypt= require('bcrypt');
const Jwt = require('jsonwebtoken');
const key= "keystring";
const asyncWrapper= require('../Middleware/asyncWrapper');



const register = asyncWrapper(async(req ,res ,next)=>{
    const {username ,password}= req.body;

    const usernameAlreadyExists= await User.findOne({username:username});
    
    if(usernameAlreadyExists){
        return res.status(400).send('already exists');
    }

    const hashPassword = await bcrypt.hash(password,10);
    
    const newUser= await User.create({
        username:username,
        password:hashPassword,
    });
    
    if(newUser){
        let pathfile=path.join(__dirname,"../Front/login.html");
        res.sendFile(pathfile);
    }else{
        res.status(404).send('not found');
    } 
});

const login = asyncWrapper(async(req ,res ,next)=>{
    const {username ,password}= req.body;

    if(!username || !password){
        return res.status(400).send('Please provide username and password');    
    }
    
    const user= await User.findOne({username:username});

    if(!user){
        return res.status(401).send('Invalid Credentials email');    
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    
    if (!isPasswordCorrect) {
        return res.status(401).send('Invalid Credentials password');    
    }

    let token=Jwt.sign(user?.username,key)
    res.cookie('token',token, {maxAge: 360000000000});
    
    if(user && isPasswordCorrect){
        let pathfile=path.join(__dirname,"../Front/blog.html");
        res.sendFile(pathfile);
    }else{
        return res.status(404).send('not found');
    }  


});


const getBlog= asyncWrapper(async(req ,res ,next)=>{
    const usernameToken=Jwt.verify(req.cookies.token,key);
    const info = await User.findOne({username:usernameToken});
    const userblogs= await Blog.find({userId:info._id});

    if(!userblogs){
        return res.status(404).send('blog not found');    
    }else{
        return res.send(userblogs);
    }
});

const getAllBlogs= asyncWrapper(async(req,res ,next)=>{
    let blogs= await Blog.find({});
    if(!blogs){
        return res.status(404).send('blogs not found');
    }else{
        return res.send(blogs);
    }
});


module.exports={
    register,
    login,
    getBlog,
    getAllBlogs
}