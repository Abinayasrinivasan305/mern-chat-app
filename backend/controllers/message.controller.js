import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req,res)=>{
    try{
        const {message}= req.body;
        const {id: recieverId }= req.params;
        const senderId= req.user._id                   //we have to set in the request otherwise not work so we adding middleware in messageroutes

       let conversation = await Conversation.findOne({
            participants: { $all: [senderId,recieverId]}           //finding the conversation between sender and reciever id which is in participant array
                                                                     //$all mongoose provide 
        })

        if(!conversation){             //this is the first time conversation so  not means create
            conversation = await Conversation.create({
                participants :[senderId,recieverId],      //messages in conversation model first empty array so we don't need to  mention
            })

        }

        //next we create the conversation between two users that is coming from user msg

        const  newMessage= new Message({
            senderId,
            recieverId,
            message,
        })
       
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
    //we created but not updated to database the conversation and message

      // await conversation.save();
       //await newMessage.save();

        //optimized line (this will run in parallel)

    await Promise.all([conversation.save(),newMessage.save()])

    //SOCKET IO FUNCTIONALITY

    const recieverSocketId= getRecieverSocketId(recieverId);

    if(recieverSocketId){  //if reciever socket is not undefined meanse u send the message which is saved in db so use io.to instead of io.emit 
        //io.to(receiverSocketId).emit() used to send specific client
        io.to(recieverSocketId).emit("newMessage",newMessage) 
    }
       


      
      res.status(201).json(newMessage)  ;
    }catch(error){
        console.log("Error in sendMessage Controller",error.message)
        res.status(500).json({error:"Internal server Error"})
    }
}


export const getMessages = async(req,res)=>{
   try{
      const {id:userToChatId}=req.params;
      const senderId = req.user._id;

      const conversation = await Conversation.findOne({
        participants: {$all: [senderId,userToChatId] }
      }).populate("messages")               //not reference actual msg content                  //to store the content of the message not the message id in database ...so mongoose provide populate

      if(!conversation)  return res.status(200).json([]);

      const messages=conversation.messages

     res.status(200).json(messages)

   }
   catch(error){
    console.log("Error in getMessages controller:",error.message)
    res.status(500).json({ error:"Internal server error"})
   }

}