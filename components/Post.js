import { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";

// Context
import { PostsContext } from "../contexts/postsContext.js";

export default function Post({ postId, title, body, user, onDelete }) {
  const { postComs, setPostComs } = useContext(PostsContext);

  const navigate = useNavigate();

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
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigate(`/comments/${postId}`)}
      >
        <Text style={styles.btnTxt}>Commentaires ({postComs.length})</Text>
      </Pressable>

      {/* Uncomment below if using 'handleDeletePost' function */}
      <Pressable style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
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
    backgroundColor: "crimson",
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
