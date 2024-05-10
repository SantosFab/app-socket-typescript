import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { CURRENT_WHO_PLAYS } from "../../utils/serverConstants";
import { TypePiece } from "../type/typePiece";

interface InterfaceWhoPlays {
  setWhoPlays: React.Dispatch<React.SetStateAction<TypePiece>>;
}

const socket = getSocketInstance();

const useSocketWhoPlays = ({ setWhoPlays }: InterfaceWhoPlays) => {
  useEffect(() => {
    socket.on(CURRENT_WHO_PLAYS, (arg) => {
      setWhoPlays(arg);
    });

    return () => {
      socket.off(CURRENT_WHO_PLAYS);
    };
  }, [setWhoPlays]);
};

export default useSocketWhoPlays;
