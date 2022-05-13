const express = require('express')
const router = require('./router');

const app = express()

app.use('/css/', express.static('./css/'));
app.use('/node_modules/', express.static('./node_modules/'));


app.use('/sw.js', express.static('./sw.js'));
app.use('/indexedDB.js', express.static('./indexedDB.js'));

app.use(router)

app.use(function(err,req,res,next){
  console.error(err);
  res.status(500).send('Something broke');
});

app.listen(5000,() => {
  console.log('listening on *:5000');
})