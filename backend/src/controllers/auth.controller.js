import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import generateToken from '../lib/utils.js'
import cloudinary from '../lib/cloudinary.js'
const signup= async (req,res)=>{
const{ name, email,password} =req.body 
  try {
    console.log(req.body)
    if( !name || !email || !password ){
      return res.status(400).json({message:'Missing Details'})
    }
    if( password.length < 6){
      return res.status(400).json({message:'password must be of 6 characters'})
    }
    const salt = await bcrypt.genSalt(10)
    const hash_password= await bcrypt.hash(password,salt)

    const user = await User.findOne({email})
    if(user){
      return res.status(400).json({message:'User with this email allready exists'})
    }
    const newUser= new User({
      name,
      email,
      password:hash_password
    })

    if ( newUser){
      //generate token by id 
      await generateToken(newUser._id,res)
      await newUser.save()
      res.status(200).json({
        id:newUser._id,
        name:newUser.name,
        email:newUser.email,
        password:newUser.password,
      })

    }
    else{
      return res.status(400).json({message:'Invalid user Data'})
    }
    
  
} catch (error) {
  
}

}

const login= async (req,res)=>{
  const {email,password}= req.body
try {
  if( !email || !password){
    return res.status(400).json({message:'missing details'})
  }
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({message:'Invalid credentials'})
    }
   const isCorrect= await bcrypt.compare(password,user.password)
   if( !isCorrect){
    return res.status(400).json({message:'Invalid Credentials'})
   }
   await generateToken( user._id,res)
   res.status(200).json({
    name:user.name,
    email:user.email,
    profilePic:user.profilePic

   })
} catch (error) {
  console.log('error message',error.message)
}

}

const logout = async (req,res)=>{
  try {
      res.cookie('jwt','',{maxAge:0}) 
      res.status(200).json({message:'Successfully logout '})
  } catch (error) {
    console.log('error message',error.message)
    res.status(500).json({message:'Internal server Error'})
  }
}
const update= async(req,res)=>{
  try {
    const {profilePic}= req.body
    const userId = req.user._id

    if(!profilePic){
      res.status(400).json({message:'Profile picture is required'})
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const imageUrl = uploadResponse.secure_url
    const updatedUser = await User.findByIdAndUpdate( userId, {profilePic:imageUrl})
    if(!updatedUser){
      return res.status(400).json({message:'Something went wrong while updating user'})
    }
    res.status(200).json(updatedUser)

  } catch (error) {
   console.log(error.message)
   res.status(500).json({message:'Internal server Error'}) 
  }
}
const checkAuth = async(req,res)=>{
try {
  res.status(200).json(req.user)
} catch (error) {
console.log('error message',error.message)
res.status(500).json('Internal server Error')  
}
}
export { signup,login,logout,update,checkAuth}