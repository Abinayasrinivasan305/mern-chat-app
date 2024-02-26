
import express from "express"; 
import dotenv from "dotenv";//for this to do u need to moddify the package.json file and add heading "type":"module";
import cookieParser from "cookie-parser";
import path from "path";



import authroutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";


import connectToMongoDB from "./db/connecttoMongoDB.js";
import { app, server } from "./socket/socket.js";


const PORT=process.env.PORT || 5000;  //port variable value update process.env.port or either 5000 //easily can'get the value process.env.PORT first u require the package

const __dirname= path.resolve();


dotenv.config().parsed;

app.use(express.json());                      //to parse the incoming requests (which is from auth.controller )  with JSON payloads (from req.body)

app.get("^",(req,res) =>{
    res.sendFile(path.join(__dirname,"/frontend/dist/index.html"))
})

//before routing this we call the cookie parser to access the cookies

app.use(cookieParser());

app.use("/api/auth",authroutes);
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

app.use(express.static(path.join(__dirname,"/frontend/dist")))    //this static given by express which store the static files like html,css,js



//app.get("/",(req,res)=>{
    //root route("http://localhost:5000")

   // res.send("Hello World abi");
//})

//let add some routes for authentication
// to get more organized code






server.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`)
    connectToMongoDB();
})