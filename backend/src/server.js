import express, { urlencoded } from 'express'
import authRouter from './routes/auth.route.js'
import dotenv from 'dotenv'
import connectDb from './lib/db.js'
import messageRouter from './routes/message.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { app ,server} from './lib/socket.js'
import path from 'path'
dotenv.config()



const PORT = process.env.PORT
const __dirname=path.resolve()
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))
app.use(express.json({limit:"10mb"}))
app.use(urlencoded({limit:'10mb',extended:true}))
app.use(cookieParser())
app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)

if( process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))
  app.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  })
}


server.listen(PORT,async ()=>{
  await connectDb()
  console.log ("server is listining on port",PORT )
})