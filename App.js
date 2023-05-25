import { useState } from "react";
import { NativeRouter, Routes, Route } from "react-router-native";
// Context
import { UserContext } from "./contexts/UserContext.js";

// Views
import Login from "./views/Login.js";
import Home from "./views/Home.js";
import AddPost from "./views/AddPost.js";
import Profile from "./views/Profile.js";
import Comments from "./views/Comments.js";

// Component
import Navbar from "./components/Navbar.js";

export default function App() {
  const [userId, setUserId] = useState("");
  const [postId, setPostId] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const value = {
    userId,
    setUserId,
    isLogged,
    setIsLogged,
    userData,
    setUserData,
    userPosts,
    setUserPosts,
    comments,
    setComments,
    postId,
    setPostId,
  };

  return (
    <UserContext.Provider value={value}>
      <NativeRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/comments/:postId" element={<Comments />} />
        </Routes>
        {isLogged && <Navbar />}
      </NativeRouter>
    </UserContext.Provider>
  );
}
