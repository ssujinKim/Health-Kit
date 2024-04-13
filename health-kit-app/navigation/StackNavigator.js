import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SigninPage from '../pages/Signin';
import NicknamePage from '../pages/Signup/Nickname';
import EmailPage from '../pages/Signup/Email';
import PasswordPage from '../pages/Signup/Password';
import HealthPage from '../pages/Signup/Health';
import MainPage from '../pages/Main';
import Mypage from '../pages/Mypage';
import MypageinfoPage from '../pages/Mypageinfo';
import MypagehealthPage from '../pages/Mypagehealth';

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
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{
          headerLeft: null,
        }}
      />
      <Stack.Screen name="Mypage" component={Mypage} />
      <Stack.Screen name="MypageinfoPage" component={MypageinfoPage} />
      <Stack.Screen name="MypagehealthPage" component={MypagehealthPage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
