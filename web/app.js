const express = require('express')
const router = require('./router');

const app = express()

app.use('/css/',express.static('./css/'));

app.use(router)

app.use(function(err,req,res,next){
  console.error(err);
  res.status(500).send('Something broke');
});

app.listen(5000,() => {
  console.log('listening on *:5000');
})