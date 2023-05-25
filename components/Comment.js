import { View, Text, StyleSheet } from "react-native";

export default function Comment({ name, email, body }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderStyle: "solid",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#008080",
  },
  email: {
    fontSize: 18,
    color: "#054a91",
    fontWeight: "bold",
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    textAlign: "justify",
  },
});
