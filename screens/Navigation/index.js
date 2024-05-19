import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../HomeScreen';
import MeetingRoom from '../../components/MeetingRoom';
import VideoCallingScreen from '../VideoCallingScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={HomeScreen}>
        <Stack.Screen name="Home" component={HomeScreen}
        options={{ headerShown: false }} />
        <Stack.Screen name="VideoCallingScreen" component={VideoCallingScreen} 
        options={{ title: '',
        headerStyle: {
          backgroundColor: '#1c1c1c',
        },
        headerTintColor: 'white'
       }}/>
        <Stack.Screen name="MeetingRoom" component={MeetingRoom} 
        options={{ title: 'Start a Video Call',
          headerStyle: {
            backgroundColor: '#1c1c1c',
          },
          headerTintColor: 'white'
         }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
