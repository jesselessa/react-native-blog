import { useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, Text, FlatList } from "react-native";
import { useParams } from "react-router-native";

// Components
import Comment from "../components/Comment";

// Context
import { UserContext } from "../contexts/UserContext.js";

export default function Comments() {
  const context = useContext(UserContext);
  const { postId } = useParams();
  useEffect(() => {
    fetchPostComments();
  }, []);

  const fetchPostComments = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => context.setComments(data))
      .catch((error) => console.error("Error fetching post comments:", error));
  };

  return (
    <SafeAreaView style={styles.commentsView}>
      <Text style={styles.title}>Comments</Text>

      <FlatList
        data={context.comments}
        renderItem={(data) => (
          <Comment
            key={data.item?.id}
            name={data.item?.name}
            email={data.item?.email}
            body={data.item?.body}
          />
        )}
        keyExtractor={(_data, index) => index.toString()}
      ></FlatList>
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
});
