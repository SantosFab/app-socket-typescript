const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const {
  CURRENT_ROOM_LIST,
  CHANGE_ROOM_LIST,
  CHANGE_INIT_GAME,
  CONNECTION,
  PORT,
  CURRENT_STATE_GAME,
  CHANGE_STATE_GAME,
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
const initialState = { state: Array(9).fill(""), whoPlays: "X" };

io.on(CONNECTION, (socket) => {
  console.log("conectado");

  io.emit(CURRENT_ROOM_LIST, roomList);

  socket.on(CHANGE_ROOM_LIST, (newRoom, callback) => {
    roomList = [...roomList, newRoom];

    socket.join(newRoom.id);

    socket.to(newRoom.id).emit(CURRENT_STATE_GAME, initialState);
    io.emit(CURRENT_ROOM_LIST, roomList);

    callback();
  });

  socket.on(CHANGE_INIT_GAME, (newRoom, index, callback) => {
    let newArray = [...roomList];

    newArray[index] = { ...newRoom };

    roomList = newArray;

    socket.join(newRoom.id);

    socket.to(newRoom.id).emit(CURRENT_STATE_GAME, initialState);
    io.emit(CURRENT_ROOM_LIST, roomList);
    callback();
  });

  socket.on(CHANGE_STATE_GAME, (data) => {
    io.to(data.id).emit(CURRENT_STATE_GAME, data.newState);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor online, ${PORT}`);
});
