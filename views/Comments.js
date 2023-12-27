import { useContext, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useParams, useNavigate } from "react-router-native";
import { StyleSheet, SafeAreaView, Text, FlatList } from "react-native";

// Components
import Comment from "../components/Comment";

// Icon
import Icon from "react-native-vector-icons/FontAwesome";

// Context
import { PostsContext } from "../contexts/postsContext.js";

export default function Comments() {
  const { postComs, setPostComs, isLoading, setIsLoading } =
    useContext(PostsContext);

  const { postId } = useParams();
  
  const navigate = useNavigate();

  // Fetch post comments on component mounting
  useEffect(() => {
    const fetchPostComments = async (postId) => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
        );

        if (!response.ok) {
          const errorMsg = response.text();
          throw new Error(errorMsg);
        }

        const data = await response.json();
        setPostComs(data);
      } catch (error) {
        console.error("Failed fetching post comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostComments(postId);
  }, [postId, setPostComs]);

  const handleBackPress = () => {
    navigate(-1);
  };

  return (
    <SafeAreaView style={styles.commentsView}>
      <Text style={styles.title}>Comments</Text>
      <Icon
        style={styles.backButton}
        name="arrow-circle-left"
        size={48}
        color="crimson"
        onPress={handleBackPress}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#054a91" />
      ) : postComs === 0 ? (
        <Text style={styles.noPostMessage}>No comment.</Text>
      ) : (
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
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  commentsView: {
    flex: 1,
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
    marginBottom: 20,
  },
  backButton: {
    marginLeft: 20,
    marginBottom: 15,
  },
  backButtonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  noPostMessage: {
    fontSize: 22,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  listContainer: {
    width: "100%",
    padding: 20,
  },
});
