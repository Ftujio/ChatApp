const socket = io();

const chatForm = document.querySelector('#chat-form');
const messageInput = document.querySelector('#message-input');
const nameInput = document.querySelector('#name-input');
const sendButton = document.querySelector('#send-button');
const messageList = document.querySelector('#messages');
const colors = ['#0066ff', '#cc33ff', '#cc0000', '#e65c00', '#5353c6'];
const color = colors[Math.floor(Math.random() * colors.length)];

chatForm.onsubmit = (e) => {
  e.preventDefault();
  if(messageInput.value && nameInput.value) {
    socket.emit('chat message', { name: nameInput.value, message: messageInput.value});
  }
}

socket.on('chat message', (message) => {
  let liElement = document.createElement('li');
  liElement.innerHTML = '<span class="user-name" style="color: ' + color + '">' + message.name + ': ' + '</span>' + message.message;
  messageList.appendChild(liElement);
});
