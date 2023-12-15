import { createContext, useState } from "react";

export const PostsContext = createContext();

export const PostsContextProvider = ({ children }) => {
  const [postId, setPostId] = useState("");
  const [comments, setComments] = useState([]);
  const [newPost, setNewPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchPostComments = async () => {
    if (!postId) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );

      const data = await response.json();
      setComments(data);

      return data;
    } catch (error) {
      console.error("Failed fetching post comments:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    postId,
    setPostId,
    comments,
    fetchPostComments,
    newPost,
    setNewPost,
    isLoading,
    setIsLoading,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
