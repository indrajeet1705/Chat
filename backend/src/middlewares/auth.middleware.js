import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const protectRoute= async( req,res,next)=>{
  try {
    const token = req.cookies.jwt
    if(! token ){
      return res.status(400).json({message:'Unautherised user '})
    }
    const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
    if(!tokenDecode){
      return res.status(400).json({message:'Unautherised user'})
    }
    const userId= tokenDecode.userId
    const user = await User.findById(userId).select('-password')
    if(!user){
      return res.status(400).json({message:'Unautherised user'})

    }
      req.user=user
   next()
  } catch (error) {
    console.log('Error message',error.message)
    
  }
}

export default protectRoute