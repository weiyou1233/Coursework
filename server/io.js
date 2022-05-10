const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: true });

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.id);
  console.log(socket.handshake.query.storyId);
  console.log(socket.handshake.auth.token);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat', function(msg){
    console.log('message: ' + msg);
    io.emit('chat', msg);
  });
});

http.listen(4000, () => {
  console.log('listening on *:4000');
});