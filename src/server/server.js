const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const {
  CURRENT_ROOM_LIST,
  CHANGE_ROOM_LIST,
  CHANGE_START_GAMER,
  CONNECTION,
  PORT,
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

  socket.on(CHANGE_ROOM_LIST, (newRoomList, callback) => {
    roomList = [...roomList, newRoomList];

    socket.join(newRoomList.id);

    socket.to(newRoomList.id).emit("message", initialState);
    io.emit(CURRENT_ROOM_LIST, roomList);

    callback();
  });

  socket.on(CHANGE_START_GAMER, (room, index, callback) => {
    let newArray = [...roomList];

    newArray[index] = { ...room };

    roomList = newArray;

    socket.join(room.id);
    socket.to(room.id).emit("message", initialState);
    io.emit(CURRENT_ROOM_LIST, roomList);
    callback();
  });

  socket.on("message", (data) => {
    socket.to(data.recipientSocketId).emit("message", initialState);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor online, ${PORT}`);
});
