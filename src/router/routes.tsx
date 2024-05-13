import { createBrowserRouter } from "react-router-dom";
import BoardPage from "../page/Board/BoardPage";
import App from "../app/App";
import RoomPage from "../page/Room/RoomPage";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <RoomPage />,
      },
      {
        path: "GameRoom/:id/:piece/:index",
        element: <BoardPage />,
      },
    ],
  },
]);

export default router;
