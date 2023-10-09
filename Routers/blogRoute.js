
const express = require('express');
const route=express.Router();
const multer= require('multer');
const bodyParser = require('body-parser');
const bogController = require('../Controllers/blogController');


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

route.put('/update/:id',
            upload.single("img"),
            bodyParser.urlencoded({ extended: false }), 
            bogController.updateBlog
        );

route.post('/addblog',
            upload.single("img"),
            bodyParser.urlencoded({ extended: false }),
            bogController.addBlog
        );

route.get('/:id', bogController.getBlogById);

route.delete('/del/:id', bogController.deleteBlog);


module.exports=route;