import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Location {
  id: string;
  title: string;
  description: string;
  image: string;
}

type ExploreDetailParams = {
  location: Location;
};

type ExploreDetailRouteProp = RouteProp<
  {ExploreDetail: ExploreDetailParams},
  'ExploreDetail'
>;

export const ExploreDetail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ExploreDetailRouteProp>();
  const {location} = route.params;

  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<string[]>([]);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const storedComments = await AsyncStorage.getItem(
          `comments_${location.id}`,
        );
        if (storedComments !== null) {
          setComments(JSON.parse(storedComments));
        }
      } catch (error) {
        console.error('Error loading comments:', error);
      }
    };
    loadComments();
  }, [location.id]);

  const handlePostComment = async () => {
    if (newComment.trim() !== '') {
      const updatedComments = [...comments, newComment.trim()];
      setComments(updatedComments);
      setNewComment('');
      try {
        await AsyncStorage.setItem(
          `comments_${location.id}`,
          JSON.stringify(updatedComments),
        );
      } catch (error) {
        console.error('Error saving comment:', error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: location.image}} style={styles.image} />
      <Text style={styles.title}>{location.title}</Text>
      <Text style={styles.description}>{location.description}</Text>

      <View style={styles.commentsSection}>
        <Text style={styles.commentsHeader}>Comments / Map Location</Text>
        {comments.map((comment, index) => (
          <Text key={index} style={styles.commentItem}>
            {comment}
          </Text>
        ))}
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment or map location..."
            placeholderTextColor="gray"
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity
            style={styles.postButton}
            onPress={handlePostComment}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>

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
    paddingVertical: 40,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 26,
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
  commentsSection: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  commentsHeader: {
    fontSize: 20,
    color: 'gold',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentItem: {
    fontSize: 14,
    color: 'white',
    marginBottom: 5,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gold',
    borderRadius: 5,
    padding: 10,
    color: 'white',
  },
  postButton: {
    backgroundColor: 'gold',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  postButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
