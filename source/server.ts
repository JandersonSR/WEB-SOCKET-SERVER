import express from 'express';
const WebSocket = require('ws')
const appWs = require('./app-ws');

const server = express()
server.use(express.json())

server.listen(3000, 'localhost', () =>{
  console.log('server is runing')
})

let sockets = []

function onError(ws, err) {
  console.error(`onError: ${err.message}`);
}

function onMessage(ws, data) {
  console.log(`onMessage: ${data}`);
  ws.send(Buffer.from(data).toString());
}

const ws = new WebSocket.Server({ port: 8080 })
ws.on('connection', function(socket) {
  sockets.push(socket)



  socket.on('message', data => onMessage(socket, data));
  socket.on('error', error => onError(socket, error));

  // console.log(`onConnection`);

  // console.log('conectou', socket)

  // socket.on('message', function(msg) {
  //   sockets.forEach(s => s.send(msg));
  //   console.log('mensagem', Buffer.from(msg).toString())
  //   // socket.send(Buffer.from(msg).toString())
  // });

  socket.on('close', function() {
    console.log('desligando')
    sockets = sockets.filter(s => s !== socket);
  });

})
