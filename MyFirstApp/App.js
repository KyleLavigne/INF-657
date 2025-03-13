import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const tasksData = [
  { id: '1', title: 'Buy Groceries', description: 'Milk, Eggs, Bread, Butter', image: 'https://picsum.photos/100', completed: false },
  { id: '2', title: 'Workout', description: 'Go for a 30-minute run', image: 'https://picsum.photos/101', completed: false },
  { id: '3', title: 'Read a Book', description: 'Read 20 pages of a novel', image: 'https://picsum.photos/102', completed: false },
];

const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState(tasksData);

  const markCompleted = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TaskDetails', { task: item })}>
      <View style={[styles.taskCard, item.completed && styles.completedTask]}>
        <Image source={{ uri: item.image }} style={styles.taskImage} />
        <View style={styles.taskInfo}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDescription}>{item.description}</Text>
          <TouchableOpacity style={styles.completeButton} onPress={() => markCompleted(item.id)}>
            <Text style={styles.completeButtonText}>{item.completed ? 'Undo' : 'Complete'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList data={tasks} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
};

const TaskDetailsScreen = ({ route }) => {
  const { task } = route.params;
  return (
    <View style={styles.detailsContainer}>
      <Image source={{ uri: task.image }} style={styles.detailsImage} />
      <Text style={styles.detailsTitle}>{task.title}</Text>
      <Text style={styles.detailsDescription}>{task.description}</Text>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tasks" component={TaskListScreen} />
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  taskCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  completedTask: {
    backgroundColor: '#d4edda',
  },
  taskImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  taskInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  },
  completeButton: {
    marginTop: 10,
    backgroundColor: '#6200ea',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  detailsImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
