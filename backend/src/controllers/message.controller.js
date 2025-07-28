import cloudinary from "../lib/cloudinary.js"
import { getReciverSocketId } from "../lib/socket.js"
import Message from "../models/message.model.js"
import User from "../models/user.model.js"
import { io } from "../lib/socket.js"
const getAlluser= async (req,res)=>{
  try {
    const loggedInUserId= req.user._id
    
    const fillteredUsers = await User.find({_id:{ $ne : loggedInUserId }}).select('-password')
    if(!fillteredUsers){
      return res.status(400).json({message:"Can't fetch users"})
    }
    res.status(200).json({fillteredUsers})

  } catch (error) {
    console.log('Error message',error.message)
    res.status(500).json({message:'Internal server Error'})
  }
}

const getMessages = async( req,res)=>{
  try {
    const { id :userToChatId} = req.params
    const  myId = req.user._id
    const messages = await Message.find({
      $or:[
        { senderId:myId , reciverId:userToChatId},
        { senderId:userToChatId,reciverId:myId}
      ]
    })
    res.status(200).json(messages)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:'Internal server Error'})
  }
}
const sendMessage = async (req,res)=>{
  try {
    const { text ,image} = req.body
    
    const reciverId= req.params.id
    const senderId= req.user._id
    let imageUrl;
    if(image){
      const uploadResponse= cloudinary.uploader.upload(image)
       imageUrl= (await uploadResponse).secure_url
    }
     const newMessage = await Message({
      senderId,
      reciverId,
      text,
      image:imageUrl

     })
     await newMessage.save()
     const reciverSocketId = getReciverSocketId(reciverId)
     if(reciverSocketId){
      io.to(reciverSocketId).emit('newMessage',newMessage)
     }
      res.status(200).json(newMessage)

  } catch (error) {
    console.log('Error message',error.message)
    res.status(500).json('Internal server error')
  }
}
export { getAlluser,getMessages,sendMessage}