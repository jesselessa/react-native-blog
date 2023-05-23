import { StyleSheet, SafeAreaView, View, Text } from "react-native";

export default function AddPost() {
  return (
    <SafeAreaView style={styles.addPostView}>
      <View style={styles.container}>
        <Text style={styles.title}>Add a post</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addPostView: {
    flex: 1,
    backgroundColor: "#f8fcda",
    paddingBottom: 50,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#f17300",
    textAlign: "center",
    marginBottom: 30,
  },
});
