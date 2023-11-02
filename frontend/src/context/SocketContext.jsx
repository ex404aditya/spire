import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const newSocket = io("http://localhost:5001", {
      query: {
        userId: user?._id,
      },
    });

    setSocket(newSocket);

    return () => newSocket && newSocket.close();
  }, [user?._id]);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
