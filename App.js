import { useContext } from "react";
import { NativeRouter, Routes, Route } from "react-router-native";

// Contexts
import { PostsContextProvider } from "./contexts/postsContext.js";
import { UserContext, UserContextProvider } from "./contexts/userContext.js";

// Views
import Login from "./views/Login.js";
import Home from "./views/Home.js";
import AddPost from "./views/AddPost.js";
import Profile from "./views/Profile.js";
import Comments from "./views/Comments.js";

// Component
import Navbar from "./components/Navbar.js";

export default function App() {
  const { isLogged } = useContext(UserContext);

  return (
    <PostsContextProvider>
      <UserContextProvider>
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
      </UserContextProvider>
    </PostsContextProvider>
  );
}
