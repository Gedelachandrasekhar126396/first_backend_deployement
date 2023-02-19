const express = require("express");
const{noteModel}  = require("../model/note.model")
const noteRouter = express.Router();

noteRouter.get("/",async(req,res)=>{
   const content = await noteModel.find();
   res.send(content)
})

noteRouter.post("/create",async(req,res)=>{
    const payload = req.body;
    try{
        const contnet = new noteModel(payload);
        await contnet.save()
        res.send(" notes Created")
    } catch(err){
        res.send(err.message)
    }
    
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const noteId = req.params.id;
    await noteModel.findByIdAndDelete({_id:noteId})
    res.send({"msg":`note with id ${noteId} has been deleted`})
})


module.exports ={
    noteRouter
}