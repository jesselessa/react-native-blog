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
import { UserContext } from "../App.js";

const Login = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState(false);

  const handlePress = () => {
    if (context.userId >= 1 && context.userId <= 10) {
      setErrorMsg(false);
      navigate("/home");
    } else {
      setErrorMsg(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.title}>Log in</Text>
        <TextInput
          placeholder="Enter your ID"
          placeholderTextColor="#333"
          style={styles.input}
          value={context.userId}
          keyboardType="numeric"
          onChangeText={context.setUserId}
        />
        {errorMsg && (
          <Text style={styles.errorMsg}>
            Veuillez entrer un ID entre 1 et 10.
          </Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.btnTxt}>Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#aeecef",
  },
  subcontainer: {
    width: "90%",
  },
  title: {
    fontSize: 50,
    textAlign: "center",
    marginBottom: 275,
    color: "teal",
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  errorMsg: {
    color: "crimson",
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
    color: "white",
    fontSize: 20,
  },
});
