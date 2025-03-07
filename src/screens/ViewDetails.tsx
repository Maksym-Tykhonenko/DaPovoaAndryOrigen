import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

export const ViewDetails = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const {quest} = route.params;

  const questions = [
    {
      id: 'q1',
      questTitle: 'Historical Mystery',
      question: 'Which year was the fortress built?',
      options: ['1066', '1204', '1346', '1602'],
      correct: '1204',
    },
    {
      id: 'q2',
      questTitle: 'Historical Mystery',
      question: 'Which historical figure once resided in this fortress?',
      options: [
        'King Arthur',
        'Queen Elizabeth I',
        'Napoleon Bonaparte',
        'Leonardo da Vinci',
      ],
      correct: 'Queen Elizabeth I',
    },
    {
      id: 'q3',
      questTitle: 'Historical Mystery',
      question: 'During which conflict was the fortress used as a stronghold?',
      options: [
        'War of the Roses',
        'Hundred Years War',
        'English Civil War',
        'World War II',
      ],
      correct: 'English Civil War',
    },
    {
      id: 'q4',
      questTitle: 'Art Expedition',
      question:
        'Which famous painter is credited with igniting the Impressionist movement?',
      options: [
        'Vincent van Gogh',
        'Claude Monet',
        'Pablo Picasso',
        'Salvador Dalí',
      ],
      correct: 'Claude Monet',
    },
    {
      id: 'q5',
      questTitle: 'Art Expedition',
      question:
        'Where can you find the largest modern art installation in the city?',
      options: [
        'Riverside Park',
        'Downtown Square',
        'Art District Plaza',
        'Historic Castle Courtyard',
      ],
      correct: 'Art District Plaza',
    },
    {
      id: 'q6',
      questTitle: 'Art Expedition',
      question: 'Which material is commonly used in contemporary sculpture?',
      options: ['Bronze', 'Marble', 'Plastic', 'Wood'],
      correct: 'Bronze',
    },

    // Secret Garden
    {
      id: 'q7',
      questTitle: 'Secret Garden',
      question: 'Which type of plant is famously grown in the hidden garden?',
      options: ['Roses', 'Tulips', 'Sunflowers', 'Lavender'],
      correct: 'Roses',
    },
    {
      id: 'q8',
      questTitle: 'Secret Garden',
      question:
        'Which season is considered the best for visiting the secret garden?',
      options: ['Spring', 'Summer', 'Autumn', 'Winter'],
      correct: 'Spring',
    },
    {
      id: 'q9',
      questTitle: 'Secret Garden',
      question:
        'Which feature is most commonly found in a traditional garden design?',
      options: [
        'Fountains',
        'Neon Lights',
        'Digital Screens',
        'Plastic Statues',
      ],
      correct: 'Fountains',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (option: any) => {
    if (option === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{quest.title}</Text>
      {quizFinished ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Quiz Finished!</Text>
          <Text style={styles.resultText}>
            Your score: {score} / {questions.length}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Back to Details</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.quizContainer}>
          <Text style={styles.question}>
            {questions[currentQuestion].question}
          </Text>
          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: 'gold',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  quizContainer: {
    marginTop: 20,
  },
  question: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: 'gold',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  optionText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    color: 'white',
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'gold',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});
