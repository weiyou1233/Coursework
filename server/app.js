const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session');
const router = require('./router');

const app = express()

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 60000000 }
}))

app.use(router)

app.listen(3000,() => {
  console.log("app is runing at port 3000");
})