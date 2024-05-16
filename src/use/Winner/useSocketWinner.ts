import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { CURRENT_WINNER } from "../../utils/serverConstants";

interface InterfaceWinner {
  setWinner: React.Dispatch<React.SetStateAction<boolean>>;
}

const socket = getSocketInstance();

const useSocketWinner = ({ setWinner }: InterfaceWinner) => {
  useEffect(() => {
    try {
      socket.on(CURRENT_WINNER, (arg) => {
        setWinner(arg);
      });
  
      return () => {
        socket.off(CURRENT_WINNER);
      };
    } catch (error) {
      console.error("Ocorreu um erro ao obter o Winner no socket:", error);
    }
  }, [setWinner]);
};

export default useSocketWinner;
