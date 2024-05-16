import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { CURRENT_DRAW } from "../../utils/serverConstants";

interface InterfaceDraw {
  setDraw: React.Dispatch<React.SetStateAction<boolean>>;
}

const socket = getSocketInstance();

const useSocketDraw = ({ setDraw }: InterfaceDraw) => {
  useEffect(() => {
    try {
      socket.on(CURRENT_DRAW, (arg) => {
        setDraw(arg);
      });
  
      return () => {
        socket.off(CURRENT_DRAW);
      };
    } catch (error) {
      console.error("Ocorreu um erro ao obter o Draw no socket:", error);
    }
  }, [setDraw]);
};

export default useSocketDraw;
