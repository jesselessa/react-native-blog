import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [inputUserId, setInputUserId] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  const value = {
    inputUserId,
    setInputUserId,
    isLogged,
    setIsLogged,
    userData,
    setUserData,
    userPosts,
    setUserPosts,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
