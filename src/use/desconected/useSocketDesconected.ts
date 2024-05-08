import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { CLIENT_DISCONNECTING } from "../../utils/serverConstants";

const socket = getSocketInstance();

function disconected(arg: string) {
  socket.emit(CLIENT_DISCONNECTING, arg);
  socket.disconnect();
}

interface interfaceDesconected {
  Player: string;
  setPlayer: React.Dispatch<React.SetStateAction<string>>;
}

const useSocketDesconected = ({ Player }: interfaceDesconected): void => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (Player === "X" || Player === "0") {
        disconected(Player);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      if (Player === "X" || Player === "0") {
        disconected(Player);
      }
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [Player]);
};
export default useSocketDesconected;
