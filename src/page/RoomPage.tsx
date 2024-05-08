import { FunctionComponent, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import useSocketRoomList from "../use/getRoomList/useSocketGetRoomList";
import RoomCard from "../component/RoomCard/RoomCard";
import NewRoomModal from "../component/NewRoomModal/NewRoomModal";
import { RoomList } from "../use/getRoomList/interfaceGetRoomList";
import './RoomPage.css'

interface RoomPageProps {}

const RoomPage: FunctionComponent<RoomPageProps> = () => {
  const [RoomList, setRoomList] = useState<RoomList[]>([]);
  const [ShowNewRoomModal, setShowNewRoomModal] = useState<boolean>(false);

  useSocketRoomList({ setRoomList });

  return (
    <Container className="RoomPage">
      <Row className="d-flex justify-content-start align-items-start">
        {RoomList.map((room) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </Row>
      <NewRoomModal
        setShowNewRoomModal={setShowNewRoomModal}
        showModal={ShowNewRoomModal}
        index={RoomList.length}
      />
      <Button onClick={() => setShowNewRoomModal(true)}>Criar nova sala</Button>
    </Container>
  );
};

export default RoomPage;
