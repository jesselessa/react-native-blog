import { NativeRouter, Routes, Route } from "react-router-native";

// Contexts providers
import { PostsContextProvider } from "./contexts/postsContext.js";
import { UserContextProvider } from "./contexts/userContext.js";

// Views
import Login from "./views/Login.js";
import Home from "./views/Home.js";
import AddPost from "./views/AddPost.js";
import Profile from "./views/Profile.js";
import Comments from "./views/Comments.js";

// Component
import Navbar from "./components/Navbar.js";

export default function App() {
  return (
    <UserContextProvider>
      <PostsContextProvider>
        <NativeRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/addpost" element={<AddPost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/comments/:postId" element={<Comments />} />
          </Routes>
          <Navbar />
        </NativeRouter>
      </PostsContextProvider>
    </UserContextProvider>
  );
}
