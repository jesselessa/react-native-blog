import { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

// Context
import { UserContext } from "../App.js";

export default function Post({ title, body, user, postId }) {
  const context = useContext(UserContext);
  const [commentsNb, setCommentsNb] = useState(0);

  useEffect(() => {
    fetchPostComments();
  }, []);

  const fetchPostComments = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => {
        const comments = data;
        setCommentsNb(comments.length);
      })
      .catch((error) => console.error("Error fetching post comments:", error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigate("/comments")}
      >
        <Text style={styles.btnTxt}>Commentaires({commentsNb})</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
  },
  postId: {
    fontSize: 24,
    fontWeight: "bold",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#008080",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f17300",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#054a91",
    textTransform: "capitalize",
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#008080",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  btnTxt: {
    color: "#fff",
    textAlign: "center",
  },
});
