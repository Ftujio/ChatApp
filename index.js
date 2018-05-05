const express = require('express');
const app = express();
const server = app.listen(3000, () => {
  console.log('listening on *:3000');
});
const io = require('socket.io').listen(server);

let connections = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('assets'));

io.on('connection', (socket) => {
  console.log('user ', socket.id, ' connected');
  connections.push(socket);
  console.log(connections.map(connection => connection.id));

  socket.on('chat message', (message) => {
    io.emit('new message', message);
  });

  socket.on('disconnect', () => {
    console.log('user ', socket.id, ' disconnected');
    connections.splice(connections.indexOf(socket), 1);
    console.log(connections.map(connection => connection.id));
  });
});
