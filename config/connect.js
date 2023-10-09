const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL).then(function(data)
{
console.log("connected")
}).catch(err=>{
    console.log(err)
})