import { getSocketInstance } from "../../server/instance/socket";
import { TypePiece } from "../../interface/Type/typePiece";
import {
  CHANGE_CHAMPION,
  CHANGE_DRAW,
  CHANGE_STATE_GAME,
  CHANGE_WHO_PLAYS,
  CHANGE_WINNER,
} from "../../utils/serverConstants";

const socket = getSocketInstance();

interface interfaceChangePlayer {
  id: string;
  piece: string;
  newStateGame: string[];
  WhoPlays: TypePiece;
}

export function playerMove({
  id,
  piece,
  newStateGame,
  WhoPlays,
}: interfaceChangePlayer) {
  if (piece !== WhoPlays) {
    return;
  }

  if (piece === "X" || piece === "0") {
    const newWhoPlays = piece === "X" ? "0" : "X";

    socket.emit(CHANGE_STATE_GAME, { id, newStateGame });
    socket.emit(CHANGE_WHO_PLAYS, { id, newWhoPlays });
  }
}

interface CheckWinner {
  newStateGame: string[];
  id?: string;
}

export function checkWinner({ newStateGame, id }: CheckWinner) {
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
      newStateGame[a] &&
      newStateGame[a] === newStateGame[b] &&
      newStateGame[a] === newStateGame[c]
    ) {
      const newWinner = true;
      const newChampion = newStateGame[a];

      socket.emit(CHANGE_WINNER, { id, newWinner });
      socket.emit(CHANGE_CHAMPION, { id, newChampion });

      return;
    }
  }

  // Se não houver vencedor
  if (newStateGame.every((cell) => cell !== "")) {
    const newDraw = true;

    socket.emit(CHANGE_DRAW, { id, newDraw });
    return;
  }

  return;
}
