import { getSocketInstance } from "../../server/instance/socket";
import {
  CHANGE_STATE_GAME,
  CHANGE_WHO_PLAYS,
} from "../../utils/serverConstants";

const socket = getSocketInstance();

export type TypePiece = "X" | "0";

interface interfaceChangePlayer {
  id?: string;
  index: number;
  piece?: string;
  StateGame: string[];
  WhoPlays: TypePiece;
}

export function playerMove({
  id,
  index,
  piece,
  StateGame,
  WhoPlays,
}: interfaceChangePlayer) {
  if (piece !== WhoPlays || piece === undefined || id === undefined) {
    return;
  }

  if (piece === "X" || piece === "0") {
    let newStateGame = [...StateGame];
    let newWhoPlays = WhoPlays;

    console.log(newWhoPlays);
    console.log(id);

    console.log(newStateGame);
    newStateGame[index] = piece;

    console.log(newStateGame);

    newWhoPlays = piece === "X" ? "0" : "X";
    console.log(newWhoPlays);

    socket.emit(CHANGE_STATE_GAME, { id, newStateGame });
    socket.emit(CHANGE_WHO_PLAYS, { id, newWhoPlays });
  }
}

/* function checkWinner(board: StateGame): StateGame {
  let newState = { ...board };
  const winningConditions = [
    // Linhas
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Colunas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonais
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      newState.state[a] &&
      newState.state[a] === newState.state[b] &&
      newState.state[a] === newState.state[c]
    ) {
      newState.winner = true;
      newState.champion = newState.state[a];
      console.log("vencendor", newState);

      return newState;
    }
  }

  // Se não houver vencedor
  if (newState.state.every((cell) => cell !== "")) {
    newState.draw = true;
    console.log("empate", newState);

    return newState;
  }

  return newState;
}
 */
