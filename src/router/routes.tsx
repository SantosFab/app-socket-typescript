import { Routes, Route } from "react-router-dom";
import RoomPage from "../page/RoomPage";
import Board from "../component/Board/Board";

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<RoomPage />} />
      <Route
        path="/Playroom/:id"
        element={<Board />}
      ></Route>
    </Routes>
  );
};

export default AppRouter;
