import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { Room } from "../../interface/Room/Room";
import { useNavigate } from "react-router-dom";
import {
  CHANGE_CHAMPION,
  CHANGE_DRAW,
  CHANGE_INIT_GAME,
  CHANGE_STATE_GAME,
  CHANGE_WHO_PLAYS,
  CHANGE_WINNER,
} from "../../utils/serverConstants";

const socket = getSocketInstance();

interface InterfaceBeforeUnloand {
  Room: Room | undefined;
  id: string | undefined;
}

const useSocketBeforeUnload = ({ Room, id }: InterfaceBeforeUnloand) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = () => {
      alert("chamei o before");
      console.log("chamei o before");

      try {
        if (Room === undefined) {
          return;
        }
        const socketID = socket.id;
        const newStateGame = Array(9).fill("");
        const newWhoPlays = "X";
        const newChampion = undefined;
        const newDraw = false;
        const newWinner = false;
        let newRoom: any;

        if (socketID === Room?.idPlayerOne) {
          newRoom = {
            ...Room,
            idPlayerOne: undefined,
            nickNameOne: undefined,
            pieceOne: undefined,
          };
        } else if (socketID === Room?.idPlayerTwo) {
          newRoom = {
            ...Room,
            idPlayerTwo: undefined,
            nickNameTwo: undefined,
            pieceTwo: undefined,
          };
        }
        console.log(newRoom);

        socket.emit(CHANGE_STATE_GAME, { id, newStateGame });
        socket.emit(CHANGE_WHO_PLAYS, { id, newWhoPlays });
        socket.emit(CHANGE_CHAMPION, { id, newChampion });
        socket.emit(CHANGE_DRAW, { id, newDraw });
        socket.emit(CHANGE_WINNER, { id, newWinner });
        socket.emit(CHANGE_INIT_GAME, newRoom, newRoom.id, () => {
          console.log("desconectou da sala:", newRoom.roomName);
          navigate("/");
        });
      } catch (error) {
        console.error("Erro ao lidar com o evento de beforeunload:", error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [Room, navigate, id]);
};

export default useSocketBeforeUnload;
