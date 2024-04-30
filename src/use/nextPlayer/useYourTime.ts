import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { CurrentPlayer } from "../../utils/serverConstants";
import { YourTime } from "./YourTime";

export type WhoPlays = "X" | "0";

const socket = getSocketInstance();

function getNextPlayer(): Promise<WhoPlays> {
  return new Promise((resolve) => {
    socket.on(CurrentPlayer, (arg) => {
      resolve(arg);
    });
  });
}

const useSocketYourTime = ({ YourTime, setYourTime }: YourTime) =>
  useEffect(() => {
    const fetchData = async () => {
      const result = await getNextPlayer();
      setYourTime(result);
    };
    fetchData();

    return () => {};
  }, [setYourTime]);

export default useSocketYourTime;
