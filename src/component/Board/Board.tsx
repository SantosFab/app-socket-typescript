import { FunctionComponent, useState } from "react";
import Square from "../Square/Square";
import "./Board.css";
import { changePlayer, initialState } from "./script";
import useSocketGetState from "../../use/getState/useGetState";
import useSocketGetCurrentPlayer, {
  WhoPlays,
} from "../../use/getCurrentPlayer/useGetCurrentPlayer";

interface BoardProps {}

const Board: FunctionComponent<BoardProps> = () => {
  const renderSquare = (index: number) => {
    return <Square value={State[index]} onClick={() => console.log("test")} />;
  };

 
  const [State, setState] = useState<string[]>(Array(9).fill(""));
  const [HasWinner, setHasWinner] = useState<string>("");
  const [Draw, setDraw] = useState<boolean>(false);
  const [CurrentPlayer, setCurrentPlayer] = useState<WhoPlays>("X");

  useSocketGetState({ setState, setHasWinner, setDraw });
  useSocketGetCurrentPlayer({ setCurrentPlayer: setCurrentPlayer });

  return (
    <div className="column">
      {HasWinner}
      <div>funci0nando</div>
      {/* {HasWinner === "" ? (
        <>
          {Player === CurrentPlayer ? (
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
        <>
          {HasWinner === Player ? (
            <p>Parabéns você é o vencedor da rodada!!!</p>
          ) : (
            <p>Que pena, você perdeu ;/</p>
          )}
          <div>{newGame()}</div>
        </>
      )}
      {Draw === true ? (
        <div className="column">
          <p>Jogo terminou empatado!</p>
          <div>{newGame()}</div>
        </div>
      ) : null} */}
    </div>
  );
};

export default Board;
