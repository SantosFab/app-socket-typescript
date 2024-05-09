const CURRENT_DRAW = "currentDraw";
const CHANGE_DRAW = "changeDraw";
const CURRENT_WINNER = "currentWinner";
const CHANGE_WINNER = "changeWinner";
const CONNECTION = "connection";
const DISCONNECT = "disconnect";
const CLIENT_DISCONNECTING = "clientDisconnecting";
const CURRENT_ROOM_LIST = "currentRoomList";
const CHANGE_ROOM_LIST = "changeRoomList";
const CHANGE_INIT_GAME = "changeStartGame";
const CURRENT_STATE_GAME = "currentStateGame";
const CHANGE_STATE_GAME = "changeStateGame";

const PORT = process.env.PORT || 4000;

module.exports = {
  CURRENT_DRAW,
  CHANGE_DRAW,
  CURRENT_WINNER,
  CHANGE_WINNER,
  CURRENT_ROOM_LIST,
  CHANGE_ROOM_LIST,
  CHANGE_INIT_GAME,
  CURRENT_STATE_GAME,
  CHANGE_STATE_GAME,
  CONNECTION,
  DISCONNECT,
  CLIENT_DISCONNECTING,
  PORT,
};
