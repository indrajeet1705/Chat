import jwt from 'jsonwebtoken'

const generateToken= async (userId,res)=>{
  try {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
      expiresIn:'7d'
    })

    res.cookie('jwt',token,{
      maxAge:7 * 24 * 60 * 60 * 1000,
      httpOnly:true, 
      sameSite:'strict',
      secure: process.env.NODE_ENV !== 'devlopment'
    })

    return token
  
  } catch (error) {
    console.log('error message',error.message)
    res.status(400).json({message:'something went wrong'})
  }
}
export default generateToken