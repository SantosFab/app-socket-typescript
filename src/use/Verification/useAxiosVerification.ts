import axios from "../../api/getRoom";
import { useEffect } from "react";
import { Room } from "../RoomList/useGetRoomList";
import { getSocketInstance } from "../../server/instance/socket";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface InterfaceAxiosRoom {
  index?: string;
}

const socket = getSocketInstance();

const useAxiosVerification = ({ index }: InterfaceAxiosRoom) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response: AxiosResponse<Room> = await axios.get(
          `/roomList/${index}`
        );

        const data = response.data;
        const socketID = socket.id;

        if (socketID === data.idPlayerOne || socketID === data.idPlayerTwo) {
          return;
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching room list:", error);
      }
    };
    fetchRoom();
  }, [index, navigate]);
};

export default useAxiosVerification;
