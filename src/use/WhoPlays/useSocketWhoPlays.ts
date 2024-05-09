import { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";
import { CURRENT_WHO_PLAYS } from "../../utils/serverConstants";

export type TypePiece = "X" | "0";

interface CurrentPlayer {
  setWhoPlays: React.Dispatch<React.SetStateAction<TypePiece>>;
}

const socket = getSocketInstance();

const useSocketWhoPlays = ({ setWhoPlays }: CurrentPlayer) => {
  useEffect(() => {
    // Configurar o ouvinte de eventos para CurrentStateGame
    socket.on(CURRENT_WHO_PLAYS, (arg) => {
      console.log(arg);

      setWhoPlays(arg);
    });

    // Retorno do useEffect: Limpar o ouvinte quando o componente for desmontado
    return () => {
      socket.off(CURRENT_WHO_PLAYS);
    };
  }, [setWhoPlays]);
};

export default useSocketWhoPlays;
