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
    socket.on(CURRENT_CHAMPION, (arg) => {
      setChampion(arg);
    });

    return () => {
      socket.off(CURRENT_CHAMPION);
    };
  }, [setChampion]);
};

export default useSocketChampion;
