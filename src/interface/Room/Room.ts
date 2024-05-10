export interface Room {
  id: string;
  index: number;
  roomName: string;
  idPlayerOne?: string;
  pieceOne: string;
  nickNameOne: string;
  pieceTwo?: string;
  nickNameTwo?: string;
  idPlayerTwo?: string;
}
