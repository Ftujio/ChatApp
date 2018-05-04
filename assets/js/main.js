const socket = io();

const chatForm = document.querySelector('#message-input');
let sendButton = document.querySelector('#send-button');
let messageList = document.querySelector('#messages');

sendButton.onclick = () => {
  socket.emit('chat message', chatForm.value);
}

socket.on('chat message', (message) => {
  let liElement = document.createElement('li');
  liElement.innerHTML = message;
  messageList.appendChild(liElement);
});
