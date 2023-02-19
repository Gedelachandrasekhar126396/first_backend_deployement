const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:String, 
    password:String,
    email:String
},{
    versionKey:false
})

const userModel = mongoose.model("user",userSchema);

module.exports = {userModel}