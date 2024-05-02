import { FunctionComponent, useState } from "react";
import Square from "../Square/Square";
import "./Board.css";
import { changePlayer } from "./script";
import useSocketGetState from "../../use/state/useGetState";

interface BoardProps {
  currentPlayer: string;
  symbol: string;
}

const Board: FunctionComponent<BoardProps> = ({ currentPlayer, symbol }) => {
  const renderSquare = (index: number) => {
    return (
      <Square
        value={state[index]}
        onClick={() => {
          changePlayer({
            currentPlayer,
            index,
            symbol,
            state,
          });
        }}
      />
    );
  };
  const [state, setState] = useState<string[]>(Array(9).fill(""));
  const [HasWinner, setHasWinner] = useState<string>("");
  console.log(state, "no compomente");

  useSocketGetState({ setState, setHasWinner });

  return (
    <div>
      {HasWinner === "" ? (
        <>
          {symbol === currentPlayer ? (
            <h3>Sua vez de jogar</h3>
          ) : (
            <h3>Aguarde sua vez</h3>
          )}
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </>
      ) : (
        <p>{HasWinner}</p>
      )}
    </div>
  );
};

export default Board;
