const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const {
  connection,
  disconnect,
  clientDisconnecting,
  YourInfor,
  state,
  PORT,
  CurrentPlayer,
  ChangePlayer,
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
let currentPlayer = "X"; // Iniciar com o jogador "X"

io.on(connection, (socket) => {
  console.log("conectado");

  if (symbolArray.length > 0) {
    const firstElement = symbolArray[0];
    symbolArray = symbolArray.slice(1);
    socket.emit(YourInfor, socket.id, firstElement);
  } else {
    socket.emit(YourInfor, "Aguarde até que um usuário saia do sistema");
  }

  // Emitir o estado inicial do jogo para o novo jogador
  socket.emit(state, gameState);

  // Resertar o estado do jogo quando um jogador se desconectar
  socket.on(disconnect, () => {
    gameState = Array(9).fill("");
    io.emit(state, gameState);
  });

  // Adicionar o jogador que se desconectou de volta ao array de símbolos disponíveis
  socket.on(clientDisconnecting, (arg) => {
    symbolArray = [...symbolArray, arg];
  });

  // Lidar com a mudança de jogador
  socket.on(ChangePlayer, (symbol) => {
    currentPlayer = symbol; // Atualizar o jogador atual
    io.emit(CurrentPlayer, currentPlayer); // Emitir o novo jogador para todos os clientes
  });

  // Enviar o jogador atual para o novo cliente
  socket.emit(CurrentPlayer, currentPlayer);
});

server.listen(PORT, () => {
  console.log(`Servidor online, ${PORT}`);
});
