import { useState } from "react";
import Board from "./component/Board/Board";
import "./App.css";
import useSocketGetPlayer from "./use/getSymbol/useSocketGetPlayer";
import useSocketDesconected from "./use/desconected/useSocketDesconected";

function App() {
  const [Player, setPlayer] = useState<string>("");

  useSocketGetPlayer({ setPlayer });
  useSocketDesconected({ setPlayer, Player });

  return (
    <div className="App">
      <h1>Você é o jogador - {Player}</h1>
      <Board Player={Player} />
    </div>
  );
}

export default App;
