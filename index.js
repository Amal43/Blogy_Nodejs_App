require('./config/connect');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const multer= require('multer');
const path=require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRoute=require('./Routers/userRoute');
const blogRoute=require('./Routers/blogRoute');

app.use(express.static('Front/assets'));
app.use(express.static('./uploads'));
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

let fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ 
    storage: fileStorage,
})

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

const PORT=process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));