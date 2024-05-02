import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { CURRENT_PLAYER } from "../../utils/serverConstants";
import { YourTime } from "./interfaceYourTime";

export type WhoPlays = "X" | "0";

const socket = getSocketInstance();

const useSocketYourTime = ({ setYourTime }: YourTime) => {
  useEffect(() => {
    // Função para lidar com a atualização do estado YourTime
    const handleCurrentPlayerUpdate = (arg: WhoPlays) => {
      setYourTime(arg);
    };

    // Configurar o ouvinte de eventos para CurrentPlayer
    socket.on(CURRENT_PLAYER, (arg) => {
      handleCurrentPlayerUpdate(arg);
    });

    // Retorno do useEffect: Limpar o ouvinte quando o componente for desmontado
    return () => {
      socket.off(CURRENT_PLAYER);
    };
  }, [setYourTime]); // Executar o useEffect sempre que setYourTime mudar
};

export default useSocketYourTime;
