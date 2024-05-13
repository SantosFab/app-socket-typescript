import { FunctionComponent, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import useGetRoomList from "../../use/RoomList/useGetRoomList";
import RoomCard from "../../component/RoomCard/RoomCard";
import NewRoomModal from "../../component/NewRoomModal/NewRoomModal";
import "./RoomPage.css";
import { Room } from "../../interface/Room/Room";

interface RoomPageProps {}

const RoomPage: FunctionComponent<RoomPageProps> = () => {
  const [RoomList, setRoomList] = useState<Room[]>([]);
  const [ShowNewRoomModal, setShowNewRoomModal] = useState<boolean>(false);

  useGetRoomList({ setRoomList });

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
      <button onClick={() => console.log(...RoomList)}>button</button>
    </Container>
  );
};

export default RoomPage;
