const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const {
  state,
  connection,
  disconnect,
  clientDisconnecting,
  YourInfor,
  PORT,
  CurrentPlayer,
} = require("../utils/serverConstants.js");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let symbolArray = ["X", "0"];
let gameState = Array(9).fill("");
let playerSymbol = "X";

io.on(connection, (socket) => {
  console.log("conectado");
  if (symbolArray.length > 0) {
    const firstElement = symbolArray[0];
    symbolArray = symbolArray.slice(1);
    socket.emit(YourInfor, socket.id, firstElement);
  } else {
    socket.emit(YourInfor, "Aguarde até que um usuário saia do sistema");
  }
});

//initialState
io.on(connection, (socket) => {
  socket.emit(state, gameState);
});

//resertar state
io.on(connection, (socket) => {
  socket.on(disconnect, () => {
    gameState = Array(9).fill("");
    io.emit(state, gameState);
  });
});

//resertar array
io.on(connection, (socket) => {
  socket.on(clientDisconnecting, (arg) => {
    symbolArray = [...symbolArray, arg];
  });
});

//próximo a jogar
io.on(connection, (socket) => {
  socket.emit(CurrentPlayer, playerSymbol);
});

server.listen(PORT, () => {
  console.log(`Servidor online, ${PORT}`);
});
