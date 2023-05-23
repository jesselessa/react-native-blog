import { useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, View, Text, FlatList } from "react-native";

// Context
import { UserContext } from "../contexts/UserContext.js";

// Component
import Post from "../components/Post.js";

export default function Home() {
  const context = useContext(UserContext);

  useEffect(() => {
    fetchUserPostsAndInfo();
  }, []);

  const fetchUserPostsAndInfo = async () => {
    try {
      // Get all user's posts
      const postsPromise = fetch(
        `https://jsonplaceholder.typicode.com/users/${context.userId}/posts`
      ).then((response) => response.json());
      // Get user's info
      const userDataPromise = fetch(
        `https://jsonplaceholder.typicode.com/users/${context.userId}`
      ).then((response) => response.json());

      const [postsData, userData] = await Promise.all([
        postsPromise,
        userDataPromise,
      ]);

      context.setUserPosts(postsData);
      context.setUserData(userData);
    } catch (error) {
      console.error("Error fetching user's data:", error);
    }
  };

  return (
    <SafeAreaView style={styles.homeView}>
      <Text style={styles.title}>Homepage</Text>

      <View style={styles.homeContent}>
        <FlatList
          style={styles.list}
          data={context.userPosts}
          ListHeaderComponent={() => (
            <Text style={styles.subtitle}>Find your posts on this page.</Text>
          )}
          renderItem={(data) => (
            <Post
              title={data.item.title}
              body={data.item.body}
              user={context.userData}
              postId={data.item.id}
            />
          )}
          keyExtractor={(_data, index) => index.toString()}
        />
      </View>
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
    // marginBottom: 30,
  },
  list: {
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
