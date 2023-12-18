import { useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, Text, FlatList } from "react-native";
import { useParams } from "react-router-native";

// Components
import Comment from "../components/Comment";

// Context
import { PostsContext } from "../contexts/postsContext.js";

export default function Comments() {
  const { postId } = useParams();
  const { comments, fetchPostComments } = useContext(PostsContext);

  useEffect(() => {
    fetchPostComments;
  }, [postId]);

  // async function fetchPostComments(postId) {
  //   await fetch(
  //     `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setComments(data))
  //     .catch((error) =>
  //       console.error(
  //         "Error fetching post comments localized in Comments.js:",
  //         error
  //       )
  //     );
  // }

  return (
    <SafeAreaView style={styles.commentsView}>
      <Text style={styles.title}>Comments</Text>
      <FlatList
        style={styles.listContainer}
        data={comments}
        renderItem={({ item }) => (
          <Comment name={item.name} email={item.email} body={item.body} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  commentsView: {
    flex: 1,
    alignItems: "center",
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
    width: "100%",
    padding: 20,
  },
});
