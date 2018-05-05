const express = require('express');
const app = express();
const server = app.listen(3000, () => {
  console.log('listening on *:3000');
});
const io = require('socket.io').listen(server);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('assets'));

io.on('connection', (socket) => {
  console.log('user ', socket.id, ' connected');

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log('user ', socket.id, ' disconnected');
  });
});
