import { useContext, useEffect } from "react";
import { useParams } from "react-router-native";
import { StyleSheet, SafeAreaView, Text, FlatList } from "react-native";

// Components
import Comment from "../components/Comment";

// Context
import { PostsContext } from "../contexts/postsContext.js";

export default function Comments() {
  const { postComs, setPostComs } = useContext(PostsContext);

  const { postId } = useParams();

  // Fetch post comments on component mounting
  useEffect(() => {
    const fetchPostComments = async (postId) => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
        );

        const data = await response.json();
        setPostComs(data);
      } catch (error) {
        console.error("Failed fetching post comments:", error);
      }
    };

    fetchPostComments(postId);
  }, [postId, setPostComs]);

  return (
    <SafeAreaView style={styles.commentsView}>
      <Text style={styles.title}>Comments</Text>
      <FlatList
        style={styles.listContainer}
        data={postComs}
        renderItem={({ item }) => (
          <Comment
            postId={postId}
            name={item?.name}
            email={item?.email}
            body={item?.body}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  commentsView: {
    flex: 1,
    alignItems: "center",
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
  listContainer: {
    width: "100%",
    padding: 20,
  },
});
