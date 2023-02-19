const express = require("express");

const userRouter = express.Router();
const {userModel} = require("../model/user.model")

var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

userRouter.post("/register",async(req,res)=>{
    let {name,email,password} = req.body
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
          if(err){
            res.send(err.message)
          }else{
            let user = new userModel({name,email,password:hash});
            await user.save();
            res.send({"msg":"Registered Successfully"})
          }
        });
        
    } catch(err){
        res.send({"msg":"Error while registration","err":err.message})
    }
})
userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        let user = await userModel.find({email});
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result) =>{
                if(result){
                    let token  = jwt.sign({ userID: user[0]._id }, 'masai');
                    res.send({"msg":"New user has been logged succuessfully","token":token})
                } else {
                    res.send({"msg":"Invalid Credentials"})
                }
            });
          
        }
            else res.send({"msg":"Invalid Credentials"})
    }catch(err){
        res.send({"msg":"Error while Logged in","err":err.message})
    }
   
})

module.exports={userRouter}