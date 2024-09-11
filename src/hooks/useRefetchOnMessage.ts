import loadConfig from "global/config";
import { useEffect } from "react";
import { io } from "socket.io-client";

const config = loadConfig();
const socket = io(`${config.SOCKET_URL}`);
export function useRefetchOnMessage(messageType: string, dispatch: () => void) {
  useEffect(() => {
    const handleMessage = () => {
      dispatch();
    };

    //listens to any event emitted by the server and refetch the data
    socket?.on(messageType, handleMessage);

    return () => {
      socket?.off(messageType, handleMessage);
    };
  }, [messageType, dispatch]);
}
