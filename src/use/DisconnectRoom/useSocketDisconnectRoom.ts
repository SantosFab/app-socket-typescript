import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { Room } from "../../interface/Room/Room";
import { useNavigate } from "react-router-dom";
import {
  CHANGE_CHAMPION,
  CHANGE_DRAW,
  CHANGE_POINTING,
  CHANGE_STATE_GAME,
  CHANGE_WHO_PLAYS,
  CHANGE_WINNER,
  CLOSE_ROOM,
  USER_LOG_OUT,
} from "../../utils/serverConstants";

const socket = getSocketInstance();

interface InterfaceDisconnectRoom {
  Room: Room | undefined;
  id: string | undefined;
}

const useSocketDisconnectRoom = ({ Room, id }: InterfaceDisconnectRoom) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleDisconnectRoom = () => {
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
        const newPointing = [0, 0];
        let newRoom: any;

        if (socketID === Room.idPlayerOne && Room.idPlayerTwo === undefined) {
          socket.emit(CLOSE_ROOM, Room.id, Room.index);
          return navigate("/");
        } else if (socketID === Room?.idPlayerOne) {
          newRoom = {
            ...Room,
            idPlayerOne: Room.idPlayerTwo,
            nickNameOne: Room.nickNameTwo,
            pieceOne: Room.pieceTwo,
            idPlayerTwo: undefined,
            nickNameTwo: undefined,
            pieceTwo: undefined,
          };
        } else if (socketID === Room?.idPlayerTwo) {
          newRoom = {
            ...Room,
            idPlayerTwo: undefined,
            nickNameTwo: undefined,
            pieceTwo: undefined,
          };
        }
        socket.emit(CHANGE_STATE_GAME, { id, newStateGame });
        socket.emit(CHANGE_WHO_PLAYS, { id, newWhoPlays });
        socket.emit(CHANGE_CHAMPION, { id, newChampion });
        socket.emit(CHANGE_DRAW, { id, newDraw });
        socket.emit(CHANGE_WINNER, { id, newWinner });
        socket.emit(CHANGE_POINTING, { id, newPointing });
        socket.emit(USER_LOG_OUT, newRoom, newRoom.index);
        return navigate("/");
      } catch (error) {
        console.error("Erro ao lidar com o evento de beforeunload:", error);
      }
    };
    window.addEventListener("beforeunload", handleDisconnectRoom);
    return () => {
      window.removeEventListener("beforeunload", handleDisconnectRoom);
      window.onpopstate = () => {
        handleDisconnectRoom();
      };
    };
  }, [Room, navigate, id]);
};

export default useSocketDisconnectRoom;
