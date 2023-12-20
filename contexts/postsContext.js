import { createContext, useState } from "react";

export const PostsContext = createContext();

export const PostsContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [newPost, setNewPost] = useState({});
  const [postComs, setPostComs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    posts,
    setPosts,
    comments,
    setComments,
    userPosts,
    setUserPosts,
    postId,
    setPostId,
    newPost,
    setNewPost,
    isLoading,
    setIsLoading,
    postComs,
    setPostComs,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
