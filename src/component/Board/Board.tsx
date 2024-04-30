import { FunctionComponent, useEffect, useState } from "react";
import Square from "../Square/Square";
import "./Board.css";
import { changePlayer, handleInitialState } from "./script";

interface BoardProps {
  symbol: string;
}

const Board: FunctionComponent<BoardProps> = ({ symbol }) => {
  const renderSquare = (i: number) => {
   
    
    return <Square value={state[i]} onClick={() => changePlayer(symbol)} />;
  };
  const [state, setState] = useState<string[]>(Array(9).fill(""));

  useEffect(() => {
    const fetchData = async () => {
      const result = await handleInitialState();
      setState(result);
    };
    fetchData();

    return () => {};
  }, []);

  return (
    <div>
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

export default Board;
