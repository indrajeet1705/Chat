import mongoose from 'mongoose'

const connectDb = async ( )=>{
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`database connected : ${conn.connection.host}`)
  } catch (error) {
    console.log(error.message)
  }
}
export default connectDb