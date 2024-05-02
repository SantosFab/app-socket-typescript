export interface interfaceGetState {
  setState: React.Dispatch<React.SetStateAction<string[]>>;
  setHasWinner: React.Dispatch<React.SetStateAction<string>>;
  setDraw: React.Dispatch<React.SetStateAction<boolean>>;
}
