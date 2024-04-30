import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { clientDisconnecting } from "../../utils/serverConstants";
import { interfaceDesconected } from "./interfaceDesconected";

const socket = getSocketInstance();

function disconected(arg: string) {
  socket.emit(clientDisconnecting, arg);
  socket.disconnect();
}

const useSocketDesconected = ({
  Symbol: symbol,
}: interfaceDesconected): void => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (symbol === "X" || symbol === "0") {
        disconected(symbol);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      if (symbol === "X" || symbol === "0") {
        disconected(symbol);
      }
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [symbol, ]);
};
export default useSocketDesconected;
