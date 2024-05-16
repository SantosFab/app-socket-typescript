import { FunctionComponent, useState } from "react";
import { Card } from "react-bootstrap";
import "./RoomCard.css";
import NewPlayerModal from "../NewPlayerModal/NewPlayerModal";
import { Room } from "../../interface/Room/Room";
import InputButton from "../InputButton/InputButton";

interface RoomCardProps {
  room: Room;
}

const RoomCard: FunctionComponent<RoomCardProps> = ({ room }) => {
  const [ShowNewPlayerModal, setShowNewPlayerModal] = useState<boolean>(false);

  return (
    <Card className="RoomCard">
      <Card.Body>
        <Card.Title>{`${room.roomName}`}</Card.Title>
        <Card.Text>{`${room.nickNameOne} selecionou a peça ${room.pieceOne} para jogar`}</Card.Text>
        <NewPlayerModal
          setShowNewPlayerModal={setShowNewPlayerModal}
          showModal={ShowNewPlayerModal}
          room={room}
        ></NewPlayerModal>
        <div className="divButton">
          <InputButton
            text="Entrar"
            disabled={
              room.idPlayerTwo !== undefined && room.idPlayerOne !== undefined
                ? true
                : false
            }
            onClick={() => setShowNewPlayerModal(true)}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default RoomCard;
