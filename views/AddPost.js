import { useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

import { useNavigate } from "react-router-native";

// Context
import { UserContext } from "../contexts/userContext.js";
import { PostsContext } from "../contexts/postsContext.js";

export default function AddPost() {
  const { userId, userData } = useContext(UserContext);
  const { userPosts, setUserPosts, newPost, setNewPost } =
    useContext(PostsContext);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (title && body) {
      setNewPost({
        id: userPosts.length + 1,
        title: title,
        body: body,
        user: {
          name: userData.name,
          username: userData.username,
        },
      });

      try {
        const userPostsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
          {
            method: "POST",
            body: JSON.stringify(newPost),
          }
        );

        const userPostsData = await userPostsResponse.json();

        // Update user's posts
        setUserPosts([...userPostsData, newPost]);
        // Reset form fields
        setTitle("");
        setBody("");
        // Go to homepage
        navigate("/home");
      } catch (error) {
        console.error("Error adding post:", error);
      }
    } else {
      setErrorMsg("Enter a title and a text.");
    }
  };

  return (
    <SafeAreaView style={styles.addPostView}>
      <Text style={styles.title}>Add Post</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.textarea}
          placeholder="Text"
          value={body}
          onChangeText={setBody}
          multiline={true}
        />

        {/* {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>} */}

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
    fontWeight: "bold",
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
