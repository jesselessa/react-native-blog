import { useState, createContext } from "react";
import { NativeRouter, Routes, Route } from "react-router-native";

import Login from "./views/Login.js";
import Home from "./views/Home.js";

// Context
export const UserContext = createContext();

const App = () => {
  const [userId, setUserId] = useState(null);

  const value = { userId, setUserId };

  return (
    <UserContext.Provider value={value}>
      <NativeRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </NativeRouter>
    </UserContext.Provider>
  );
};

export default App;
