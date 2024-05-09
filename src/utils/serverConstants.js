const CURRENT_DRAW = "currentDraw";
const CHANGE_DRAW = "changeDraw";
const CURRENT_WINNER = "currentWinner";
const CHANGE_WINNER = "changeWinner";
const CONNECTION = "connection";
const DISCONNECT = "disconnect";
const CLIENT_DISCONNECTING = "clientDisconnecting";
const CURRENT_ROOM_LIST = "currentRoomList";
const CHANGE_ROOM_LIST = "changeRoomList";
const CHANGE_START_GAMER = "changeStartGamer";
const CURRENT_STATE_GAMER = "currentStateGamer";
const CHANGE_STATE_GAMER = "changeStateGamer";

const PORT = process.env.PORT || 4000;

module.exports = {
  CURRENT_DRAW,
  CHANGE_DRAW,
  CURRENT_WINNER,
  CHANGE_WINNER,
  CURRENT_ROOM_LIST,
  CHANGE_ROOM_LIST,
  CHANGE_START_GAMER,
  CURRENT_STATE_GAMER,
  CHANGE_STATE_GAMER,
  CONNECTION,
  DISCONNECT,
  CLIENT_DISCONNECTING,
  PORT,
};
