import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { CURRENT_WHO_PLAYS } from "../../utils/serverConstants";
import { TypePiece } from "../../interface/Type/typePiece";

interface InterfaceWhoPlays {
  setWhoPlays: React.Dispatch<React.SetStateAction<TypePiece>>;
}

const socket = getSocketInstance();

const useSocketWhoPlays = ({ setWhoPlays }: InterfaceWhoPlays) => {
  useEffect(() => {
   try {
    socket.on(CURRENT_WHO_PLAYS, (arg) => {
      setWhoPlays(arg);
    });

    return () => {
      socket.off(CURRENT_WHO_PLAYS);
    };
   } catch (error) {
    console.error("Ocorreu um erro ao obter o WhoPlays no socket:", error);
   }
  }, [setWhoPlays]);
};

export default useSocketWhoPlays;
