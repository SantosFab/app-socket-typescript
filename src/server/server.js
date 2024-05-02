const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const {
  CONNECTION,
  DISCONNECT,
  CURRENT_PLAYER,
  CURRENT_STATE,
  CHANGE_PLAYER,
  CHANGE_STATE,
  PORT,
  YOUR_INFOR,
  CLIENT_DISCONNECTING,
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
let gameState = Array(9).fill("y");
let currentPlayer = "X"; // Iniciar com o jogador "X"

io.on(CONNECTION, (socket) => {
  console.log("conectado");

  if (symbolArray.length > 0) {
    const firstElement = symbolArray[0];
    symbolArray = symbolArray.slice(1);
    socket.emit(YOUR_INFOR, socket.id, firstElement);
  } else {
    socket.emit(YOUR_INFOR, "Aguarde até que um usuário saia do sistema");
  }

  // Emitir o estado inicial do jogo para o novo jogador
  socket.on(CHANGE_STATE, () => {
    socket.emit(CURRENT_STATE, gameState);
  });

  // Resertar o estado do jogo quando um jogador se desconectar
  socket.on(DISCONNECT, () => {
    gameState = Array(9).fill("");
    io.emit(CURRENT_STATE, gameState);
  });

  // Adicionar o jogador que se desconectou de volta ao array de símbolos disponíveis
  socket.on(CLIENT_DISCONNECTING, (arg) => {
    symbolArray = [...symbolArray, arg];
  });

  // Lidar com a mudança de jogador
  socket.on(CHANGE_PLAYER, (symbol) => {
    currentPlayer = symbol; // Atualizar o jogador atual
    io.emit(CURRENT_PLAYER, currentPlayer); // Emitir o novo jogador para todos os clientes
  });

  // Enviar o jogador atual para o novo cliente
  socket.emit(CURRENT_PLAYER, currentPlayer);
});

server.listen(PORT, () => {
  console.log(`Servidor online, ${PORT}`);
});
