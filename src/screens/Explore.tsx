import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export const Explore = () => {
  const navigation = useNavigation<any>();

  const defaultLocations = [
    {
      id: 'default1',
      title: 'Old Town',
      description: 'Discover historic streets and hidden alleys.',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo2xAz1IJlzL-6wyQJvDjk6Dy-ws4OUSsNew&s',
    },
    {
      id: 'default2',
      title: 'Modern Art District',
      description: 'Explore contemporary galleries and installations.',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSilvPV2_v1T8SvKLh-9okrYg_Fc2qVDa0ujw&s',
    },
    {
      id: 'default3',
      title: 'City Park',
      description: 'Enjoy green spaces and urban relaxation.',
      image: 'https://img.lunstatic.net/building-400x300/91513.jpg',
    },
  ];

  const [userLocations, setUserLocations] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    loadUserLocations();
  }, []);

  const loadUserLocations = async () => {
    try {
      const storedLocations = await AsyncStorage.getItem('exploreLocations');
      if (storedLocations !== null) {
        setUserLocations(JSON.parse(storedLocations));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveLocation = async () => {
    if (!title || !description || !imageUrl) {
      Alert.alert('Missing Data', 'Please fill all fields');
      return;
    }
    const newLocation = {
      id: Date.now().toString(),
      title,
      description,
      image: imageUrl,
    };
    const updatedUserLocations = [...userLocations, newLocation];
    try {
      await AsyncStorage.setItem(
        'exploreLocations',
        JSON.stringify(updatedUserLocations),
      );
      setUserLocations(updatedUserLocations);
      setModalVisible(false);
      setTitle('');
      setDescription('');
      setImageUrl('');
      Alert.alert('Success', 'Location added successfully');
    } catch (error) {
      console.error(error);
    }
  };

  // Merge default locations with user-added locations.
  const allLocations = [...defaultLocations, ...userLocations];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Explore Your City</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add New Location</Text>
      </TouchableOpacity>
      <View style={styles.locationsContainer}>
        {allLocations.map(location => (
          <TouchableOpacity
            key={location.id}
            style={styles.card}
            onPress={() => navigation.navigate('ExploreDetail', {location})}>
            <Image source={{uri: location.image}} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.titleText}>{location.title}</Text>
              <Text style={styles.descText}>{location.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Add New Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="gray"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, {height: 80}]}
            placeholder="Description"
            placeholderTextColor="gray"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            placeholderTextColor="gray"
            value={imageUrl}
            onChangeText={setImageUrl}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveLocation}>
            <Text style={styles.saveButtonText}>Save Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    backgroundColor: '#000',
  },
  header: {
    fontSize: 26,
    color: 'gold',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  addButton: {
    backgroundColor: 'gold',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationsContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    color: 'gold',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descText: {
    fontSize: 14,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  modalHeader: {
    fontSize: 26,
    color: 'gold',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gold',
    borderRadius: 5,
    padding: 10,
    color: 'white',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: 'gold',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#555',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 15,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
