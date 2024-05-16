import { FunctionComponent, useState } from "react";
import "./BoardPage.css";
import { useParams } from "react-router-dom";
import Square from "../../component/Square/Square";
import useSocketStateGame from "../../use/StateGame/useSocketStateGame";
import { checkWinner, initState, newScore, playerMove } from "./script";
import useSocketWhoPlays from "../../use/WhoPlays/useSocketWhoPlays";
import useSocketChampion from "../../use/Champion/useSocketChampion";
import { TypePiece } from "../../interface/Type/typePiece";
import useSocketDraw from "../../use/Draw/useSocketDraw";
import useSocketWinner from "../../use/Winner/useSocketWinner";
import useAxiosVerification from "../../use/Verification/useAxiosVerification";
import { Room } from "../../interface/Room/Room";
import InputButton from "../../component/InputButton/InputButton";
import useSocketDisconnectRoom from "../../use/DisconnectRoom/useSocketDisconnectRoom";
import useSocketPointing from "../../use/Pointing/useSocketPointing";

interface BoardPageProps {}

const BoardPage: FunctionComponent<BoardPageProps> = () => {
  const [StateGame, setStateGame] = useState<string[]>(Array(9).fill(""));
  const [WhoPlays, setWhoPlays] = useState<TypePiece>("X");
  const [Champion, setChampion] = useState<TypePiece | undefined>(undefined);
  const [Draw, setDraw] = useState<boolean>(false);
  const [Winner, setWinner] = useState<boolean>(false);
  const [Room, setRoom] = useState<Room>();
  const [Pointing, setPointing] = useState<number[]>([0, 0]);

  const { id, piece, index } = useParams();

  useAxiosVerification({ index, piece, setRoom });
  useSocketStateGame({ setStateGame });
  useSocketWhoPlays({ setWhoPlays });
  useSocketChampion({ setChampion });
  useSocketDraw({ setDraw });
  useSocketWinner({ setWinner });
  useSocketDisconnectRoom({ id, Room });
  useSocketPointing({ setPointing });

  const renderSquare = (index: number) => {
    return (
      <Square
        piece={piece}
        index={index}
        value={StateGame[index]}
        WhoPlays={WhoPlays}
        onClick={() => {
          let newStateGame = [...StateGame];

          if (piece !== undefined && id !== undefined) {
            newStateGame[index] = piece;
            handlenewMove({ newStateGame });
            handleHasWinner({ newStateGame });
          }
        }}
      />
    );
  };

  const handlenewMove = ({ newStateGame }: { newStateGame: string[] }) => {
    if (Room?.nickNameTwo === undefined || Room.pieceTwo === undefined) {
      return;
    }
    playerMove({ newStateGame, WhoPlays, id, piece });
  };

  const handleHasWinner = ({ newStateGame }: { newStateGame: string[] }) => {
    checkWinner({ newStateGame, id });
  };

  const handleInitialState = () => {
    initState({ id });
  };

  const handleHasChampion = () => {
    newScore({ Champion, Pointing, id });
  };

  return (
    <>
      <div className={`BoardPage ${WhoPlays}`}>
        <div className="pointing">
          <p>
            {Room?.pieceOne} - {Room?.nickNameOne}:{" "}
            {Room?.pieceOne === "X" ? Pointing[0] : Pointing[1]}
          </p>
          <p>
            {Room?.idPlayerTwo !== undefined
              ? `${Room?.pieceTwo} - ${Room?.nickNameTwo}: ${
                  Room.pieceTwo === "X" ? Pointing[0] : Pointing[1]
                }`
              : "Aguardando jogador"}
          </p>
        </div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
        <div className={`winner-${Winner}`}>
          {piece === Champion ? <p>Você venceu!</p> : <p>Você perdeu!</p>}
          <InputButton
            text="Reiniciar"
            backGroundGreen={true}
            onClick={() => {
              handleInitialState();
              handleHasChampion();
            }}
          />
        </div>
        <div className={`draw-${Draw}`}>
          <p>Jogo empatado!</p>
          <InputButton
            text="Reiniciar"
            backGroundRed={true}
            onClick={() => handleInitialState()}
          />
        </div>
      </div>
    </>
  );
};

export default BoardPage;
