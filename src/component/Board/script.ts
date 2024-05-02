import { getSocketInstance } from "../../server/instance/socket";
import {
  CHANGE_DRAW,
  CHANGE_PLAYER,
  CHANGE_STATE,
} from "../../utils/serverConstants";

const socket = getSocketInstance();

interface interfaceChangePlayer {
  CurrentPlayer: string;
  index: number;
  Player: string;
  State: string[];
}

export function changePlayer({
  CurrentPlayer,
  Player,
  State,
  index,
}: interfaceChangePlayer) {
  if (Player !== CurrentPlayer) {
    return;
  }

  const newState = [...State];
  newState[index] = CurrentPlayer;
  State = newState;

  socket.emit(CHANGE_PLAYER, Player === "X" ? "0" : "X", index);
  socket.emit(CHANGE_STATE, State);
}

export function initialState({
  setHasWinner,
}: {
  setHasWinner: React.Dispatch<React.SetStateAction<string>>;
}) {
  const newState = Array(9).fill("");

  setHasWinner("");
  socket.emit(CHANGE_DRAW, false);
  socket.emit(CHANGE_STATE, newState);
}
