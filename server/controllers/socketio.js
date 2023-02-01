// const express = require('express');
// const app = express();
// const http = require('http')
// const server = http.createServer(app)
// const io = require('socket.io')(server, {
//     cors: 'http://localhost:3000/',
//     methods: ["GET", "POST"]

// });


// io.on('connection', (socket) => {
//     console.log('user connected');
//     socket.on('disconect', () => {
//         console.log('user disconnected');
//     })


//     socket.on('chat message', (data) => {
//         // console.log('user connected');
//         console.log(data)
//         socket.emit('message', data)
//     })
// })

// module.exports = io
