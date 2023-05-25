import { useState, useContext } from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { useNavigate } from "react-router-native";

// Context
import { UserContext } from "../contexts/UserContext";

export default function AddPost() {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const addNewPost = () => {
    const post = {
      name: context.setUserData.name,
      username: context.setUserData.username,
      title,
      body,
    };
    
    if (title && body) {
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
          context.setUserPosts([...context.userPosts, post]);
          // context.setUserPosts([...context.userPosts, { title, body }]);
          navigate("/home");
        });
    } else {
      setErrorMsg("Enter a title and a text.");
    }

    return (
      <SafeAreaView style={styles.addPostView}>
        <Text style={styles.viewTitle}>Add a post</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter a title."
          />
          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={10}
            value={body}
            onChangeText={setBody}
            placeholder="Enter a text."
          />
          {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
          <TouchableOpacity style={styles.button} onPress={addNewPost}>
            <Text>Add Post</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    addPostView: {
      flex: 1,
      backgroundColor: "#f8fcda",
      paddingBottom: 50,
    },
    viewTitle: {
      fontSize: 40,
      fontWeight: "bold",
      color: "#f17300",
      textAlign: "center",
      marginBottom: 30,
    },
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

    form: {},
    input: {},
    textArea: {},
    errorMsg: {},
    button: {},
  });
}
