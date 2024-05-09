import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { CURRENT_ROOM_LIST } from "../../utils/serverConstants";

export interface RoomList {
  id: string;
  index: number;
  roomName: string;
  idPlayerOne?: string;
  pieceOne: string;
  nickNameOne: string;
  pieceTwo?: string;
  nickNameTwo?: string;
  idPlayerTwo?: string;
}

interface interfaceRoomList {
  setRoomList: React.Dispatch<React.SetStateAction<RoomList[] | []>>;
}

const socket = getSocketInstance();

const useSocketRoomList = ({ setRoomList }: interfaceRoomList): void => {
  useEffect(() => {
    socket.on(CURRENT_ROOM_LIST, (currentRoomList) => {
      setRoomList(currentRoomList);
    });

    return () => {
      socket.off(CURRENT_ROOM_LIST);
    };
  }, [setRoomList]);
};
export default useSocketRoomList;
