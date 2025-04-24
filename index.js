const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const hostname ="127.0.0.1";
const port = 3000;

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

  

server.listen(port,hostname, () => {
  console.log('Listening on 127.0.0.1:3000');
});