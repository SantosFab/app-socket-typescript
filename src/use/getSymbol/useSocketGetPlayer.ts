import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { YOUR_INFOR } from "../../utils/serverConstants";
import { interfaceGetPlayer } from "./interfaceGetPlayer";

const socket = getSocketInstance();

function getPlayer() {
  return new Promise<string>((resolve) => {
    socket.on(YOUR_INFOR, (arg1: string, arg2: string) => {
      resolve(arg2);
    });
  });
}

const useSocketGetPlayer = ({ setPlayer }: interfaceGetPlayer): void => {
  useEffect(() => {
    const fetchData = async () => {
      const result = await getPlayer();
      setPlayer(result);
    };

    fetchData();

    return () => {
      socket.off(YOUR_INFOR);
    };
  }, [setPlayer]);
};
export default useSocketGetPlayer;
