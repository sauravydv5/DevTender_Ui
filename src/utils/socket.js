import { io } from "socket.io-client";
import { BASE_URL } from "./constant";

let socket;

export const createSocketConnection = () => {
  if (!socket) {
    socket = io(BASE_URL, {
      transports: ["websocket"],
    });
  }
  return socket;
};
