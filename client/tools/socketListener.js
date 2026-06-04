const { io } = require('socket.io-client');

const socket = io('http://localhost:5000');

console.log('Connecting to socket server...');

socket.on('connect', () => {
  console.log('Connected as', socket.id);
});

socket.on('postCreated', (data) => {
  console.log('[event] postCreated', data);
});

socket.on('postUpdated', (data) => {
  console.log('[event] postUpdated', data);
});

socket.on('postDeleted', (id) => {
  console.log('[event] postDeleted', id);
});

socket.on('postLiked', (data) => {
  console.log('[event] postLiked', data);
});

socket.on('disconnect', () => {
  console.log('Disconnected');
});
