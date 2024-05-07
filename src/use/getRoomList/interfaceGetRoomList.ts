export interface RoomList {
  id: string;
  roomName: string;
  pieceOne: string;
  nickNameOne: string;
  pieceTwo?: string;
  nickNameTwo?: string;
}

export interface interfaceRoomList {
  setRoomList: React.Dispatch<React.SetStateAction<RoomList[] | []>>;
}
