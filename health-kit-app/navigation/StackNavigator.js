import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SigninPage from '../pages/Signin';
import NicknamePage from '../pages/Signup/Nickname';
import EmailPage from '../pages/Signup/Email';
import PasswordPage from '../pages/Signup/Password';
import HealthPage from '../pages/Signup/Health';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
          borderBottomColor: 'white',
          shadowColor: 'white',
          height: 20,
        },
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="SigninPage" component={SigninPage} />
      <Stack.Screen name="NicknamePage" component={NicknamePage} />
      <Stack.Screen name="EmailPage" component={EmailPage} />
      <Stack.Screen name="PasswordPage" component={PasswordPage} />
      <Stack.Screen name="HealthPage" component={HealthPage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
