import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";

// Icons
import Icon from "react-native-vector-icons/FontAwesome";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <View style={styles.navbar}>
      <View style={styles.navLinks}>
        <TouchableOpacity
          onPress={() => navigate("/home")}
          style={styles.navBtn}
        >
          <Icon name="home" size={30} color="white" />
          <Text style={styles.navTxt}>Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linkContainer}>
        <TouchableOpacity
          onPress={() => navigate("/newpost")}
          style={styles.navBtn}
        >
          <Icon name="edit" size={30} color="white" />
          <Text style={styles.navTxt}>Write a post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linkContainer}>
        <TouchableOpacity
          onPress={() => navigate("/profile")}
          style={styles.navBtn}
        >
          <Icon name="user" size={30} color="white" />
          <Text style={styles.navTxt}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "008080",
    flexDirection: "row",
    padding: 10,
    position: "fixed",
    bottom: 0,
    width: "100%",
  },

  navLinks: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  navBtn: {
    alignItems: "center",
    color: "white",
  },
  navTxt: {
    color: "white",
  },
});
