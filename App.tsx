import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {WelcomeScreen} from './src/screens/WelcomeScreen';
import {Home} from './src/screens/Home';
import {AddAlbum} from './src/screens/AddAlbum';
import {ChallengesScreen} from './src/screens/ChallengesScreen';
import {Profile} from './src/screens/Profile';
import {ViewDetails} from './src/screens/ViewDetails';
import {AlbumDetails} from './src/screens/AlbumDetails';
import {ExploreDetail} from './src/screens/ExploreDetail';
import {Explore} from './src/screens/Explore';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: 'gold',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {backgroundColor: '#000'},
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Albums') {
            iconName = focused ? 'images' : 'images-outline';
          } else if (route.name === 'Challenges') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Albums" component={AddAlbum} />
      <Tab.Screen name="Challenges" component={ChallengesScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="ViewDetails" component={ViewDetails} />
        <Stack.Screen name="AlbumDetails" component={AlbumDetails} />
        <Stack.Screen name="ExploreDetail" component={ExploreDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
