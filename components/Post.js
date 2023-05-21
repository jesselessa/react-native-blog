import { View, Text, StyleSheet, Button } from "react-native";
// import { useNavigate } from "react-router-native";

export default function Post({ title, body, user }) {
  // const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      <Button
        style={styles.button}
        title="Commentaires"
        // onPress={() => navigate("/comments")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  body: {
    textAlign: "justify",
    marginBottom: 20,
  },
  button: {
    padding: 10,
  },
});
