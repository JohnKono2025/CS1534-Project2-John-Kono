const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const path = require('path');

const { Server } = require("socket.io");
const io = new Server(server);


app.use(express.static(path.join(__dirname, 'www')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'www', 'index.html'));
});

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

  

server.listen(3000, () => {
  console.log('listening on *:3000');
});