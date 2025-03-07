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
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

export const AddAlbum = () => {
  const navigation = useNavigation<any>();
  const [albums, setAlbums] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState<any>(false);
  const [title, setTitle] = useState<any>('');
  const [description, setDescription] = useState<any>('');
  const [images, setImages] = useState<any>([]);

  useEffect(() => {
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    try {
      const storedAlbums = await AsyncStorage.getItem('albums');
      if (storedAlbums !== null) {
        setAlbums(JSON.parse(storedAlbums));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectImages = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 0}, response => {
      if (response.didCancel) {
        return;
      } else if (response.errorCode) {
        console.error(response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImages = response.assets.map(asset => asset.uri);
        setImages(selectedImages);
      }
    });
  };

  const handleSaveAlbum = async () => {
    if (!title || !description || images.length === 0) {
      Alert.alert(
        'Missing Data',
        'Please fill all fields and select at least one image',
      );
      return;
    }
    const newAlbum = {
      id: Date.now().toString(),
      title,
      description,
      images,
    };
    const updatedAlbums = [...albums, newAlbum];
    try {
      await AsyncStorage.setItem('albums', JSON.stringify(updatedAlbums));
      setAlbums(updatedAlbums);
      Alert.alert('Success', 'Album saved successfully');
      // Reset form and close modal
      setTitle('');
      setDescription('');
      setImages([]);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Art Albums</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add New Album</Text>
      </TouchableOpacity>
      <View style={styles.albumsContainer}>
        {albums.map((album: any) => (
          <TouchableOpacity
            key={album.id}
            onPress={() => navigation.navigate('AlbumDetails', {album})}>
            <View style={styles.albumCard}>
              {album.images.length > 0 && (
                <Image
                  source={{uri: album.images[0]}}
                  style={styles.albumImage}
                />
              )}
              <View style={styles.albumInfo}>
                <Text style={styles.albumTitle}>{album.title}</Text>
                <Text style={styles.albumDescription}>{album.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Add New Album</Text>
          <TextInput
            style={styles.input}
            placeholder="Album Title"
            placeholderTextColor="gray"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, {height: 100}]}
            placeholder="Album Description"
            placeholderTextColor="gray"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <TouchableOpacity
            style={styles.imageButton}
            onPress={handleSelectImages}>
            <Text style={styles.imageButtonText}>Select Album Images</Text>
          </TouchableOpacity>
          {images.length > 0 && (
            <ScrollView horizontal style={styles.imagesPreview}>
              {images.map((uri: any, index: any) => (
                <Image key={index} source={{uri}} style={styles.previewImage} />
              ))}
            </ScrollView>
          )}
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveAlbum}>
            <Text style={styles.saveButtonText}>Save Album</Text>
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
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    fontSize: 28,
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
  albumsContainer: {
    paddingHorizontal: 10,
  },
  albumCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  albumImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  albumInfo: {
    flex: 1,
    padding: 10,
  },
  albumTitle: {
    fontSize: 18,
    color: 'gold',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  albumDescription: {
    fontSize: 14,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  modalHeader: {
    fontSize: 28,
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
  imageButton: {
    backgroundColor: 'gold',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 15,
  },
  imageButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagesPreview: {
    marginBottom: 15,
  },
  previewImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 8,
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
