import { useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, Text, FlatList, Alert } from "react-native";

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
      )
        .then((response) => response.json())
        .catch((error) =>
          console.log("Error fetching user data localized in Home.js:", error)
        );

      const [postsData, userData] = await Promise.all([
        postsPromise,
        userDataPromise,
      ]);

      context.setUserPosts(postsData);
      context.setUserData(userData);
    } catch (error) {
      console.error("Error fetching user's data localized in Home.js:", error);
    }
  };

  const handleDeletePost = (postId) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          // Delete the post
          const updatedPosts = context.userPosts.filter(
            (post) => post.id !== postId
          );
          context.setUserPosts(updatedPosts);
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.homeView}>
      <Text style={styles.title}>Homepage</Text>

      <FlatList
        style={styles.listContainer}
        data={context.userPosts}
        ListHeaderComponent={() => (
          <Text style={styles.subtitle}>Find your posts on this page.</Text>
        )}
        renderItem={({ item }) => (
          <Post
            title={item.title}
            body={item.body}
            user={context.userData}
            postId={item.id}
            onDeletePost={() => handleDeletePost(item.id)}
          />
        )}
        // Alternative below :
        // renderItem={(data) => (
        //   <Post
        //     title={data.item.title}
        //     body={data.item.body}
        //     user={context.userData}
        //     postId={data.item.id}
        //     onDeletePost={() => handleDeletePost(data.item.id)}
        //   />
        // )}
        keyExtractor={(_data, index) => index.toString()}
      />

      {/* New post created by user with form */}
      {context.newPost && (
        <Post
          title={context.newPost.title}
          body={context.newPost.body}
          user={context.newPost.user}
          postId={context.newPost.id}
          onDeletePost={() => handleDeletePost(context.newPost.id)}
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
