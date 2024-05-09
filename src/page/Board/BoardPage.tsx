import { FunctionComponent, useState } from "react";
import "./BoardPage.css";
import { useParams } from "react-router-dom";
import Square from "../../component/Square/Square";
import useSocketGetStateGame, {
  StateGame,
} from "../../use/getCurrentStateGame/useGetCurrentPlayer";
import { playerMove } from "./script";

interface BoardPageProps {}

const BoardPage: FunctionComponent<BoardPageProps> = () => {
  const [StateGame, setStateGame] = useState<StateGame>({
    state: Array(9).fill(""),
    whoPlays: "X",
  });

  const params = useParams();

  const id = params.id;
  const piece = params.piece;

  useSocketGetStateGame({ setStateGame });

  const renderSquare = (index: number) => {
    return (
      <Square
        value={StateGame.state[index]}
        onClick={() => playerMove({ index, piece, StateGame, id })}
      />
    );
  };

  return (
    <div className="column">
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
    </div>
  );
};

export default BoardPage;
