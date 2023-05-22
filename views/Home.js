import { useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, View, Text, FlatList } from "react-native";

// Component
import Post from "../components/Post.js";

// Context
import { UserContext } from "../App.js";

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
      <View style={styles.homeContent}>
        <Text style={styles.title}>Homepage</Text>

        <FlatList
          style={{ padding: 20 }}
          data={context.userPosts}
          ListHeaderComponent={() => (
            <Text style={styles.subtitle}>
              Retrouvez vos posts sur cette page.
            </Text>
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#f17300",
    textAlign: "center",
    marginBottom: 30,
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
