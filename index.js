const express = require("express");
const {connection} = require("./db")
const app = express();
const {userRouter} = require("./routes/user.routes");
const {noteRouter} = require("./routes/note.route");
const {authenticate} = require("./middleware/authenticate.middleware")
const cors = require("cors");
require("dotenv").config()
app.use(cors())
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)
app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("connected to db")
    } catch(err){
        console.log(err.messsage)
    }
    
})