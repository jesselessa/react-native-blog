import { useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigate } from "react-router-native";

// Context
import { UserContext } from "../contexts/UserContext.js";

export default function Post({ title, body, user, postId, onDeletePost }) {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostComments();
  }, []);

  async function fetchPostComments() {
    //TODO - Put fonction in context
    await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    )
      .then((response) => response.json())
      .then((data) => context.setComments(data))
      .catch((error) =>
        console.error(
          "Error fetching post comments localized in Post.js:",
          error
        )
      );
  }

  const handleDelete = () => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: onDeletePost, style: "destructive" },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate(`/comments/${postId}`)}
      >
        <Text style={styles.btnTxt}>
          Commentaires ({context.comments.length})
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});
