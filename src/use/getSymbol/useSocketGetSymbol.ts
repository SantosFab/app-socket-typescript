import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { YourInfor } from "../../utils/serverConstants";
import { interfaceGetSymbol } from "./interfaceGetSymbol";

const socket = getSocketInstance();

function getSymbol() {
  return new Promise<string>((resolve) => {
    socket.on(YourInfor, (arg1: string, arg2: string) => {
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
      socket.off(YourInfor)
    };
  }, [setSymbol]);
};
export default useSocketGetSymbol;
