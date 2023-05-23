import React from "react";
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
    width: "90%",
    borderStyle: "solid",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#008080",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
  },
  body: {
    fontSize: 16,
    textAlign: "justify",
  },
});
