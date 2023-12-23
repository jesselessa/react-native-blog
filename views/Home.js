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

        if (!userInfoResponse.ok) {
          const errorMsg = userInfoResponse.text();
          throw new Error(errorMsg);
        }

        const userInfo = await userInfoResponse.json();
        setUserData(userInfo);

        // Get user's posts
        const userPostsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}/posts`
        );

        if (!userPostsResponse.ok) {
          const errorMsg = userPostsResponse.text();
          throw new Error(errorMsg);
        }
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

  // Delete a post
  const handleDeletePost = (postId) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => Alert.alert("Cancel Pressed"),
      },

      {
        text: "Delete",
        style: "destructive",
        // To simulate deletion client side
        onPress: () => {
          const updatedPosts = userPosts.filter((post) => post.id !== postId);
          setUserPosts(updatedPosts);
          Alert.alert("Post deleted");
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
            { item } // each item from 'data' object
          ) => (
            <Post
              postId={item?.id}
              title={item?.title}
              body={item?.body}
              user={userData}
              onDelete={() => handleDeletePost(item.id)}
              // keyExtractor={(item) => item?.id.toString()} // No need to explicitely use it here, because original data structure already has a 'key' or 'id' prop
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
    textAlign: "center",
    marginBottom: 20,
  },
});
