import { useEffect } from "react";
import { interfaceGetState } from "./interfaceState";
import { CURRENT_STATE } from "../../utils/serverConstants";
import { getSocketInstance } from "../../server/instance/socket";

const socket = getSocketInstance();

const useSocketGetState = ({ setState, setHasWinner }: interfaceGetState) =>
  useEffect(() => {
    const handleCurrentStateUpdate = (state: string[]) => {
      setState(state);
    };
    socket.on(CURRENT_STATE, (state) => {
      handleCurrentStateUpdate(state);
      checkWinner({ state, setHasWinner });
    });

    return () => {
      socket.off(CURRENT_STATE);
    };
  }, [setState, setHasWinner]);

function checkWinner({
  state,
  setHasWinner,
}: {
  state: string[];
  setHasWinner: React.Dispatch<React.SetStateAction<string>>;
}) {
  const winningConditions = [
    // Linhas
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Colunas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonais
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (state[a] && state[a] === state[b] && state[a] === state[c]) {
      // Retorna o jogador vencedor (X ou O)
      setHasWinner("O vencedor é: " + state[a]);
    }
  }

  // Se não houver vencedor e ainda houver espaços vazios, o jogo continua
  if (state.includes("")) {
    return false; // Ainda não há vencedor
  } else {
    // O jogo termina em empate
    setHasWinner("Empate");
  }
}

export default useSocketGetState;
