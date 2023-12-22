import { useContext, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";

// Contexts
import { UserContext } from "../contexts/userContext.js";
import { PostsContext } from "../contexts/postsContext.js";

// Component
import Post from "../components/Post.js";

export default function Home() {
  const { userId, userData, setUserData } = useContext(UserContext);
  const { userPosts, setUserPosts, isLoading, setIsLoading } =
    useContext(PostsContext);

  // Fetch user's info and posts on component mounting
  useEffect(() => {
    const fetchUserInfoAndPosts = async (userId) => {
      try {
        setIsLoading(true); // Start of loading

        // Get user's data
        const userInfoResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );

        const userInfo = await userInfoResponse.json();
        setUserData(userInfo);

        // Get user's posts
        const userPostsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}/posts`
        );

        const userPostsData = await userPostsResponse.json();
        setUserPosts(userPostsData);
      } catch (error) {
        console.error("Error fetching user's posts and info:", error);
      } finally {
        setIsLoading(false); // End of loading (success or not)
      }
    };

    fetchUserInfoAndPosts(userId);
  }, [userId, setUserData, setUserPosts, setIsLoading]);

  //TODO - Uncomment below if using a CRUD API
  // Delete post
  const handleDeletePost = (postId) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => console.log("Cancel Pressed."),
      },

      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          // TODO - Uncomment with CRUD API
          // const updatedPosts = userPosts.filter((post) => post.id !== postId);
          // setUserPosts(updatedPosts);
          console.log("Post deleted.");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.homeView}>
      <Text style={styles.title}>Homepage</Text>
      {isLoading ? (
        // ActivityIndicator indicates content is loading
        <ActivityIndicator size="large" color="#054a91" />
      ) : userPosts.length === 0 ? (
        <Text style={styles.noPostMessage}>You have no post yet.</Text>
      ) : (
        // Display list of posts
        <FlatList
          style={styles.listContainer}
          data={userPosts}
          renderItem={(
            { item } // 'item' = property of 'data' object
          ) => (
            <Post
              postId={item?.id}
              title={item?.title}
              body={item?.body}
              user={userData}
              onDelete={handleDeletePost}
              // onDelete={handleDeletePost(item.id)}
              // Note : keyExtractor={(item) => item?.id.toString()} // No need, if item already has a 'key' or 'id' prop
            />
          )}
          ListHeaderComponent={() => (
            <Text style={styles.subtitle}>Find your posts on this page.</Text>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    backgroundColor: "#f3f6fb",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#054a91",
    textAlign: "center",
    marginBottom: 25,
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
});
