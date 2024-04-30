import { WhoPlays } from "./useYourTime";

export interface YourTime {
  YourTime: string;
  setYourTime: React.Dispatch<React.SetStateAction<WhoPlays>>;
}
