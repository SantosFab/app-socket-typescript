import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { CURRENT_CHAMPION } from "../../utils/serverConstants";
import { TypePiece } from "../../interface/Type/typePiece";

interface InterfaceChampion {
  setChampion: React.Dispatch<React.SetStateAction<TypePiece | undefined>>;
}

const socket = getSocketInstance();

const useSocketChampion = ({ setChampion }: InterfaceChampion) => {
  useEffect(() => {
    try {
      socket.on(CURRENT_CHAMPION, (arg) => {
        setChampion(arg);
      });
  
      return () => {
        socket.off(CURRENT_CHAMPION);
      };
    } catch (error) {
      console.error("Ocorreu um erro ao obter o Champion no socket:", error);
    }
  }, [setChampion]);
};

export default useSocketChampion;
