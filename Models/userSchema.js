//1. If the models need to connect to MongoDB, it can be done through mongoose. So, create mongoose
const mongoose = require('mongoose')


//2. Create schema
const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


//3. export schema
const users = mongoose.model('users',userSchema)
module.exports = users