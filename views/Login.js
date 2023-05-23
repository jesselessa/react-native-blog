import { useState, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigate } from "react-router-native";

// Context
import { UserContext } from "../contexts/UserContext.js";

export default function Login() {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState(false);

  const handleLogin = () => {
    if (context.userId >= 1 && context.userId <= 10) {
      setErrorMsg(false);
      context.setIsLogged(true);
      navigate("/home");
    } else {
      setErrorMsg(true);
      context.setIsLogged(false);
    }
  };

  return (
    <SafeAreaView style={styles.loginView}>
      <Text style={styles.title}>React Native Blog</Text>

      <View style={styles.content}>
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f8fcda",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 10,
    // marginBottom: 275,
    color: "#f17300",
  },
  content: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
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
    color: "crimson",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    width: "100%",
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
