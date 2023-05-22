import { useState, createContext } from "react";
import { NativeRouter, Routes, Route } from "react-router-native";

// Views
import Login from "./views/Login.js";
import Home from "./views/Home.js";
import AddPost from "./views/AddPost.js";
import Profile from "./views/Profile.js";

// Context
export const UserContext = createContext();

// Component
import Navbar from "./components/Navbar.js";

export default function App() {
  const [userId, setUserId] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  const value = {
    userId,
    setUserId,
    isLogged,
    setIsLogged,
    userData,
    setUserData,
    userPosts,
    setUserPosts,
  };

  return (
    <UserContext.Provider value={value}>
      <NativeRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        {isLogged && <Navbar />}
      </NativeRouter>
    </UserContext.Provider>
  );
}
