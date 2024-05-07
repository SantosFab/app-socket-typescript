import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { CURRENT_ROOM_LIST } from "../../utils/serverConstants";
import { interfaceRoomList } from "./interfaceGetRoomList";

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
