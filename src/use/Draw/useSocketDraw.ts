import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { CURRENT_DRAW } from "../../utils/serverConstants";

interface InterfaceDraw {
  setDraw: React.Dispatch<React.SetStateAction<boolean>>;
}

const socket = getSocketInstance();

const useSocketDraw = ({ setDraw }: InterfaceDraw) => {
  useEffect(() => {
    socket.on(CURRENT_DRAW, (arg) => {
      setDraw(arg);
    });

    return () => {
      socket.off(CURRENT_DRAW);
    };
  }, [setDraw]);
};

export default useSocketDraw;
