import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const Home = () => {
  const navigation = useNavigation<any>();

  const featuredQuests = [
    {
      id: 'f1',
      title: 'Midnight Secrets',
      description: 'Solve eerie mysteries under the moonlit sky.',
    },
    {
      id: 'f2',
      title: 'Sunrise Adventure',
      description: 'Catch the first rays of sunlight in hidden city spots.',
    },
    {
      id: 'f3',
      title: 'Underground Exploration',
      description: 'Discover tunnels and passageways beneath the city.',
    },
  ];

  const allQuests = [
    {
      id: '1',
      title: 'Historical Mystery',
      description: 'Uncover the hidden history behind an ancient landmark.',
    },
    {
      id: '2',
      title: 'Art Expedition',
      description:
        'Discover modern art installations scattered around the city.',
    },
    {
      id: '3',
      title: 'Secret Garden',
      description: 'Find the hidden garden tucked away in an urban corner.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>City Quest</Text>
        <Text style={styles.description}>
          Uncover the hidden secrets of your city with exciting quests and
          adventures.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Quests</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.featuredScroll}>
          {featuredQuests.map(quest => (
            <View key={quest.id} style={styles.featuredCard}>
              <Text style={styles.featuredTitle}>{quest.title}</Text>
              <Text style={styles.featuredDescription}>
                {quest.description}
              </Text>
              <TouchableOpacity
                style={styles.featuredButton}
                onPress={() => navigation.navigate('ViewDetails', {quest})}>
                <Text style={styles.featuredButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Quests</Text>
        {allQuests.map(quest => (
          <View key={quest.id} style={styles.questCard}>
            <Text style={styles.questTitle}>{quest.title}</Text>
            <Text style={styles.questDescription}>{quest.description}</Text>
            <TouchableOpacity
              style={styles.questButton}
              onPress={() => navigation.navigate('ViewDetails', {quest})}>
              <Text style={styles.questButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>About City Quest</Text>
        <Text style={styles.aboutDescription}>
          City Quest is a dynamic mobile experience designed to help you explore
          your city's hidden gems. From historical landmarks to modern art
          installations, embark on interactive quests that combine fun, culture,
          and education. Discover secrets, solve puzzles, and enjoy an immersive
          adventure, all from the convenience of your smartphone.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 28,
    color: 'gold',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  section: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    color: 'gold',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  featuredScroll: {
    flexGrow: 0,
  },
  featuredCard: {
    width: 220,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 15,
    marginRight: 15,
  },
  featuredTitle: {
    fontSize: 18,
    color: 'gold',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  featuredDescription: {
    fontSize: 14,
    color: 'white',
    marginBottom: 10,
  },
  featuredButton: {
    backgroundColor: 'gold',
    paddingVertical: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
  },
  featuredButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  questCard: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  questTitle: {
    fontSize: 20,
    color: 'gold',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  questDescription: {
    fontSize: 14,
    color: 'white',
    marginBottom: 10,
  },
  questButton: {
    backgroundColor: 'gold',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  questButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  aboutSection: {
    marginTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  aboutTitle: {
    fontSize: 22,
    color: 'gold',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  aboutDescription: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 22,
  },
});
