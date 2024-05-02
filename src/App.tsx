import { useState } from "react";
import Board from "./component/Board/Board";
import "./App.css";
import useSocketGetPlayer from "./use/getSymbol/useSocketGetPlayer";
import useSocketDesconected from "./use/desconected/useSocketDesconected";
import useSocketCurrentPlayer, {
  WhoPlays,
} from "./use/currentPlayer/useCurrentPlayer";

function App() {
  const [Player, setPlayer] = useState<string>("");
  const [CurrentPlayer, setCurrentPlayer] = useState<WhoPlays>("X");

  useSocketGetPlayer({ setPlayer });
  useSocketDesconected({ setPlayer, Player });
  useSocketCurrentPlayer({ setCurrentPlayer });

  return (
    <div className="App">
      <h1>Você é o jogador - {Player}</h1>
      <Board currentPlayer={CurrentPlayer} symbol={Player} />
    </div>
  );
}

export default App;
