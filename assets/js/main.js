const socket = io();

const chatForm = document.querySelector('#chat-form');
const messageInput = document.querySelector('#message-input');
const nameInput = document.querySelector('#name-input');
const sendButton = document.querySelector('#send-button');
const messageList = document.querySelector('#messages');
const colors = ['#0066ff', '#cc33ff', '#cc0000', '#e65c00', '#5353c6', '#00e6e6', '#99cc00', '#00cc00', '#ffff00'];
const color = colors[Math.floor(Math.random() * Math.floor(colors.length))];
let name = localStorage.getItem('userName');
let loadedMessaged = false;

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

socket.on('messages', (messages) => {
  if(!loadedMessaged) {
    messages.forEach(message => {
      appendMessage(message);
    });
    loadedMessaged = true;
  }
});

socket.on('new message', (message) => {
  appendMessage(message);
});

socket.on('user joined', (users) => {
  // console.log(users);
  // users.find(user => user)
});

function appendMessage(message) {
  let liElement = document.createElement('li');
  liElement.innerHTML = '<span class="user-name" style="color: ' + message.color + '">' + encodeHTML(message.name) + ': ' + '</span>' + encodeHTML(message.message);
  messageList.appendChild(liElement);
}

function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}
