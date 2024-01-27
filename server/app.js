require("dotenv").config(); 
const express = require("express");
const app = express();
const cors = require("cors");
const router = require('./Routes/router')
//db connect
require("./models/db");

//middleware
app.use(express.json());
app.use(cors());
app.use(router);

// app.get('/',(req,res)=>{
//     res.send("server start");
// })


app.listen( process.env.PORT,()=>{
    console.log(`server start at PORT No : ${ process.env.PORT}`);
})