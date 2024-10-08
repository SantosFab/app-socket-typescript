import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { CURRENT_ROOM_LIST } from "../../utils/serverConstants";
import axios from "../../api/getRoom";
import { AxiosResponse } from "axios";
import { Room } from "../../interface/Room/Room";

interface interfaceRoomList {
  setRoomList: React.Dispatch<React.SetStateAction<Room[] | []>>;
}

const socket = getSocketInstance();

const useGetRoomList = ({ setRoomList }: interfaceRoomList): void => {
  useEffect(() => {
    const fetchRoomList = async () => {
      try {
        const response: AxiosResponse<Room[]> = await axios.get("/roomList");

        setRoomList(response.data);
      } catch (error) {
        console.error("Error fetching room list:", error);
      }
    };
    fetchRoomList();
    try {
      socket.on(CURRENT_ROOM_LIST, (data) => {
        setRoomList(data);
      });
      return () => {
        socket.off(CURRENT_ROOM_LIST);
      };
    } catch (error) {
      console.error("Ocorreu um erro ao obter o RoomList no socket:", error);
    }
  }, [setRoomList]);
};
export default useGetRoomList;
