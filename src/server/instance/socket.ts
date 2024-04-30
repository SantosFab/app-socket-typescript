import { io, Socket } from "socket.io-client";

let socketInstance: Socket | null = null;

export function getSocketInstance(): Socket {
  if (!socketInstance) {
    socketInstance = io("http://localhost:4000");
  }
  return socketInstance;
}
