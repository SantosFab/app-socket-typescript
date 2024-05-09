import { FunctionComponent, useState } from "react";
import "./BoardPage.css";
import { useParams } from "react-router-dom";
import Square from "../../component/Square/Square";
import useSocketStateGame from "../../use/StateGame/useSocketStateGame";
import { playerMove } from "./script";
import useSocketWhoPlays, {
  TypePiece,
} from "../../use/WhoPlays/useSocketWhoPlays";

interface BoardPageProps {}

const BoardPage: FunctionComponent<BoardPageProps> = () => {
  const [StateGame, setStateGame] = useState<string[]>(Array(9).fill(""));

  const [WhoPlays, setWhoPlays] = useState<TypePiece>("X");

  const params = useParams();

  const id = params.id;
  const piece = params.piece;

  useSocketStateGame({ setStateGame });
  useSocketWhoPlays({ setWhoPlays });

  const renderSquare = (index: number) => {
    return (
      <Square
        value={StateGame[index]}
        onClick={() => {
          playerMove({ index, StateGame, WhoPlays, id, piece });
        }}
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
