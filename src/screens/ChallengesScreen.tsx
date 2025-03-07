import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

export const ChallengesScreen = () => {
  const [challenges, setChallenges] = useState([
    {
      id: '1',
      title: 'Discover the Hidden Mural',
      description: 'Find and take a photo of a hidden mural in your city.',
      completed: false,
    },
    {
      id: '2',
      title: 'Historical Landmark Visit',
      description: 'Visit an ancient landmark and learn its history.',
      completed: false,
    },
    {
      id: '3',
      title: 'Artistic Expression',
      description:
        'Find a modern art installation and share your thoughts about it.',
      completed: false,
    },
    {
      id: '4',
      title: 'Secret Garden Stroll',
      description: 'Discover a secret garden and enjoy a quiet moment.',
      completed: false,
    },
  ]);

  const markChallengeComplete = (id: any) => {
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.id === id && !challenge.completed) {
        Alert.alert('Success', 'Challenge completed successfully!');
        return {...challenge, completed: true};
      }
      return challenge;
    });
    setChallenges(updatedChallenges);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Daily Challenges</Text>
      {challenges.map(challenge => (
        <View key={challenge.id} style={styles.challengeCard}>
          <Text style={styles.challengeTitle}>{challenge.title}</Text>
          <Text style={styles.challengeDescription}>
            {challenge.description}
          </Text>
          {!challenge.completed ? (
            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => markChallengeComplete(challenge.id)}>
              <Text style={styles.completeButtonText}>Mark as Complete</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.completedText}>Completed</Text>
          )}
        </View>
      ))}
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
  challengeCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  challengeTitle: {
    fontSize: 20,
    color: 'gold',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  challengeDescription: {
    fontSize: 14,
    color: 'white',
    marginBottom: 10,
  },
  completeButton: {
    backgroundColor: 'gold',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  completeButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  completedText: {
    color: 'lime',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
