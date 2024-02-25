import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast';

const useGetMessages = () => {
  const [loading,setLoading]=useState(false)
  const {messages,setMessages,selectedConversation}=useConversation();
  
  useEffect(()=>{
    const getMessages = async ()=>{
        setLoading(true)
        try{
            const res= await fetch(`/api/messages/${selectedConversation._id}`)
            const data=await res.json();
            if(data.error) throw new Error(data.error)

            setMessages(data)

        }catch(error){
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    if(selectedConversation?._id) getMessages();   //sometimes selectedconversation null if u put qn mark the application not break

  },[selectedConversation?._id,setMessages]) ;  //selected conversation change it run useEffect onetime
  return {loading,messages}
}

export default useGetMessages