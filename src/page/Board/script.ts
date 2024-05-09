import { getSocketInstance } from "../../server/instance/socket";
import { StateGame } from "../../use/getCurrentStateGame/useGetCurrentPlayer";
import { CHANGE_STATE_GAME } from "../../utils/serverConstants";

const socket = getSocketInstance();

interface interfaceChangePlayer {
  id?: string;
  index: number;
  piece?: string;
  StateGame: StateGame;
}

export function playerMove({
  id,
  index,
  piece,
  StateGame,
}: interfaceChangePlayer) {
  if (piece !== StateGame.whoPlays || piece === undefined || id === undefined) {
    return;
  }

  if (piece === "X" || piece === "0") {
    let newState = { ...StateGame };
    newState.state[index] = piece;
    newState.whoPlays = piece === "X" ? "0" : "X";
    socket.emit(CHANGE_STATE_GAME, { id, newState });
  }
}
