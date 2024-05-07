import { useState } from "react";
import "./App.css";
import useSocketRoomList from "./use/getRoomList/useSocketGetRoomList";
import { RoomList } from "./use/getRoomList/interfaceGetRoomList";
import NewRoomModal from "./component/NewRoomModal/NewRoomModal";
import { Button, Row, Col } from "react-bootstrap";
import RoomCard from "./component/RoomCard/RoomCard";

function App() {
  const [RoomList, setRoomList] = useState<RoomList[]>([]);
  const [ShowNewRoomModal, setShowNewRoomModal] = useState<boolean>(false);

  useSocketRoomList({ setRoomList });

  return (
    <div className="App">
      <Row>
        {RoomList.map((room, index) => (
          <RoomCard room={room} key={`${room.id}${index}`} />
        ))}
      </Row>
      <NewRoomModal
        setShowNewRoomModal={setShowNewRoomModal}
        showModal={ShowNewRoomModal}
      />
      <Button onClick={() => setShowNewRoomModal(true)}>Criar nova sala</Button>
    </div>
  );
}

export default App;
