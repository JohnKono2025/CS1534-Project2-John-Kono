const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
//used to resolve the path to the static files
const path = require('path');

const { Server } = require("socket.io");
const io = new Server(server);

// Static files from 'www' folder will be served
app.use(express.static(path.join(__dirname, 'www')));

// Default route to serve the index.html file
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