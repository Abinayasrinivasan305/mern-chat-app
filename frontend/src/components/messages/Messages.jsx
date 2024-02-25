import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../Hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton';

const Messages = () => {
  const {loading,messages}=useGetMessages();
  const lastMessageRef=useRef();

  //for automatic scrolling to end of the chats
  useEffect(()=>{
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({ behaviour: "smooth"})
    },100)
  },[messages])
  return (
    <div className='px-4 flex-1 overflow-auto'>
        {!loading && messages.length>0 && messages.map((message)=>
        (<div key={message._id} ref={lastMessageRef}>
          <Message  message={message}/>
         </div>))}
        {loading && [...Array(3)].map((_,idx)=> <MessageSkeleton key={idx}/>)} {/* if its loading the message skeleton three time loop and map*/}

        {!loading && messages.length === 0 && (
          <p className='text-center'>Send a message to start the conversation</p>
        )}
    </div>
  )
}

export default Messages