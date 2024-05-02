import { WhoPlays } from "./useCurrentPlayer";

export interface CurrentPlayer {
  setCurrentPlayer: React.Dispatch<React.SetStateAction<WhoPlays>>;
}
