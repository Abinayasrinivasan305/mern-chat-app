import { Server } from "socket.io";
import http from'http';
import  express from 'express';
import { SlowBuffer } from "buffer";
import { Socket } from "dgram";

const app = express();

const server= http.createServer(app);
const io= new Server(server,{                                                                  //upto this part we have express server and add the top of the socket server to implement realtime communication

    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"]


    }
})          


export const getRecieverSocketId = (receiverId) =>{
    return userSocketMap[receiverId]     //give us socket id when we pass recieverId
}
//to get online users using socket

const userSocketMap = {}; //{userId: socketId}

io.on('connection',(socket)=>{
    console.log('a user connected ',socket.id)

    const userId = socket.handshake.query.userId;  //in frontend SocketContext we get into query and get the user id
    if(userId != "undefined") userSocketMap[userId] = socket.id; //we need to send this all connected clients use io.emit

    io.emit("getOnlineUsers",Object.keys(userSocketMap))   //it immediately send this who is online and offline under the name getOnlineUsers in frontend

   
    //socket.on() is used to listen to the events ,can be used both on client and server side

    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));

    })
})


export {app,io,server};