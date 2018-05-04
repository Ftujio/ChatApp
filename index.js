const express = require('express');
const app = express();
const http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('assets'));

app.listen(3000, () => {
  console.log('listening on *:3000');
});
