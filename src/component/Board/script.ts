import { getSocketInstance } from "../../server/instance/socket";
import { ChangePlayer, state } from "../../utils/serverConstants";

const socket = getSocketInstance();

export function handleInitialState(): Promise<string[]> {
  return new Promise((resolve) =>
    socket.on(state, (initialState) => {
      return resolve(initialState);
    })
  );
}

export function changePlayer(symbol: string) {
  console.log('tá chando a função', symbol, symbol === "X" ? "0" : "X");
  socket.emit(ChangePlayer, symbol === "X" ? "0" : "X");
}
