import React, { useState } from 'react'
import { TiArrowRepeat } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { json } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';


const useSignup = () => {
  const [loading,setLoading]=useState(false);
  const {setAuthUser}=useAuthContext();

  const signup= async ({fullname,username,password,confirmPassword,gender})=>{
     const success = handleInputErrors({fullname,username,password,confirmPassword,gender})
     if(!success)  return ;


     setLoading(true)
     try{
       const res = await fetch("/api/auth/signup",{
        method:"POST",
        headers:{ "Content-Type" : "application/json"},
        body: JSON.stringify({fullname,username,password,confirmPassword,gender})
       })

       const data = await res.json();
       if(data.error){
        throw new Error(data.error)
       }
      // the signed use save in localstorage using context 

      localStorage.setItem("chat-user",JSON.stringify(data))   //data is the response from backend and save in localstorage which is parse at Authcontext.jsx
      //update the context  (setAuthUser) with the data

      setAuthUser(data)



    }
     catch(error){
        toast.error(error.message)
    } finally{
        setLoading(false)
    }

  }
  return {loading,signup};
}



export default useSignup;

function handleInputErrors({fullname,username,password,confirmPassword,gender}){
    if(!fullname || !username || !password || !confirmPassword || !gender){
        toast.error("Please fill all fields.")
        return false;

    }

    if(password!== confirmPassword){
        toast.error("Password do not watch.")
        return false;

    }

    if(password.length < 6){
        toast.error("Password must be atleast 6 characters.")
        return false;

    }

    return true;
}