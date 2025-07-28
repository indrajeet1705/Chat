import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore.js";


export const useChatStore = create((set,get) => ({
  isLoadingUsers: false,
  messages: [],
  users: [],
  selectedUser: null,
  isLoadingMessages: false,

  getUsers: async () => {
    try {
      set({ isLoadingUsers: true })
      
      const res = await axiosInstance('/message/users')
     
      set({ users: res.data.fillteredUsers })

    } catch (error) {
      console.log(error.message)
      toast.error(error.response.data.message)
    }
    finally {
      set({ isLoadingUsers: false })

    }
  },
  getMessages: async (userId) => {
    try {
      set({ isLoadingMessages: true })
      const res = await axiosInstance(`/message/${userId}`)
      set({ messages: res.data })
    } catch (error) {
      console.log(error.message)
      toast.error(error.response.data.messgae)
    }
    finally {
      set({ isLoadingMessages: false })
    }
  },
  sendMessage:async(messageData)=>{
    const { messages, selectedUser} = get()
    console.log(messageData)
    try {
      console.log(selectedUser._id)
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)
      set({ messages: [...messages,res.data]})
    } catch (error) {
      toast.error( error.response.data.message)
      
    }
  },
  setSelectedUser: ( selectedUser)=>{set({selectedUser})},
  subscribeToMessage:()=>{
  
    const  {selectedUser} =get()
    if(!selectedUser) return;
    const  socket = useAuthStore.getState().socket;
    
    socket.on('newMessage',(newMessage)=>{
      if(newMessage.senderId !== selectedUser._id) return ;
      set({ messages:[...get().messages,newMessage]})
    })

    
  },
  unsubscribeToMessage:()=>{
    const socket = useAuthStore.getState().socket
    socket.off('newMessage')
  }

}))