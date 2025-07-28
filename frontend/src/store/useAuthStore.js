import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { TypeIcon } from "lucide-react";
import axios from "axios";
import { io } from 'socket.io-client'

const BASE_URL= import.meta.env.MODE=== "devlopment" ? 'http://localhost:5000/api':"/"
export const useAuthStore = create((set,get)=>({
  authUser:null,
  isSigningUp:false,
  isLogginingIn:false,
  isUpdatingProfile:false,
  isChecking:true,
  onlineUsers:[],
  socket:null,
checkAuth : async()=>{
try {
  const res = await axiosInstance.get('/auth/check')
  set({authUser: res.data}) 
  get().connectSocket()
} catch (error) {
  console.log('Error message in check auth',error.message)
  set({ authUser : null})
}
finally{
  set({isChecking:false})
}
},

signup: async (data)=>{
  try {
    set ({isSigningUp:true})
    const res=await  axiosInstance.post('/auth/signup',data)
    set({authUser: res.data})
    toast.success('Signup Successfully')
    get().connectSocket()
  } catch (error) {
    toast.error(error.response.data.message)

  }
  finally{
    set({isSigningUp:false})
  }
  
},
logout: async()=>{
  try {
    
    const res = await axiosInstance.get('/auth/logout')
    set({ authUser : null})
    toast.success(res.data)
    get().disConnectSocket()
  } catch (error) {
    toast.error(error.response.data.message)
    console.log(error.message)
  }
},
login:async(data)=>{
  try {
    set({isLogginingIn:true})
    const res= await axiosInstance.post('/auth/login',data)
    set({ authUser: res.data})
    toast.success('Logged in successfully')
    get().connectSocket()
    
  } catch (error) {
    toast.error(error.response.data.message)
    console.log(error.message)
    
  }
  finally{

    set({isLogginingIn:false})
  }
},
updatingProfile:async(data)=>{
  try {
    set({ isUpdatingProfile: true})
    const res = await axiosInstance.put('/auth/update',data)
    set({authUser:res.data})
    toast.success('profile updated successfully')
  } catch (error) {
      console.log(error.message)
      toast.error(error.response.data.messgae)    
  }
  finally{
     set({ isUpdatingProfile:false})
  }

},
connectSocket:()=>{
  const{ authUser} = get()
  if(!authUser || get().socket?.connected ) return;
  const socket = io(BASE_URL,{
    query:{
      userId:authUser._id
    }
  })
   socket.connect()
   set({socket:socket})
   socket.on('getOnlineUsers',(userIds)=>{
      set({ onlineUsers : userIds})
   })
},
disConnectSocket:()=>{
  if(get().socket?.connected) get().socket?.disconnect()
}

}))