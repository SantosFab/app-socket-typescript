import { FunctionComponent, useState } from "react";
import "./BoardPage.css";
import { useParams } from "react-router-dom";
import Square from "../../component/Square/Square";
import useSocketStateGame from "../../use/StateGame/useSocketStateGame";
import { checkWinner, playerMove } from "./script";
import useSocketWhoPlays from "../../use/WhoPlays/useSocketWhoPlays";
import useSocketChampion from "../../use/Champion/useSocketChampion";
import { TypePiece } from "../../interface/Type/typePiece";
import useSocketDraw from "../../use/Draw/useSocketDraw";
import useSocketWinner from "../../use/Winner/useSocketWinner";
import useAxiosVerification from "../../use/Verification/useAxiosVerification";
import { Room } from "../../interface/Room/Room";
import useSocketBeforeUnloand from "../../use/DisconnectRoom/useSocketDisconnectRoom";

interface BoardPageProps {}

const BoardPage: FunctionComponent<BoardPageProps> = () => {
  const [StateGame, setStateGame] = useState<string[]>(Array(9).fill(""));
  const [WhoPlays, setWhoPlays] = useState<TypePiece>("X");
  const [Champion, setChampion] = useState<TypePiece | undefined>(undefined);
  const [Draw, setDraw] = useState<boolean>(false);
  const [Winner, setWinner] = useState<boolean>(false);
  const [Room, setRoom] = useState<Room>();

  const { id, piece, index } = useParams();

  useAxiosVerification({ index, setRoom });
  useSocketStateGame({ setStateGame });
  useSocketWhoPlays({ setWhoPlays });
  useSocketChampion({ setChampion });
  useSocketDraw({ setDraw });
  useSocketWinner({ setWinner });
  useSocketBeforeUnloand({ Room, id });

  const renderSquare = (index: number) => {
    return (
      <Square
        index={index}
        value={StateGame[index]}
        WhoPlays={WhoPlays}
        onClick={() => {
          let newStateGame = [...StateGame];

          if (piece !== undefined && id !== undefined) {
            newStateGame[index] = piece;

            playerMove({ newStateGame, WhoPlays, id, piece });
            checkWinner({ newStateGame, id });
          }
        }}
      />
    );
  };

  return (
    <>
      <div className={`BoardPage ${WhoPlays}`}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
        <button
          onClick={() => {
            console.log(
              `draw:${Draw} - champion:${Champion} - winner:${Winner} - whoPlays:${WhoPlays}`
            );
            console.log({ ...Room });
          }}
        >
          Button2
        </button>
      </div>
    </>
  );
};

export default BoardPage;
