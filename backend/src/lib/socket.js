import { Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app= express()

const server= http.createServer(app)

const io = new Server(server,{
  cors:{
    origin:['http://localhost:5173']
  }
})
export function getReciverSocketId (userId){
  return socketMap[userId]

}

const socketMap={}
io.on('connection',(socket)=>{
  console.log('a user connected',socket.id)
  const userId = socket.handshake.query.userId
   if ( userId) socketMap[userId]= socket.id;
   io.emit('getOnlineUsers',Object.keys(socketMap))
  socket.on('disconnect',()=>{
    console.log('a user dissconnect:', socket.id)
    delete socketMap[userId]
    io.emit('getOnlineUsers',Object.keys(socketMap))
  })
})


export { io,server,app }