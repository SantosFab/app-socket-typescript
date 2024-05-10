import axios from "../../api/getRoom";
import { useEffect } from "react";
import { Room } from "../RoomList/useSocketRoomList";
import { getSocketInstance } from "../../server/instance/socket";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface InterfaceAxiosRoom {
  setRoom: React.Dispatch<React.SetStateAction<Room | undefined>>;
  index?: string;
}

const socket = getSocketInstance();

const useAxiosVerification = ({ setRoom, index }: InterfaceAxiosRoom) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomList = async () => {
      try {
        const response: AxiosResponse<Room> = await axios.get(
          `/roomList/${index}`
        );

        const data = response.data;
        const socketID = socket.id;

        if (socketID === data.idPlayerOne || socketID === data.idPlayerTwo) {
          return;
        } else {
          navigate('/')
        }
      } catch (error) {
        console.error("Error fetching room list:", error);
      }
    };

    fetchRoomList();
  }, [setRoom, index]);
};

export default useAxiosVerification;
