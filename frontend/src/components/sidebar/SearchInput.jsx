import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../Hooks/useGetConversations';
import toast from 'react-hot-toast';


const SearchInput = () => {
  const [search,setSearch]=useState("");
  const {setSelectedConversation}=useConversation();
  const {conversations}=useGetConversations();
  
  const handleSubmit= async(e)=>{
    e.preventDefault();
    if(!search) return;

    if(search.length<3){
      return toast.error('Search term must be atleast 3 characters long')
    }
    //search algorithm input search (characters) which matched the name in the chatlist so we used to convert it to all lowercase
    
    const conversation = conversations.find((c)=> c.fullname.toLowerCase().includes(search.toLowerCase()));//conversations array we find each conversation fullname match with search
    if(conversation){
      setSelectedConversation(conversation)
      setSearch("")
    }
    else toast.error("No Such User Found");
  }

  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
        <input type='text' placeholder='Search' className='input input-bordered rounded-full' value={search} 
        onChange={(e)=>setSearch(e.target.value)}/>
        <button type="submit" className='btn btn-circle bg-sky-500 text-white'>
            <IoSearchSharp className='w-6 h-6 outline-none'/>
        </button>
    </form>
  )
}

export default SearchInput;

//STARTER CODE OF THIS FILE
// import React from 'react'
// import { IoSearchSharp } from "react-icons/io5";


// const SearchInput = () => {
//   return (
//     <form className='flex items-center gap-2'>
//         <input type='text' placeholder='Search' className='input input-bordered rounded-full'/>
//         <button type="submit" className='btn btn-circle bg-sky-500 text-white'>
//             <IoSearchSharp className='w-6 h-6 outline-none'/>
//         </button>
//     </form>
//   )
// }

// export default SearchInput;