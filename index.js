const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("PlayerMoved", (playerX, playerY, playeroldX, playeroldY, pcr, pcg, pcb) => {
        console.log(socket.id + " mowed from:", playeroldX, playeroldY, " to ", playerX , playerY, " RGB ", pcr, pcg, pcb);

        socket.broadcast.emit("PlayerMoved_S", playerX, playerY, playeroldX, playeroldY, pcr, pcg, pcb);
    });

    socket.on("PlayerCollision", (playerX, playerY, pcr, pcg, pcb, ext_playerX, ext_playerY, ext_pcr, ext_pcg, ext_pcb) => {
        console.log(playerX, playerY, pcr, pcg, pcb, " Collised to ", ext_playerX, ext_playerY, ext_pcr, ext_pcg, ext_pcb);
        socket.broadcast.emit("PlayerCollision_S", ext_playerX, ext_playerY, ext_pcr, ext_pcg, ext_pcb);
    });
});



server.listen(3000, () => {
    console.log("Listening *:3000");
});