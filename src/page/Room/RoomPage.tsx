import { FunctionComponent, useState } from "react";
import { Container } from "react-bootstrap";
import useGetRoomList from "../../use/RoomList/useGetRoomList";
import RoomCard from "../../component/RoomCard/RoomCard";
import NewRoomModal from "../../component/NewRoomModal/NewRoomModal";
import "./RoomPage.css";
import { Room } from "../../interface/Room/Room";
import InputButton from "../../component/InputButton/InputButton";

interface RoomPageProps {}

const RoomPage: FunctionComponent<RoomPageProps> = () => {
  const [RoomList, setRoomList] = useState<Room[]>([]);
  const [ShowNewRoomModal, setShowNewRoomModal] = useState<boolean>(false);

  useGetRoomList({ setRoomList });

  return (
    <Container className="RoomPage">
      {RoomList.map((room) => (
        <RoomCard room={room} key={room.id} />
      ))}

      <NewRoomModal
        setShowNewRoomModal={setShowNewRoomModal}
        showModal={ShowNewRoomModal}
        index={RoomList.length}
      />
      <InputButton
        text="Nova sala"
        backGroundRed={true}
        onClick={() => setShowNewRoomModal(true)}
      />
      {/* <button onClick={() => console.log(...RoomList)}>button</button> */}
    </Container>
  );
};

export default RoomPage;
