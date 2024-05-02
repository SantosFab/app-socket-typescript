import { WhoPlays } from "./useGetCurrentPlayer";

export interface CurrentPlayer {
  setCurrentPlayer: React.Dispatch<React.SetStateAction<WhoPlays>>;
}
