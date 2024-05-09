import { FunctionComponent, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import "./RoomCard.css";
import NewPlayerModal from "../NewPlayerModal/NewPlayerModal";
import { RoomList } from "../../use/getRoomList/useSocketGetRoomList";

interface RoomCardProps {
  room: RoomList;
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
          <Button
            variant="primary"
            disabled={
              room.idPlayerTwo !== undefined && room.idPlayerOne !== undefined
                ? true
                : false
            }
            onClick={() => setShowNewPlayerModal(true)}
          >
            Entrar
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RoomCard;
