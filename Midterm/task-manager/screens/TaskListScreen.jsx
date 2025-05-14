// screens/TaskListScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";

export default function TaskListScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks) setTasks(JSON.parse(storedTasks));
      } catch (e) {
        console.error("Failed to load tasks", e);
      }
    };
    if (isFocused) loadTasks();
  }, [isFocused]);

  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const renderRightActions = (id) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => deleteTask(id)}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const imageSource =
      item.image && item.image.uri
        ? { uri: item.image.uri }
        : typeof item.image === "string"
        ? { uri: item.image }
        : require("../assets/tasks/task-image.png");

    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <TouchableOpacity
          style={styles.taskItem}
          onPress={() => navigation.navigate("Details", { task: item })}
        >
          <View style={styles.row}>
            <Image source={imageSource} style={styles.thumbnail} />
            <View style={{ flex: 1 }}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text style={styles.taskMeta}>
                {item.category} - {new Date(item.dateTime).toLocaleString()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No tasks available.</Text>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTask")}
      >
        <Text style={styles.addButtonText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskItem: {
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskMeta: {
    marginTop: 4,
    fontStyle: "italic",
    color: "#666",
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginVertical: 6,
    borderRadius: 8,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#007BFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 28,
    color: "white",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
});
