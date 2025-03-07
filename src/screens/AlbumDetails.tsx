import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

export const AlbumDetails = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const {album} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{album.title}</Text>
      <Text style={styles.description}>{album.description}</Text>
      <ScrollView horizontal style={styles.imagesContainer}>
        {album.images.map((uri: any, index: any) => (
          <Image key={index} source={{uri}} style={styles.image} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  imagesContainer: {
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 8,
  },
  backButton: {
    backgroundColor: 'gold',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
