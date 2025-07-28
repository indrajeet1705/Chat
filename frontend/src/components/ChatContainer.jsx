import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import { useAuthStore } from '../store/useAuthStore'
import { messageDateFormat } from '../lib/utils'

const ChatContainer = () => {
const { getMessages,messages,selectedUser,isLoadingMessages,subscribeToMessage,unsubscribeToMessage}= useChatStore()
const {authUser}= useAuthStore()
useEffect(()=>{
  getMessages(selectedUser._id)
  subscribeToMessage()
  return ()=>unsubscribeToMessage()
},[ selectedUser._id,getMessages,subscribeToMessage,unsubscribeToMessage])
if( isLoadingMessages) return <div>Loading...</div>
  return (
    <div className=' flex flex-1  overflow-hidden flex-col'>
      <ChatHeader></ChatHeader>
      <div className=' flex-1 overflow-y-auto p-4 space-y-4 '>
        {
          messages.map((message)=>{
          return (
            <div 
            key={message._id}
            className={`chat ${ message.senderId===authUser._id ? "chat-end":"chat-start"}`}>
              <div className=' chat-image avatar'>
                <div className=' rounded-full size-10 border'>
                  <img src={ message.senderId === authUser._id ? authUser.profilePic || "/avatar.jpg" : selectedUser.profilePic || "/avatar.jpg"} alt=" " />
                </div>

              </div>
              <div className=' chat-header mb-1'>
                <time className=' ml-1 opacity-45 text-sm'>{messageDateFormat(message.createdAt)}</time>

              </div>
              <div className=' flex chat-bubble flex-col'>
                { message.image && (
                  <img src={message.image} alt="image" className=' mb-2 rounded-md sm:max-w-[200px]' />
                )}
                {
                  message.text && (
                    <p>{message.text}</p>
                  )
                }
              </div>
            </div>
          )
          })
        }
      </div>
      <MessageInput></MessageInput>
    </div>
  )
}

export default ChatContainer
