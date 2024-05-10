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
  CHANGE_WHO_PLAYS,
  CURRENT_WHO_PLAYS,
  CHANGE_WINNER,
  CURRENT_WINNER,
  CHANGE_CHAMPION,
  CURRENT_CHAMPION,
  CHANGE_DRAW,
  CURRENT_DRAW,
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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

app.get("/api/roomList/:index", (req, res) => {
  const index = req.params.index;
  const roomData = roomList[index];
  if (roomData) {
    res.json({...roomData});
  } else {
    res.status(404).json({ error: "Room not found" });
  }
});

io.on(CONNECTION, (socket) => {
  console.log("conectado");

  io.emit(CURRENT_ROOM_LIST, roomList);

  socket.on(CHANGE_ROOM_LIST, (newRoom, callback) => {
    roomList = [...roomList, newRoom];

    socket.join(newRoom.id);

    io.emit(CURRENT_ROOM_LIST, roomList);

    callback();
  });

  socket.on(CHANGE_INIT_GAME, (newRoom, index, callback) => {
    let newArray = [...roomList];
    newArray[index] = { ...newRoom };

    roomList = newArray;

    socket.join(newRoom.id);

    io.emit(CURRENT_ROOM_LIST, roomList);
    callback();
  });

  socket.on(CHANGE_STATE_GAME, (data) => {
    io.to(data.id).emit(CURRENT_STATE_GAME, data.newStateGame);
  });

  socket.on(CHANGE_WHO_PLAYS, (data) => {
    io.to(data.id).emit(CURRENT_WHO_PLAYS, data.newWhoPlays);
  });

  socket.on(CHANGE_WINNER, (data) => {
    io.to(data.id).emit(CURRENT_WINNER, data.newWinner);
  });

  socket.on(CHANGE_CHAMPION, (data) => {
    io.to(data.id).emit(CURRENT_CHAMPION, data.newChampion);
  });

  socket.on(CHANGE_DRAW, (data) => {
    io.to(data.id).emit(CURRENT_DRAW, data.newDraw);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor online, ${PORT}`);
});
