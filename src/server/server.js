const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const {
  CURRENT_DRAW,
  CHANGE_DRAW,
  CURRENT_PLAYER,
  CHANGE_PLAYER,
  CURRENT_STATE,
  CHANGE_STATE,
  CONNECTION,
  DISCONNECT,
  CLIENT_DISCONNECTING,
  YOUR_INFOR,
  PORT,
  CURRENT_WINNER,
  CHANGE_WINNER,
  CURRENT_ROOM_LIST,
  CHANGE_ROOM_LIST,
} = require("../utils/serverConstants.js");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let roomList = [];

io.on(CONNECTION, (socket) => {
  console.log("conectado");

  io.emit(CURRENT_ROOM_LIST, roomList);

  socket.on(CHANGE_ROOM_LIST, (newRoomList, callback) => {
    roomList = [...roomList, newRoomList];
    io.emit(CURRENT_ROOM_LIST, roomList);
    callback();
  });

  /* 
  //emitir estado inicial
  socket.emit(CURRENT_STATE, gameState);

  //emitir draw inicial
  socket.emit(CURRENT_DRAW, draw);

  //emitir winner
  socket.emit(CURRENT_WINNER, winner);

  // Emitir mudanças no estado jogo para o novo jogador
  socket.on(CHANGE_STATE, (newState) => {
    gameState = newState;
    console.log(gameState, "novo estado");
    io.emit(CURRENT_STATE, gameState);
  });

  socket.on(CHANGE_DRAW, (newDraw) => {
    console.log(newDraw, "draw");
    draw = newDraw;
    io.emit(CURRENT_DRAW, newDraw);
  });

  socket.on(CHANGE_WINNER, (newWinner) => {
    io.emit(CURRENT_WINNER, newWinner);
  });

  // Resertar o estado do jogo quando um jogador se desconectar
  socket.on(DISCONNECT, () => {
    gameState = initialState;
    io.emit(CURRENT_STATE, gameState);
  });

  // Adicionar o jogador que se desconectou de volta ao array de símbolos disponíveis
  socket.on(CLIENT_DISCONNECTING, (arg) => {
    symbolArray = [...symbolArray, arg];
    gameState = initialState;
    io.emit(CURRENT_STATE, gameState);
  });

  // Lidar com a mudança de jogador
  socket.on(CHANGE_PLAYER, (symbol) => {
    currentPlayer = symbol; // Atualizar o jogador atual
    io.emit(CURRENT_PLAYER, currentPlayer); // Emitir o novo jogador para todos os clientes
  });

  // Enviar o jogador atual para o novo cliente
  socket.emit(CURRENT_PLAYER, currentPlayer); */
});

server.listen(PORT, () => {
  console.log(`Servidor online, ${PORT}`);
});
