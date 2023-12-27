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
import * as FileSystem from "expo-file-system";
import sharp from "sharp";

// Context
import { UserContext } from "../contexts/userContext.js";
import { PostsContext } from "../contexts/postsContext.js";

export default function Profile() {
  const { setUserId, setIsLogged, userData } = useContext(UserContext);
  const { userPosts } = useContext(PostsContext);

  const navigate = useNavigate();
  const [selectedImgUrl, setSelectedImgUrl] = useState(null);
  const [btnText, setBtnText] = useState("Add a picture");

  // Select images/videos from phone library or take photo with camera
  const pickImageAsync = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        // Resize image to optimize performance
        const resizedImage = await resizeImage(result.assets[0].uri);
        setSelectedImgUrl(resizedImage);
        setBtnText("Change picture");
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  // Resize image
  const resizeImage = async (uri) => {
    try {
      // Get info about image using its URI
      const imageInfo = await FileSystem.getInfoAsync(uri);

      // Define a new size for image
      const newSize = 500;

      // Use "sharp" library to resize image
      const resizedImage = await sharp(uri).resize(newSize).toBuffer();

      // Define cache directory path for resized image
      const resizedImagePath = `${
        FileSystem.cacheDirectory
      }resized_${imageInfo.uri.split("/").pop()}`;

      // Write resized image to cache directory
      await FileSystem.writeAsStringAsync(resizedImagePath, resizedImage, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Return path of resized image
      return resizedImagePath;
    } catch (error) {
      console.error("Error resizing image:", error);
      // If error, return original URI
      return uri;
    }
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
                selectedImgUrl
                  ? {
                      uri: selectedImgUrl,
                    }
                  : null
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
            <Text style={styles.infoTitle}>Username :</Text> {userData.username}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.infoTitle}>Posts number :</Text>{" "}
            {userPosts.length ? userPosts.length : "No post."}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.infoTitle}>Email :</Text> {userData.email}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.infoTitle}>Phone :</Text>{" "}
            {userData.phone ? userData.phone : "No information."}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.infoTitle}>Website :</Text>{" "}
            {userData.website ? userData.website : "No information."}
          </Text>
          <Pressable
            style={styles.logoutBtn}
            onPress={() => {
              navigate("/");
              setUserId("");
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
    backgroundColor: "#f3f6fb",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#054a91",
    textAlign: "center",
    marginBottom: 25,
  },
  profileContent: {
    height: "90%",
    width: "90%",
    justifyContent: "space-around",
    alignItems: "center",
    overflowY: "auto",
  },
  imgBtnContainer: {
    minHeight: "40%",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
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
    width: "60%",
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
    minHeight: "50%",
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
