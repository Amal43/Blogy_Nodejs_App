require('./config/connect');
const cors  = require('cors');
const express = require('express');
const app = express();
const port = 3000;

const path=require('path');
app.use(express.static('Front/assets'));
app.use(express.static('./uploads'));
const userRoute=require('./Routers/userRoute');
const blogRoute=require('./Routers/blogRoute');
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/User',userRoute);
app.use('/Blog',blogRoute);

app.get("/",function(req,res){
    let pathfile=path.join(__dirname,"./Front/signup.html");
    res.sendFile(pathfile);
});

app.get("/",function(req,res){
    let pathfile=path.join(__dirname,"./Front/signup.html");
    res.sendFile(pathfile);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));