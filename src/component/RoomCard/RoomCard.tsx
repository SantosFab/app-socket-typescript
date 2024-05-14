import { FunctionComponent, useState } from "react";
import {  Card, Col } from "react-bootstrap";
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
    <Col xs="auto">
      <Card className="RoomCard">
        <Card.Body>
          <Card.Title>{`${room.roomName}`}</Card.Title>
          <Card.Text>{`${room.nickNameOne} selecionou a peça ${room.pieceOne} para jogar`}</Card.Text>
          <NewPlayerModal
            setShowNewPlayerModal={setShowNewPlayerModal}
            showModal={ShowNewPlayerModal}
            room={room}
          ></NewPlayerModal>
          <InputButton
            text="Entrar"
            disabled={
              room.idPlayerTwo !== undefined && room.idPlayerOne !== undefined
                ? true
                : false
            }
            onClick={() => setShowNewPlayerModal(true)}
          />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RoomCard;
