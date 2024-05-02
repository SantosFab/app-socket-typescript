import { getSocketInstance } from "../../server/instance/socket";
import { CHANGE_PLAYER, CURRENT_STATE } from "../../utils/serverConstants";

const socket = getSocketInstance();

interface interfaceChangePlayer {
  currentPlayer: string;
  index: number;
  symbol: string;
}

export function handleInitialState(): Promise<string[]> {
  return new Promise((resolve) =>
    socket.on(CURRENT_STATE, (State) => {
      return resolve(State);
    })
  );
}

export function changePlayer({
  currentPlayer,
  index,
  symbol,
}: interfaceChangePlayer) {
  if (symbol !== currentPlayer) {
    return;
  }
  socket.emit(CHANGE_PLAYER, symbol === "X" ? "0" : "X", index);
}
