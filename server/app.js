const express = require('express')
const bodyParser = require('body-parser');
const router = require('./router');


const app = express()

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type, Authorization");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


app.use(router)

app.listen(3000,() => {
  console.log("app is runing at port 3000");
})