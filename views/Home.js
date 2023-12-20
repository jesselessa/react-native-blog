import { useContext, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  ActivityIndicator,
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
    const fetchUserInfoAndPosts = async () => {
      try {
        setIsLoading(true); // Start of loading

        // Get user's data
        const userInfoResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );

        const userInfo = await userInfoResponse.json();
        setUserData(userInfo);

        // Get user's posts
        const postsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}/posts`
        );

        const postsData = await postsResponse.json();
        setUserPosts(postsData);
      } catch (error) {
        console.error("Error fetching user's posts and info:", error);
      } finally {
        setIsLoading(false); // End of loading (success or not)
      }
    };

    fetchUserInfoAndPosts();
  }, [userId, setUserData, setUserPosts, setIsLoading]);

  return (
    <SafeAreaView style={styles.homeView}>
      <Text style={styles.title}>Homepage</Text>
      {isLoading ? (
        // To indicate content is loading
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
              // onDelete={handleDeletePost}
              onPress={() => console.log("Button pressed !")}
              // keyExtractor={(item) => item?.id.tostring()} // No need if, item already has a 'key' or 'id' prop
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
});
