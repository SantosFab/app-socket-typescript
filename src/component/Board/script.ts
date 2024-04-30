import { getSocketInstance } from "../../server/instance/socket";
import { state } from "../../utils/serverConstants";

const socket = getSocketInstance();

export function handleInitialState(): Promise<string[]> {
  return new Promise((resolve) =>
    socket.on(state, (initialState) => {
      return resolve(initialState);
    })
  );
}
