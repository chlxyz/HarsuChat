const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on('sendMessage', (message)=>{
        io.emit('sendMessage', message);
    });
});

const port = 3000;

server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});