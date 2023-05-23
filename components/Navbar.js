import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";

// Icons
import Icon from "react-native-vector-icons/FontAwesome";

export default function Navbar() {
  const navigate = useNavigate();

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
