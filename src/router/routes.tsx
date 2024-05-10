import { Routes, Route } from "react-router-dom";
import RoomPage from "../page/Room/RoomPage";
import BoardPage from "../page/Board/BoardPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<RoomPage />} />
      <Route
        path="/GameRoom/:id/:piece/:index"
        element={<BoardPage />}
      ></Route>
    </Routes>
  );
};

export default AppRouter;
