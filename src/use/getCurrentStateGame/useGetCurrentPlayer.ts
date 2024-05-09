import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { CURRENT_STATE_GAME } from "../../utils/serverConstants";

type WhoPlays = "X" | "0";

export interface StateGame {
  state: string[];
  whoPlays: WhoPlays;
}

interface CurrentPlayer {
  setStateGame: React.Dispatch<React.SetStateAction<StateGame>>;
}

const socket = getSocketInstance();

const useSocketGetStateGame = ({ setStateGame }: CurrentPlayer) => {
  useEffect(() => {
    // Função para lidar com a atualização do estado YourTime
    const handleCurrentPlayerUpdate = (arg: StateGame) => {
      setStateGame(arg);
    };

    // Configurar o ouvinte de eventos para CurrentPlayer
    socket.on(CURRENT_STATE_GAME, (arg) => {
      handleCurrentPlayerUpdate(arg);
    });

    // Retorno do useEffect: Limpar o ouvinte quando o componente for desmontado
    return () => {
      socket.off(CURRENT_STATE_GAME);
    };
  }, [setStateGame]); // Executar o useEffect sempre que setYourTime mudar
};

export default useSocketGetStateGame;
