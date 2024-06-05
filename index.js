const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
dotenv.config();
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const connect = require('./config/database-config');

const Chat = require('./models/chats');


io.on('connection', (socket) => {
  // console.log('a user connected', socket.id);

  socket.on('join_room', (data) => {
    socket.join(data.roomId);
    console.log('user joined room', data.roomId);
  });


  socket.on('msg_send',async (data) => {
    console.log(data);
    // io.emit('msg_rcvd', data);
    const chat = await Chat.create({
      content: data.msg,
      user1: data.username,
      roomId: data.roomId,
      
    });
    io.to(data.roomId).emit('msg_rcvd', data);

  });

  socket.on('typing', (data) => {
    socket.broadcast.to(data.roomId).emit('someone_typing');
  });

});

app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));

app.get('/chat/:roomId',async (req, res) => {
  const chats = await Chat.find({roomId:req.params.roomId}).select('content user1');
  res.render('index', {
    name: 'shubham',
    id: req.params.roomId,
    chats: chats,
    
  });

});

server.listen(3000, async () => {
  console.log('server started');
  await connect();
  console.log('mongodb connected ')
});