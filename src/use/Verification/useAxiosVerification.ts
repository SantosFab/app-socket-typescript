import axios from "../../api/getRoom";
import React, { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { Room } from "../../interface/Room/Room";
import { CURRENT_INIT_GAME } from "../../utils/serverConstants";

interface InterfaceAxiosRoom {
  index?: string;
  setRoom: React.Dispatch<React.SetStateAction<Room | undefined>>;
}

const socket = getSocketInstance();

const useAxiosVerification = ({ index, setRoom }: InterfaceAxiosRoom) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response: AxiosResponse<Room> = await axios.get(
          `/roomList/${index}`
        );

        const Room = response.data;
        const socketID = socket.id;

        if (socketID === Room.idPlayerOne || socketID === Room.idPlayerTwo) {
          setRoom(Room);

          socket.on(CURRENT_INIT_GAME, (newRoom) => {
            setRoom(newRoom);
          });

          return;
        } else {
          navigate("/");
          return;
        }
      } catch (error) {
        console.error("Error fetching room list:", error);
      }
    };
    fetchRoom();
  }, [index, navigate, setRoom]);
};

export default useAxiosVerification;
