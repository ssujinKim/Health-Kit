import React from 'react';
import {StatusBar} from 'expo-status-bar';

import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './pages/Signup/UserContext';
import Nickname from './pages/Signup/Nickname';
import Password from './pages/Signup/Password';
import Health from './pages/Signup/Health';
import Email from './pages/Signup/Email';
//import { EmailProvider } from './pages/EmailContext';
//import Signin from './pages/Signin';

const Stack = createStackNavigator();

export default function App() {
  console.disableYellowBox = true;

  return (
    <UserProvider>
      <NavigationContainer>
        <StatusBar style="black" />
        <StackNavigator>
          <Stack.Screen name='Nickname' component={Nickname} />
          <Stack.Screen name='Email' component={Email} />
          <Stack.Screen name='Password' component={Password} />
          <Stack.Screen name='Health' component={Health} />
        </StackNavigator>
      </NavigationContainer>
    </UserProvider>
  );
}
