import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState({});
  const [isLogged, setIsLogged] = useState(false);

  const value = {
    userId,
    setUserId,
    isLogged,
    setIsLogged,
    userData,
    setUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
