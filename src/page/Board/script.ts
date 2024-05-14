import { getSocketInstance } from "../../server/instance/socket";
import { TypePiece } from "../../interface/Type/typePiece";
import {
  CHANGE_CHAMPION,
  CHANGE_DRAW,
  CHANGE_POINTING,
  CHANGE_STATE_GAME,
  CHANGE_WHO_PLAYS,
  CHANGE_WINNER,
} from "../../utils/serverConstants";

const socket = getSocketInstance();

interface interfacePlayerMove {
  id?: string;
  piece?: string;
  newStateGame: string[];
  WhoPlays: TypePiece;
}

export function playerMove({
  id,
  piece,
  newStateGame,
  WhoPlays,
}: interfacePlayerMove) {
  if (piece !== WhoPlays) {
    return;
  }

  if (piece === "X" || piece === "O") {
    const newWhoPlays = piece === "X" ? "O" : "X";

    socket.emit(CHANGE_STATE_GAME, { id, newStateGame });
    socket.emit(CHANGE_WHO_PLAYS, { id, newWhoPlays });
  }
}

interface InterfaceCheckWinner {
  newStateGame: string[];
  id?: string;
}

export function checkWinner({ newStateGame, id }: InterfaceCheckWinner) {
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

export function initState({ id }: { id?: string }) {
  const newStateGame = Array(9).fill("");
  const newWhoPlays = "X";
  const newChampion = undefined;
  const newDraw = false;
  const newWinner = false;

  socket.emit(CHANGE_STATE_GAME, { id, newStateGame });
  socket.emit(CHANGE_WHO_PLAYS, { id, newWhoPlays });
  socket.emit(CHANGE_CHAMPION, { id, newChampion });
  socket.emit(CHANGE_DRAW, { id, newDraw });
  socket.emit(CHANGE_WINNER, { id, newWinner });
}

interface InterfaceNewScore {
  id?: string;
  Champion?: string;
  Pointing: number[];
}

export function newScore({ id, Champion, Pointing }: InterfaceNewScore) {
  const newPointing = Pointing;

  if (Champion !== undefined && Champion === "X") {
    newPointing[0] = ++newPointing[0];
  } else if (Champion !== undefined && Champion === "O") {
    newPointing[1] = ++newPointing[1];
  }
  socket.emit(CHANGE_POINTING, { id, newPointing });
}
