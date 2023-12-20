import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-native";

// Icons
import Icon from "react-native-vector-icons/FontAwesome";

// Context
import { UserContext } from "../contexts/userContext.js";

export default function Navbar() {
  const { isLogged } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <>
      {isLogged && (
        <View style={styles.navbar}>
          <Icon
            name="home"
            size={32}
            color="#fff"
            onPress={() => navigate("/home")}
          />

          <Icon
            name="edit"
            size={30}
            color="#fff"
            onPress={() => navigate("/addpost")}
          />

          <Icon
            name="user"
            size={30}
            color="#fff"
            onPress={() => navigate("/profile")}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    width: "100%",
    height: 50,
    backgroundColor: "teal",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    bottom: 0,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },

  navBtn: {
    alignItems: "center",
    color: "white",
  },
  navTxt: {
    color: "white",
  },
});
