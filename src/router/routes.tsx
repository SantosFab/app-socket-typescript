import { createBrowserRouter } from "react-router-dom";
import BoardPage from "../page/BoardPage/BoardPage";
import App from "../app/App";
import RoomPage from "../page/RoomPage/RoomPage";

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
