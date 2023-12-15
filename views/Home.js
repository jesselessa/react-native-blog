import { useEffect, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";

// Context
import { UserContext } from "../contexts/userContext.js";
import { PostsContext } from "../contexts/postsContext.js";

// Component
import Post from "../components/Post.js";

export default function Home() {
  const { userId, userData, setUserData, userPosts, setUserPosts } =
    useContext(UserContext);
  const { newPost, isLoading, setIsLoading } = useContext(PostsContext);

  // Fetch user's posts and info on component mounting
  useEffect(() => {
    fetchUserPostsAndInfo();
  }, [userId, userPosts, userData, newPost]);

  const fetchUserPostsAndInfo = async () => {
    try {
      setIsLoading(true);

      // Get all user's posts
      const postsPromise = fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/posts`
      ).then((response) => response.json());

      // Get all user's data
      const userDataPromise = fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      ).then((response) => response.json());

      const [postsData, userData] = await Promise.all([
        postsPromise,
        userDataPromise,
      ]);

      setUserPosts(postsData);
      setUserData(userData);
    } catch (error) {
      console.error("Error fetching user's posts and info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = (postId) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          // Delete the post
          const updatedPosts = userPosts.filter((post) => post.id !== postId);
          setUserPosts(updatedPosts);
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.homeView}>
      <Text style={styles.title}>Homepage</Text>
      {userPosts.length === 0 ? (
        // Message when there are no posts
        <Text style={styles.noPostMessage}>You have no posts yet.</Text>
      ) : isLoading ? (
        // To indicate content is loading
        <ActivityIndicator size="large" color="#054a91" />
      ) : (
        // Render the list of posts
        <FlatList
          style={styles.listContainer}
          data={userPosts}
          ListHeaderComponent={() => (
            <Text style={styles.subtitle}>Find your posts on this page.</Text>
          )}
          renderItem={(
            { item } // 'item' = property of 'data' object
          ) => (
            <Post
              title={item.title}
              body={item.body}
              user={userData}
              postId={item.id}
              onDeletePost={() => handleDeletePost(item.id)}
            />
          )}
          keyExtractor={(_data, index) => index.toString()}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    backgroundColor: "#f8fcda",
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#f17300",
    textAlign: "center",
    marginBottom: 30,
  },
  noPostMessage: {
    fontSize: 22,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  listContainer: {
    padding: 20,
  },
  subtitle: {
    fontSize: 22,
    color: "#333",
    marginBottom: 20,
  },
  homeContent: {
    marginTop: 20,
  },
});
