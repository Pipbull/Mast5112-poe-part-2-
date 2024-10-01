import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('Start');
  const [dishes, setDishes] = useState<string[]>(['Pizza', 'Pasta', 'Burger']);
  const [selectedDish, setSelectedDish] = useState<string | null>(null);
  const [dishDetails, setDishDetails] = useState({ name: '', description: '', course: '', price: '' });

  const handleDishSelect = (dish: string) => {
    setSelectedDish(dish);
    const dishInfo = dishes.find(d => d === dish) || ''; // Get the selected dish info
    setDishDetails({ name: dishInfo, description: '', course: '', price: '' }); // Set details for editing
    setCurrentScreen('Third');
  };

  const handleAddDish = () => {
    if (dishDetails.name.trim() !== '') {
      // Add new dish only if name is provided
      setDishes((prevDishes) => [...prevDishes, dishDetails.name]);
      setDishDetails({ name: '', description: '', course: '', price: '' }); // Clear input fields
      setCurrentScreen('Second'); // Navigate back to the dish list
    }
  };

  const handleDeleteDish = () => {
    if (selectedDish) {
      setDishes(dishes.filter(dish => dish !== selectedDish)); // Remove the selected dish
      setCurrentScreen('Second'); // Navigate back to the dish list
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Start':
        return (
          <View style={styles.container}>
            <Image source={require('./assets/front_image.png')} style={styles.frontImage} />
            <Image source={require('./assets/logo.png')} style={styles.logoImage} />
            <Text style={styles.navText}>Welcome to Chef's Corner</Text>
            
            {/* Total Number of Menu Items */}
            <Text style={styles.menuCountText}>Total Menu Items: {dishes.length}</Text>
            
            {/* Display Menu Items */}
            <View style={styles.menuPreview}>
              {dishes.map((dish) => (
                <Text key={dish} style={styles.dishItem}>{dish}</Text>
              ))}
            </View>

            <TouchableOpacity style={styles.exploreButton} onPress={() => setCurrentScreen('Second')}>
              <Text style={styles.exploreButtonText}>Explore Dishes</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Second':
        return (
          <View style={styles.container}>
            <Text style={styles.header}>Chef's Dish List</Text>
            {dishes.map((dish) => (
              <TouchableOpacity key={dish} onPress={() => handleDishSelect(dish)}>
                <Text style={styles.dishItem}>{dish}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.actionButton} onPress={() => {
              setDishDetails({ name: '', description: '', course: '', price: '' }); // Clear input fields for new dish
              setCurrentScreen('Third'); // Navigate to the edit screen for a new dish
            }}>
              <Text style={styles.buttonText}>Add New Dish</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => setCurrentScreen('Start')}>
              <Text style={styles.buttonText}>Back to Start</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Third':
        return (
          <View style={styles.container}>
            <TouchableOpacity style={styles.topButton} onPress={() => setCurrentScreen('Second')}>
              <Text>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteDish}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            <View style={styles.dishEditContainer}>
              <TextInput
                placeholder="Dish Name"
                value={dishDetails.name}
                onChangeText={(text) => setDishDetails({ ...dishDetails, name: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Description"
                value={dishDetails.description}
                onChangeText={(text) => setDishDetails({ ...dishDetails, description: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Available Courses"
                value={dishDetails.course}
                onChangeText={(text) => setDishDetails({ ...dishDetails, course: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Price"
                value={dishDetails.price}
                onChangeText={(text) => setDishDetails({ ...dishDetails, price: text })}
                style={styles.input}
              />
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleAddDish}>
              <Text style={styles.buttonText}>Save Dish</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Fourth':
        return (
          <View style={styles.container}>
            <Image source={require('./assets/goodbye.png')} style={styles.goodbyeImage} />
            <TouchableOpacity style={styles.actionButton} onPress={() => setCurrentScreen('Start')}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return <Text>Unknown Screen</Text>;
    }
  };

  return <View style={styles.appContainer}>{renderScreen()}</View>;
};

// Styles
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  frontImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    position: 'absolute',
    top: 20,
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 220,
  },
  navText: {
    color: 'black',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuCountText: {
    marginTop: 15,
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
  menuPreview: {
    marginTop: 20,
  },
  dishItem: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  exploreButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 30,
  },
  exploreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  topButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 60, // Lowered the delete button
    right: 10,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dishEditContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    marginBottom: 20,
    paddingLeft: 8,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
  },
  goodbyeImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default App;/*end of code*/


















