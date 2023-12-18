import { useContext, useState } from "react";
import { useNavigate } from "react-router-native";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

// Context
import { UserContext } from "../contexts/userContext.js";

export default function Profile() {
  const { setInputUserId, setIsLogged, userData, userPosts } =
    useContext(UserContext);

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [btnText, setBtnText] = useState("Add a picture");

  // To select images/videos from the phone library or take a photo with the camera
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setBtnText("Change picture");
    }
    // else {
    //   alert("You did not select any image.");
    // }
  };

  return (
    <SafeAreaView style={styles.profileView}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.profileContent}>
        <View style={styles.imgBtnContainer}>
          <View style={styles.imgBox}>
            <Image
              style={styles.img}
              source={
                selectedImage !== null
                  ? { uri: selectedImage }
                  : require("../assets/user.png")
              }
            ></Image>
          </View>

          <Pressable style={styles.btn} onPress={pickImageAsync}>
            <Text style={styles.btnTxt}>{btnText}</Text>
          </Pressable>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.info}>
            <Text style={styles.infoTitle}>Name :</Text> {userData.name}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.infoTitle}>Posts number :</Text>{" "}
            {userPosts.length ? userPosts.length : "Aucun"}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.infoTitle}>Username :</Text> {userData.username}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.infoTitle}>Email :</Text> {userData.email}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.infoTitle}>Phone :</Text>{" "}
            {userData.phone ? userData.phone : "Non renseigné"}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.infoTitle}>Website :</Text>{" "}
            {userData.website ? userData.website : "Non renseigné"}
          </Text>
          <Pressable
            style={styles.logoutBtn}
            onPress={() => {
              navigate("/");
              setInputUserId("");
              setIsLogged(false);
            }}
          >
            <Text style={styles.btnTxt}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f8fcda",
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#f17300",
    textAlign: "center",
    marginBottom: 20,
  },
  profileContent: {
    height: "90%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  imgBtnContainer: {
    height: "40%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  imgBox: {
    width: 160,
    height: 160,
    backgroundColor: "#fff",
    borderRadius: 100,
    marginBottom: 20,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    objectFit: "cover",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "teal",
    color: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  btnTxt: {
    textAlign: "center",
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  infoContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    gap: 10,
  },
  info: {
    fontSize: 20,
  },
  infoTitle: {
    fontWeight: "bold",
    color: "#054a91",
  },
  logoutBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "crimson",
    padding: 10,
    borderRadius: 5,
  },
});
