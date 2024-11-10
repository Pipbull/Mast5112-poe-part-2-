import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string[]>(['Start']);
  const [dishes, setDishes] = useState<{ name: string, description: string, course: string, price: number }[]>([
    { name: 'Pizza', description: 'Cheesy and delicious', course: 'Main', price: 10 },
    { name: 'Pasta', description: 'Rich in flavor', course: 'Main', price: 8 },
    { name: 'Burger', description: 'Juicy and filling', course: 'Main', price: 12 }
  ]);
  const [dishDetails, setDishDetails] = useState({ name: '', description: '', course: '', price: '' });
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const navigateTo = (screen: string) => {
    setCurrentScreen((prevScreens) => [...prevScreens, screen]);
  };

  const goBack = () => {
    setCurrentScreen((prevScreens) => prevScreens.slice(0, -1));
  };

  const handleAddDish = () => {
    if (dishDetails.name.trim() !== '' && dishDetails.price) {
      setDishes((prevDishes) => [...prevDishes, { ...dishDetails, price: parseFloat(dishDetails.price) }]);
      setDishDetails({ name: '', description: '', course: '', price: '' });
      navigateTo('Menu');
    }
  };

  const handleDeleteDish = (dishName: string) => {
    setDishes(dishes.filter(dish => dish.name !== dishName));
  };

  const calculateAveragePrice = () => {
    if (dishes.length === 0) return 0;
    const total = dishes.reduce((sum, dish) => sum + dish.price, 0);
    return (total / dishes.length).toFixed(2);
  };

  const renderScreen = () => {
    const current = currentScreen[currentScreen.length - 1];

    switch (current) {
      case 'Start':
        return (
          <View style={styles.container}>
            <Image source={require('./assets/front_image.png')} style={styles.frontImage} />
            <Image source={require('./assets/logo.png')} style={styles.logoImage} />
            <Text style={styles.navText}>Welcome to Chef's Corner</Text>
            <Text style={styles.menuCountText}>Average Price: ${calculateAveragePrice()}</Text>

            <TouchableOpacity style={styles.exploreButton} onPress={() => navigateTo('Menu')}>
              <Text style={styles.exploreButtonText}>View Menu</Text>
            </TouchableOpacity>
          </View>
        );

      case 'Menu':
        return (
          <View style={styles.container}>
            <Text style={styles.header}>Chef's Menu</Text>
            <TouchableOpacity style={styles.filterButton} onPress={() => navigateTo('Filter')}>
              <Text style={styles.buttonText}>Filter by Course</Text>
            </TouchableOpacity>
            <FlatList
              data={dishes}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <View style={styles.dishItemContainer}>
                  <Text style={styles.dishItem}>{item.name} - ${item.price}</Text>
                  <TouchableOpacity onPress={() => handleDeleteDish(item.name)}>
                    <Text style={styles.deleteText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity style={styles.actionButton} onPress={() => navigateTo('Add')}>
              <Text style={styles.buttonText}>Add New Dish</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        );

      case 'Add':
        return (
          <View style={styles.container}>
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
              placeholder="Course (e.g., Starter, Main)"
              value={dishDetails.course}
              onChangeText={(text) => setDishDetails({ ...dishDetails, course: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Price"
              keyboardType="numeric"
              value={dishDetails.price}
              onChangeText={(text) => setDishDetails({ ...dishDetails, price: text })}
              style={styles.input}
            />
            <TouchableOpacity style={styles.editButton} onPress={handleAddDish}>
              <Text style={styles.buttonText}>Save Dish</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        );

      case 'Filter':
        return (
          <View style={styles.container}>
            <Text style={styles.header}>Filter by Course</Text>
            {['Starter', 'Main', 'Dessert'].map((course) => (
              <TouchableOpacity
                key={course}
                style={styles.courseButton}
                onPress={() => setSelectedCourse(course)}
              >
                <Text style={styles.courseText}>{course}</Text>
              </TouchableOpacity>
            ))}
            <FlatList
              data={dishes.filter(dish => selectedCourse ? dish.course === selectedCourse : true)}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <Text style={styles.dishItem}>{item.name} - ${item.price}</Text>
              )}
            />
            <TouchableOpacity style={styles.actionButton} onPress={() => navigateTo('Menu')}>
              <Text style={styles.buttonText}>Back to Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Text style={styles.buttonText}>Back</Text>
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
  appContainer: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  frontImage: { width: '100%', height: 200, resizeMode: 'cover', position: 'absolute', top: 20 },
  logoImage: { width: 150, height: 150, resizeMode: 'contain', marginTop: 220 },
  navText: { color: 'black', marginTop: 20, fontSize: 18, fontWeight: 'bold' },
  menuCountText: { marginTop: 15, fontSize: 16, color: '#555', fontWeight: '600' },
  exploreButton: { backgroundColor: '#007AFF', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 25, marginTop: 30 },
  exploreButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  actionButton: { backgroundColor: '#007AFF', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginTop: 20 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, width: 200, marginBottom: 20, paddingLeft: 8, borderRadius: 5 },
  dishItemContainer: { flexDirection: 'row', justifyContent: 'space-between', width: 250, marginVertical: 5 },
  dishItem: { fontSize: 16, color: '#333' },
  deleteText: { color: 'red', fontSize: 14 },
  editButton: { backgroundColor: '#007AFF', borderRadius: 5, padding: 10 },
  filterButton: { backgroundColor: '#34A853', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginTop: 20 },
  backButton: { backgroundColor: '#FF3B30', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginTop: 20 },
  courseButton: { backgroundColor: '#4285F4', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginVertical: 5 },
  courseText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default App;
