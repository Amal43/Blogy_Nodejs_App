const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
   username:{
      type: String,
      required:true,
      unique:true,   
   },
   password :{
      type:String,
      required:true,
   },
},{
   strict:false,
   versionKey:false
})

const User=mongoose.model('users',userSchema);

module.exports=User;