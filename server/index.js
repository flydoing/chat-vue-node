// Setup basic express server
var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);

// 链接数据库并初始化
// const db = require('./db')
const api = require('./api')
api(app)

http.listen(8081, function () {
  console.log('Server listening at port 8081');
});

var chat = {}

io.on('connection', function(socket){
  console.log('center.vue connection')
  // room join

  // socket.on('userJoining', function (data) {
  //   console.log('userJoining')
  //   chat = data
  //   socket.account = chat.account
  //   socket.nickName = chat.nickName
  //   socket.broadcast.emit('userJoined', chat)
  //   // io.sockets.emit('userJoined', {chat})
  // })
  socket.on('joinToRoom', function (data) {
    console.log('joinToRoom')
    chat = data
    socket.account = chat.account
    socket.nickName = chat.nickName
    let roomGroup = chat.chatToGroup
    socket.join(roomGroup)
    // socket.broadcast.emit('userJoined', chat)
    io.sockets.in(roomGroup).emit('joinToRoom', chat)
    // io.sockets.emit('userJoined', {chat})
  })
  socket.on('leaveToRoom', function (data) {
    console.log('leaveToRoom')
    chat = data
    socket.account = chat.account
    socket.nickName = chat.nickName
    let roomGroup = chat.chatToGroup
    socket.leave(roomGroup);
    // socket.broadcast.emit('userJoined', chat)
    io.sockets.in(roomGroup).emit('leaveToRoom', chat)
    // io.sockets.emit('userJoined', {chat})
  })

  socket.on('disconnect', function () {
    console.log('one disconnect')
    chat = {
      account: socket.account,
      nickName: socket.nickName,
      chatTime: Date.parse(new Date()),
      chatMes: 'off-line',
      chatToId: 401,
      chatType: 'tips'     // chat/tips
    }
    socket.broadcast.emit('userQuit', chat);
  })
  // 接收消息
  socket.on('emitChat', function (data) {
    chat = data
    console.log(chat)
    let roomGroup = chat.chatToGroup
    socket.in(roomGroup).emit('broadChat', chat)
  })
});


