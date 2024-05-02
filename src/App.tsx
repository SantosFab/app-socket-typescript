import { useState } from "react";
import Board from "./component/Board/Board";
import "./App.css";
import useSocketGetSymbol from "./use/getSymbol/useSocketGetSymbol";
import useSocketDesconected from "./use/desconected/useSocketDesconected";
import useSocketYourTime, { WhoPlays } from "./use/nextPlayer/useYourTime";

function App() {
  const [Symbol, setSymbol] = useState<string>("");
  const [YourTime, setYourTime] = useState<WhoPlays>("X");

  useSocketGetSymbol({ setSymbol: setSymbol });
  useSocketDesconected({ setSymbol: setSymbol, Symbol: Symbol });
  useSocketYourTime({ setYourTime: setYourTime });

  return (
    <div className="App">
      <h1>Bem-vindo ao jogo da velha</h1>
      <p>Você é o: {Symbol}</p>
      {Symbol === YourTime ? <p>Sua vez de jogar</p> : <p>Aguarde sua vez</p>}
      <Board currentPlayer={YourTime} symbol={Symbol} />
    </div>
  );
}

export default App;
