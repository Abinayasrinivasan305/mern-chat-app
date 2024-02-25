import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({message}) => {

  //we going to check the message is from us or other user so we use AuthContext
  const {authUser}=useAuthContext();
  const {selectedConversation}=useConversation();
  const formattedTime= extractTime(message.createdAt);
  const fromMe= message.senderId=== authUser._id;
  const chatClassName= fromMe ?  "chat-end" : "chat-start"; //these for daisy ui sending from us and recieving from other chats design differentiating line
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe? 'bg-blue-500' : "";
  
  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={profilePic}
                 alt="Tailwind CSS chat bubble component"/>


            </div>
        </div>
        <div className={`chat-bubble text-white  ${bubbleBgColor} pb-2`}>{message.message}</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  )
}

export default Message