const mongoose = require('mongoose');

const blogSchema=mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,ref:'users'
    }, 
    img:{
        type:String,
    },
    tags:{
        type:['String'],
        maxlenght: 100, 
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    author:{
        type:Object,
    }
},{
    strict:false,
    versionKey:false
})

const Blog=mongoose.model('blogs',blogSchema);
module.exports=Blog;