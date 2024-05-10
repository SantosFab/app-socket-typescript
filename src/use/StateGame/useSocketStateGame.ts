import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { CURRENT_STATE_GAME } from "../../utils/serverConstants";

interface InterfaceStateGame {
  setStateGame: React.Dispatch<React.SetStateAction<string[]>>;
}

const socket = getSocketInstance();

const useSocketStateGame = ({ setStateGame }: InterfaceStateGame) => {
  useEffect(() => {
    // Configurar o ouvinte de eventos para CurrentStateGame
    socket.on(CURRENT_STATE_GAME, (arg) => {
      setStateGame(arg);
    });

    // Retorno do useEffect: Limpar o ouvinte quando o componente for desmontado
    return () => {
      socket.off(CURRENT_STATE_GAME);
    };
  }, [setStateGame]);
};

export default useSocketStateGame;
