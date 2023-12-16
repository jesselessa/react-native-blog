import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";

// Icons
import Icon from "react-native-vector-icons/FontAwesome";

// Context
import { UserContext } from "../contexts/userContext.js";
import { useContext } from "react";

export default function Navbar() {
  const { isLogged } = useContext;

  const navigate = useNavigate(UserContext);

  if (!isLogged) {
    return null; // Not to display navbar if user not connected
  }

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        onPress={() => navigate("/home")}
        style={styles.navBtn}
        size={32}
      >
        <Icon name="home" size={32} color="#fff" />
        <Text style={styles.navTxt}></Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigate("/addpost")}
        style={styles.navBtn}
      >
        <Icon name="edit" size={32} color="#fff" />
        <Text style={styles.navTxt}></Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigate("/profile")}
        style={styles.navBtn}
      >
        <Icon name="user" size={32} color="#fff" />
        <Text style={styles.navTxt}></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 50,
    backgroundColor: "teal",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    bottom: 0,
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: "100%",
  },

  navBtn: {
    alignItems: "center",
    color: "white",
  },
  navTxt: {
    color: "white",
  },
});
