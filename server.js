const express = require('express');
const cors = require('cors');

const app= express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
});

app.get('/', (req, res) => {
  res.send('Hello world!')
})

let userList = new Map();

io.on('connection', (socket) => {
  let userName = socket.handshake.query.userName;
  addUser(userName, socket.id);
  emitUserList(socket);

  socket.on('message', message => {
    socket.broadcast.emit('message-broadcast', {message, userName});
  })

  socket.on('disconnected', reason => {
    console.log(userName, ' is disconnected');
    removeUser(userName, socket.id);
    emitUserList(socket);
  })
})

function addUser(userName, id) {
  if (!userList.has(userName)) {
    userList.set(userName, new Set(id));
  } else {
    userList.get(userName).add(id);
  }
}

function removeUser(userName, id) {
  if (userList.has(userName)) {
    let userIds = userList.get(userName);
    if (userIds.size === 0) {
      userList.delete(userName);
    }
  }
}

function emitUserList(socket) {
  socket.broadcast.emit('user-list', [...userList.keys()]); // broadcast: to all connected users
  socket.emit('user-list', [...userList.keys()]); // to current user
}

http.listen(3000, () => {
  console.log('Server is running');
})
