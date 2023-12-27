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
import { UserContext } from "../contexts/userContext.js";

export default function Login() {
  const { userId, setUserId, setIsLogged } = useContext(UserContext);

  const [errorMsg, setErrorMsg] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (userId >= 1 && userId <= 10) {
      setIsLogged(true);
      setErrorMsg(false);
      navigate("/home");
    } else {
      setIsLogged(false);
      setErrorMsg(true);
      setTimeout(() => {
        setErrorMsg(false);
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={styles.loginView}>
      <Text style={styles.title}>React Native Blog</Text>

      <View style={styles.content}>
        <TextInput
          placeholder="Enter your ID"
          placeholderTextColor={"#333"}
          style={styles.input}
          value={userId}
          inputMode="numeric"
          onChangeText={setUserId}
          autoComplete="off"
        />
        {errorMsg && (
          <Text style={styles.errorMsg}>Enter an ID between 1 and 10</Text>
        )}

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.btnTxt}>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f3f6fb",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 10,
    color: "#054a91",
  },
  content: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 18,
    color: "#333",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  errorMsg: {
    color: "crimson",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 15,
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "teal",
    padding: 10,
    marginTop: 5,
  },
  btnTxt: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});
