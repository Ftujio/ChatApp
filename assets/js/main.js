const socket = io();

const chatForm = document.querySelector('#chat-form');
const messageInput = document.querySelector('#message-input');
const nameInput = document.querySelector('#name-input');
const sendButton = document.querySelector('#send-button');
const messageList = document.querySelector('#messages');
const colors = ['#0066ff', '#cc33ff', '#cc0000', '#e65c00', '#5353c6', '#00e6e6', '#99cc00', '#00cc00', '#ffff00'];
const color = colors[Math.floor(Math.random() * Math.floor(colors.length))];
let name = localStorage.getItem('userName');

if(name) {
  nameInput.value = name;
}

chatForm.onsubmit = (e) => {
  e.preventDefault();
  if(messageInput.value && nameInput.value) {
    name = nameInput.value;
    localStorage.setItem('userName', name);
    socket.emit('chat message', { name: name, message: messageInput.value, color: color });
    messageInput.value = '';
  }
}

socket.on('new message', (message) => {
  let liElement = document.createElement('li');
  liElement.innerHTML = '<span class="user-name" style="color: ' + message.color + '">' + message.name + ': ' + '</span>' + message.message;
  messageList.appendChild(liElement);
});

socket.on('user joined', (users) => {
  // console.log(users);
  // users.find(user => user)
});
