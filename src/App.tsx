import { useState } from "react";
import "./App.css";
import useSocketRoomList from "./use/getRoomList/useSocketGetRoomList";
import { RoomList } from "./use/getRoomList/interfaceGetRoomList";
import NewRoomModal from "./component/NewRoomModal/NewRoomModal";
import { Button, Container, Row } from "react-bootstrap";
import RoomCard from "./component/RoomCard/RoomCard";

function App() {
  const [RoomList, setRoomList] = useState<RoomList[]>([]);
  const [ShowNewRoomModal, setShowNewRoomModal] = useState<boolean>(false);

  useSocketRoomList({ setRoomList });

  console.log(RoomList);

  return (
    <Container className="App">
      <Row  className="d-flex justify-content-start align-items-start">
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
}

export default App;
