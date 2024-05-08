import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { CURRENT_PLAYER } from "../../utils/serverConstants";

export type WhoPlays = "X" | "0";

interface CurrentPlayer {
  setCurrentPlayer: React.Dispatch<React.SetStateAction<WhoPlays>>;
}

const socket = getSocketInstance();

const useSocketGetCurrentPlayer = ({ setCurrentPlayer }: CurrentPlayer) => {
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

export default useSocketGetCurrentPlayer;
