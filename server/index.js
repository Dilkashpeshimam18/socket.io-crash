const express=require('express')
const app=express()
const http=require('http')
const {Server}=require('socket.io')
const cors=require('cors')

//middleware
app.use(cors())

//creating http server of our app
const server=http.createServer(app)

app.get('/', (req, res) => {
    res.json({
      message: 'Hello world',
    });
  });


//Creating instance of socket.io and conecting to our server
const io=new Server(server,{
    cors:{
        origin:'https://localhost:3000',
        methods:["GET","POST"],
    }
})

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
  
    // We can write our socket event listeners  here...
  
    socket.on("join_room",(data)=>{
        socket.join(data)
    })
    socket.on("send_message",(data)=>{
        // socket.broadcast.emit("receive_message", data)
        socket.to(data.room).emit("receive_message", data)
    })
  });

server.listen(3001,()=>{
    console.log('SERVER RUNNING')
})
