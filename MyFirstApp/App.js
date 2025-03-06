import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  const [greeting, setGreeting] = useState("Welcome to my profile!");
  const userName = "John Doe";

  const updateGreeting = () => {
    setGreeting(prevGreeting => prevGreeting === "Welcome to my profile!" ? "Hope you're having a great day!" : "Welcome to my profile!");
  };

  return (
    <View style={styles.container}>
      <Header title="User Profile" name={userName} imageUrl="https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=" />
      <Text style={styles.greeting}>{greeting}</Text>
      <CustomButton onPress={updateGreeting} title="Update Greeting" />
    </View>
  );
};

const Header = ({ title, name, imageUrl }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.headerProfile}>
        <Text style={styles.headerName}>{name}</Text>
        <Image source={{ uri: imageUrl }} style={styles.headerImage} />
      </View>
    </View>
  );
};

const CustomButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    position: 'absolute',
    top: 50,
    width: '100%',
    backgroundColor: '#6200ea',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerName: {
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#333',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
