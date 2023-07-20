import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigate } from "react-router-native";

// Context
import { UserContext } from "../contexts/UserContext.js";

export default function AddPost() {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (title && body) {
      const newPost = {
        title,
        body,
        user: {
          name: context.userData.name,
          username: context.userData.username,
        },
        postId: context.userPosts.length + 1,
      };

      fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${context.userId}`,
        {
          method: "POST",
          body: JSON.stringify(post),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          context.setUserPosts([...context.userPosts, newPost]);
        })
        .catch((error) =>
          console.log("Error adding a post localized in AddPost.js:", error)
        );

      // Reset form fields
      setTitle("");
      setBody("");

      // Go to homepage
      navigate("/home");
    } else {
      setErrorMsg("Enter a title and a text.");
    }
  };

  return (
    <SafeAreaView style={styles.addPostView}>
      <Text style={styles.title}>Create New Post</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />
        <Text style={styles.label}>Text</Text>
        <TextInput
          style={styles.textarea}
          value={body}
          onChangeText={setBody}
          multiline={true}
        />

        {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addPostView: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8fcda",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#f17300",
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
