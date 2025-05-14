// screens/TaskDetailScreen.js
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function TaskDetailScreen({ route }) {
  const { task } = route.params;

  const imageSource =
    task.image && task.image.uri
      ? { uri: task.image.uri }
      : typeof task.image === "string"
      ? { uri: task.image }
      : require("../assets/tasks/task-image.png");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={imageSource} style={styles.image} resizeMode="contain" />

      <Text style={styles.title}>{task.title}</Text>

      <Text style={styles.label}>Description:</Text>
      <Text style={styles.text}>{task.description}</Text>

      <Text style={styles.label}>Category:</Text>
      <Text style={styles.text}>{task.category}</Text>

      <Text style={styles.label}>Date & Time:</Text>
      <Text style={styles.text}>
        {new Date(task.dateTime).toLocaleString()}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 4,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    color: "#444",
  },
});
