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

var userNumber = 0
var chat = {}


io.on('connection', function(socket){
  console.log('center.vue connection')
  // room join

  socket.on('userJoining', function (data) {
    console.log('userJoining')
    ++userNumber
    console.log(userNumber)
    chat = data
    socket.account = chat.account
    socket.nickName = chat.nickName
    socket.broadcast.emit('userJoined', chat)
    // io.sockets.emit('userJoined', {chat})
  })
  socket.on('disconnect', function () {
    console.log('one disconnect')
    --userNumber
    console.log(userNumber)
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
    socket.broadcast.emit('broadChat', chat)
  })
});


