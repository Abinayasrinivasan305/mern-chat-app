import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../Hooks/useGetConversations';
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = () => {
const {loading,conversations} = useGetConversations();
console.log("CONVERSATIONS: ",conversations)
  return (
    <div className='py-2 flex flex-col overflow-auto '>
        {conversations.map((conversation,idx) =>(
          <Conversation key={conversation._id} conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length-1}/>                       //reason of getting last index the last person has not divider
        ))}
      
        {loading? <span className='loading loading-spinner mx-auto'></span>: null}
    </div>
  )
}

export default Conversations;



//sTARTER CODE OF THIS FILE
// import React from 'react'
// import Conversation from './sidebar/Conversation'

// const Conversations = () => {
//   return (
//     <div className='py-2 flex flex-col overflow-auto '>
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
//     </div>
//   )
// }

// export default Conversations;