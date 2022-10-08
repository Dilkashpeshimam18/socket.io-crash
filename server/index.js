const express=require('express')
const app=express()
const http=require('http')
const {Server}=require('socket.io')
const cors=require('cors')

//middleware
app.use(cors())

//creating http server of our app
const server=http.createServer(app)


//Creating instance of socket.io and conecting to our server
const io=new Server(server,{
    cors:{
        origin:'https://localhost:3000',
        methods:["GET","POST"]
    }
})

server.listen(3001,()=>{
    console.log('SERVER RUNNING')
})
