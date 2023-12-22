import { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { useNavigate } from "react-router-native";

// Contexts
import { UserContext } from "../contexts/userContext.js";
import { PostsContext } from "../contexts/postsContext.js";

export default function AddPost() {
  const { userData } = useContext(UserContext);
  const { posts, setPosts, setComments, newPost, setNewPost, setIsLoading } =
    useContext(PostsContext);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [shownMsg, setShownMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const navigate = useNavigate();

  // Fetch all users's posts and comments on component mounting
  useEffect(() => {
    const fetchAllPostsAndComs = async () => {
      try {
        setIsLoading(true); // Start of loading

        // Get all posts
        const postsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts`
        );
        const postsData = await postsResponse.json();
        setPosts(postsData);

        // Get all comments
        const commentsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/comments`
        );
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching all posts and comments:", error);
      } finally {
        setIsLoading(false); // End of loading (success or not)
      }
    };

    fetchAllPostsAndComs();
  }, [setPosts, setComments]);

  const handleFormSubmit = async () => {
    if (title && body) {
      setNewPost({
        userId: userData.id,
        id: posts.length + 1,
        title: title,
        body: body,
      });

      try {
        const newPostResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            method: "POST",
            body: JSON.stringify(newPost),
          }
        );

        const newPostData = await newPostResponse.json();

        // Update posts
        setPosts((prevPosts) => [...prevPosts, newPostData]);
        // Note : using this functional form, instead of setPosts([...posts, newPostData]), ensures that we are using the most recent state at the time of the update, even if other updates have occurred asynchronously

        // Reset form fields
        setTitle("");
        setBody("");

        // Display success message during 2s
        setShownMsg(true);
        setTimeout(() => {
          setShownMsg(false);
        }, 2000);
        console.log("New post created.");

        // Go back to homepage after 2s
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } catch (error) {
        console.error("Error adding post:", error);
      }
    } else {
      setErrorMsg(true);
      setTimeout(() => {
        setErrorMsg(false);
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={styles.addPostView}>
      <Text style={styles.title}>Create a post</Text>

      <View style={styles.form}>
        {shownMsg && <Text style={styles.shownMsg}>Post created !</Text>}

        <TextInput
          style={styles.input}
          placeholder="Write a title..."
          placeholderTextColor={"#333"}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.textarea}
          placeholder="Write a text..."
          placeholderTextColor={"#333"}
          value={body}
          onChangeText={setBody}
          multiline={true}
        />

        {errorMsg && (
          <Text style={styles.errorMsg}>Enter a title and a text.</Text>
        )}

        <Pressable style={styles.button} onPress={handleFormSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addPostView: {
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
  },
  form: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  shownMsg: {
    color: "#054a91",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 22,
    color: "#054a91",
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    height: 50,
    fontSize: 18,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 30,
  },
  textarea: {
    height: 200,
    fontSize: 18,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  errorMsg: {
    color: "crimson",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#054a91",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
});
