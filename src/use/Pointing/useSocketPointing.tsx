import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { CURRENT_POINTING } from "../../utils/serverConstants";

interface InterfacePointing {
  setPointing: React.Dispatch<React.SetStateAction<number[]>>;
}

const socket = getSocketInstance();

const useSocketPointing = ({ setPointing }: InterfacePointing) => {
  useEffect(() => {
    try {
      socket.on(CURRENT_POINTING, (arg) => {
        setPointing(arg);
      });
  
      return () => {
        socket.off(CURRENT_POINTING);
      };
    } catch (error) {
      console.error("Ocorreu um erro ao obter o Pointing no socket:", error);
    }
  }, [setPointing]);
};

export default useSocketPointing;
