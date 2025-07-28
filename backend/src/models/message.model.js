import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({

  senderId:{
    type:String,
    require:true,
    ref:"User"

  },
  reciverId:{
    type:String,
    require:true,
    ref:"User"
  },
  text:{
    type:String,
  },
  image:{
    type:String,

  },
},{timestamps:true})

const Message = mongoose.model('Message',messageSchema)
export default Message