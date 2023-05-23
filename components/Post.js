import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-native";

export default function Post({ title, body, user, postId }) {
  const [commentsNb, setCommentsNb] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostComments();
  }, []);

  const fetchPostComments = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      const comments = await response.json();
      setCommentsNb(comments.length);
    } catch (error) {
      console.error("Error fetching post comments:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate("/comments")}
      >
        <Text style={styles.btnTxt}>Commentaires ({commentsNb})</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "teal",
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
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "teal",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  btnTxt: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});
