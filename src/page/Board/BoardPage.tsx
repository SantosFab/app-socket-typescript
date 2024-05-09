import { FunctionComponent, useEffect } from "react";
import { test } from "./script";
import "./BoardPage.css";
import { useParams } from "react-router-dom";
import { getSocketInstance } from "../../server/instance/socket";

interface BoardPageProps {}

const BoardPage: FunctionComponent<BoardPageProps> = () => {
  /*  const renderSquare = (index: number) => {
    return <Square value={State[index]} onClick={() => console.log("test")} />;
  }; */
  const params = useParams();

  const socket = getSocketInstance();

  const id = params.id;
  const piece = params.piece;
  
  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  return (
    <div className="column">
      <button onClick={() => test({ id, piece })}>funci0nando</button>
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

export default BoardPage;
