// screens/AddTaskScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Menu, Button as PaperButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function AddTaskScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const categories = ["Home", "Office", "Miscellaneous"];

  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !category || !date) {
      Alert.alert("Please fill in all fields.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      category,
      dateTime: date,
      image: require("../assets/tasks/task-image.png"),
    };

    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      const currentTasks = storedTasks ? JSON.parse(storedTasks) : [];
      const updatedTasks = [newTask, ...currentTasks];
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTitle("");
      setDescription("");
      setCategory(null);
      setDate(new Date());
      navigation.goBack();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    setDatePickerVisibility(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Create Task</Text>

      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Enter task description"
        value={description}
        multiline
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Category:</Text>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <PaperButton
            mode="outlined"
            onPress={() => setMenuVisible(true)}
            style={styles.menuButton}
          >
            {category || "Select Category"}
          </PaperButton>
        }
      >
        {categories.map((cat) => (
          <Menu.Item
            key={cat}
            onPress={() => {
              setCategory(cat);
              setMenuVisible(false);
            }}
            title={cat}
          />
        ))}
      </Menu>

      <Text style={styles.label}>Date & Time:</Text>
      <TouchableOpacity
        onPress={() => setDatePickerVisibility(true)}
        style={styles.dateButton}
      >
        <Text style={styles.dateButtonText}>{date.toLocaleString()}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        date={date}
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Add Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF9E5",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  menuButton: {
    marginBottom: 20,
    borderRadius: 6,
  },
  dateButton: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#007BFF",
    padding: 16,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
