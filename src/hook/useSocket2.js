import { useCallback } from "react";
import io from "socket.io-client";

const sockets = {};

const useSocket2 = (serverUrl, gameNum,userId) => {
  const disconnect = useCallback(() => {
    if (gameNum && sockets[gameNum]) {
      sockets[gameNum].disconnect();
      delete sockets[gameNum];
    }
  }, [gameNum]);

  if (!gameNum) {
    return [undefined, disconnect];
  }
const nickname = {id:userId};
  if (!sockets[gameNum]) {
    sockets[gameNum] = io.connect(serverUrl);
    // sockets[gameNum].emit("joinGame", gameNum,userId);
    // sockets[gameNum].emit("nickname", userId);
    sockets[gameNum].emit("nickname", userId);

    
   /// console.log(" nickname", nickname);
    console.info("create socket", gameNum, sockets[gameNum]);
  }

  return [sockets[gameNum], disconnect];
};

export default useSocket2;