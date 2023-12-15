import { useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigate } from "react-router-native";

// Context
import { PostsContext } from "../contexts/postsContext.js";

export default function Post({ title, body, user, postId, onDeletePost }) {
  const { comments, isLoading, setIsLoading, fetchPostComments } =
    useContext(PostsContext);

  const navigate = useNavigate();

  // Fetch post comments on component mounting
  useEffect(async () => {
    fetchData();
  }, [postId, fetchPostComments]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await fetchPostComments(postId);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
      {isLoading ? (
        // To indicate content is loading
        <ActivityIndicator size="large" color="#054a91" />
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate(`/comments/${postId}`)}
          >
            <Text style={styles.btnTxt}>Commentaires ({comments.length})</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </>
      )}
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
