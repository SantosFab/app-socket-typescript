import { Routes, Route } from "react-router-dom";
import RoomPage from "../page/RoomPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<RoomPage />} />
    </Routes>
  );
};

export default AppRouter;
