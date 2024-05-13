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
  CURRENT_INIT_GAME,
  USER_LOG_OUT,
  CLOSE_ROOM,
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
  try {
    const index = req.params.index;
    const roomData = roomList[index];
    res.json({ ...roomData });
  } catch (error) {
    res.status(404).json({ error: "Room not found" });
  }
});

app.get("/api/roomList", (req, res) => {
  try {
    res.json([...roomList]);
  } catch (error) {
    res.status(404).json({ error: "RoomList not found" });
  }
});

io.on(CONNECTION, (socket) => {
  console.log("conectado");

  socket.on(CHANGE_ROOM_LIST, (newRoom, callback) => {
    try {
      roomList = [...roomList, newRoom];

      socket.join(newRoom.id);

      io.emit(CURRENT_ROOM_LIST, roomList);

      callback();
    } catch (error) {
      console.error("Ocorreu um error no RoomList");
    }
  });

  socket.on(CHANGE_INIT_GAME, (newRoom, index, callback) => {
    try {
      let newArray = [...roomList];
      newArray[index] = { ...newRoom };

      roomList = newArray;

      socket.join(newRoom.id);

      io.to(newRoom.id).emit(CURRENT_INIT_GAME, newRoom);
      io.emit(CURRENT_ROOM_LIST, roomList);
      callback();
    } catch (error) {
      console.error("Ocorreu um error no InitGame", error);
    }
  });

  socket.on(CHANGE_STATE_GAME, (data) => {
    try {
      io.to(data.id).emit(CURRENT_STATE_GAME, data.newStateGame);
    } catch (error) {
      console.error("Ocorreu um error no StateGame", error);
    }
  });

  socket.on(CHANGE_WHO_PLAYS, (data) => {
    try {
      io.to(data.id).emit(CURRENT_WHO_PLAYS, data.newWhoPlays);
    } catch (error) {
      console.error("Ocorreu um error no WhoPlays", error);
    }
  });

  socket.on(CHANGE_WINNER, (data) => {
    try {
      io.to(data.id).emit(CURRENT_WINNER, data.newWinner);
    } catch (error) {
      console.error("Ocorreu um error no Winner", error);
    }
  });

  socket.on(CHANGE_CHAMPION, (data) => {
    try {
      io.to(data.id).emit(CURRENT_CHAMPION, data.newChampion);
    } catch (error) {
      console.error("Ocorreu um error no Champion", error);
    }
  });

  socket.on(CHANGE_DRAW, (data) => {
    try {
      io.to(data.id).emit(CURRENT_DRAW, data.newDraw);
    } catch (error) {
      console.error("Ocorreu um error no Draw", error);
    }
  });

  socket.on(USER_LOG_OUT, (newRoom, index) => {
    try {
      let newArray = [...roomList];
      newArray[index] = { ...newRoom };

      roomList = newArray;

      io.to(newRoom.id).emit(CURRENT_INIT_GAME, newRoom);
      io.emit(CURRENT_ROOM_LIST, roomList);

      socket.leave(newRoom.id);
    } catch (error) {
      console.error("Ocorreu um error na desconexão do cliente", error);
    }
  });

  socket.on(CLOSE_ROOM, (id, index) => {
    try {
      roomList = roomList.filter((_, i) => i !== index);
      io.emit(CURRENT_ROOM_LIST, roomList);
      socket.leave(id);
    } catch (error) {
      console.error("Ocorreu um erro ao fechar a sala:", error);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Servidor online, ${PORT}`);
});
