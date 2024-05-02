import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { CURRENT_PLAYER } from "../../utils/serverConstants";
import { CurrentPlayer } from "./interfaceCurrentPlayer";

export type WhoPlays = "X" | "0";

const socket = getSocketInstance();

const useSocketCurrentPlayer = ({ setCurrentPlayer }: CurrentPlayer) => {
  useEffect(() => {
    // Função para lidar com a atualização do estado YourTime
    const handleCurrentPlayerUpdate = (arg: WhoPlays) => {
      setCurrentPlayer(arg);
    };

    // Configurar o ouvinte de eventos para CurrentPlayer
    socket.on(CURRENT_PLAYER, (arg) => {
      handleCurrentPlayerUpdate(arg);
    });

    // Retorno do useEffect: Limpar o ouvinte quando o componente for desmontado
    return () => {
      socket.off(CURRENT_PLAYER);
    };
  }, [setCurrentPlayer]); // Executar o useEffect sempre que setYourTime mudar
};

export default useSocketCurrentPlayer;
