import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { YOUR_INFOR } from "../../utils/serverConstants";
import { interfaceGetSymbol } from "./interfaceGetSymbol";

const socket = getSocketInstance();

function getSymbol() {
  return new Promise<string>((resolve) => {
    socket.on(YOUR_INFOR, (arg1: string, arg2: string) => {
      resolve(arg2);
    });
  });
}

const useSocketGetSymbol = ({ setSymbol }: interfaceGetSymbol): void => {
  useEffect(() => {
    const fetchData = async () => {
      const result = await getSymbol();
      setSymbol(result);
    };

    fetchData();

    return () => {
      socket.off(YOUR_INFOR)
    };
  }, [setSymbol]);
};
export default useSocketGetSymbol;
