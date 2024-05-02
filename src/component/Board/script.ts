import { getSocketInstance } from "../../server/instance/socket";
import { CHANGE_PLAYER, CHANGE_STATE } from "../../utils/serverConstants";

const socket = getSocketInstance();

interface interfaceChangePlayer {
  currentPlayer: string;
  index: number;
  symbol: string;
  state: string[];
}

export function changePlayer({
  currentPlayer,
  index,
  symbol,
  state,
}: interfaceChangePlayer) {
  if (symbol !== currentPlayer) {
    return;
  }
  const newState = [...state];
  newState[index] = currentPlayer;
  state = newState;

  socket.emit(CHANGE_PLAYER, symbol === "X" ? "0" : "X", index);
  socket.emit(CHANGE_STATE, state);
}
