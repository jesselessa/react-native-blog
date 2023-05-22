import { useState, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { useNavigate } from "react-router-native";

// Context
import { UserContext } from "../App.js";

export default function Login() {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState(false);

  const handleLogin = () => {
    if (parseInt(context.userId) >= 1 && parseInt(context.userId) <= 10) {
      setErrorMsg(false);
      context.setIsLogged(true);
      navigate("/home");
    } else {
      setErrorMsg(true);
      context.setIsLogged(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>React Native Blog</Text>
        <TextInput
          placeholder="Enter your ID"
          placeholderTextColor="#333"
          style={styles.input}
          value={context.userId}
          keyboardType="numeric"
          onChangeText={context.setUserId}
        />
        {errorMsg && (
          <Text style={styles.errorMsg}>Enter an ID between 1 and 10.</Text>
        )}

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.btnTxt}>Log in</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f8fcda",
  },
  content: {
    width: "90%",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 10,
    marginBottom: 275,
    color: "#f17300",
  },
  input: {
    height: 40,
    fontSize: 16,
    fontStyle: "italic",
    color: "#333",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  errorMsg: {
    color: "#dc143c",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "teal",
    height: 40,
  },
  btnTxt: {
    color: "#fff",
    fontSize: 20,
  },
});
