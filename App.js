import { useState, createContext } from "react";
import { NativeRouter, Routes, Route } from "react-router-native";

// Views
import Login from "./views/Login.js";
import Home from "./views/Home.js";
import Profile from "./views/Profile.js";
import NewPost from "./views/NewPost.js";

// Components
import Navbar from "./components/Navbar.js";

// Context
export const UserContext = createContext();

export default function App() {
  const [userId, setUserId] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const value = { userId, setUserId, isLogged, setIsLogged };

  return (
    <UserContext.Provider value={value}>
      <NativeRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/newpost" element={<NewPost />} />
        </Routes>
        {isLogged && <Navbar />}
      </NativeRouter>
    </UserContext.Provider>
  );
}
