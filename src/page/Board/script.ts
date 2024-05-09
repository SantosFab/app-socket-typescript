import { getSocketInstance } from "../../server/instance/socket";
import { CHANGE_DRAW } from "../../utils/serverConstants";

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
}

export function initialState({
  setHasWinner,
}: {
  setHasWinner: React.Dispatch<React.SetStateAction<string>>;
}) {
  setHasWinner("");
  socket.emit(CHANGE_DRAW, false);
}

export function test({
  id,
  piece,
}: {
  id: string | undefined;
  piece: string | undefined;
}) {
  socket.emit("message", { recipientSocketId: id, message: `Hello! ${piece}` });
}
