const express = require('express')
const bodyParser = require('body-parser');
const router = require('./router');

const app = express()

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({limit : "210000000000kb"}));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type, Authorization");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(router)

app.use(function(err,req,res,next){
  res.status(500).json({
    err_code: 500,
    message: 'Server Error'
  })
});

const Server = require("http").Server(app);
const io = require("socket.io")(Server, { cors: true });

io.on('connection', (socket) => {
  console.log('a user connected');
  let storyId = socket.handshake.query.storyId
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on(`${storyId}`, function(msg){
    console.log('message:'+ msg);
    io.emit(`${storyId}`, msg);
  });
});

Server.listen(3000,() => {
  console.log('listening on *:3000');
})