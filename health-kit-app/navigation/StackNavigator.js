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
import FoodcheckPage from '../pages/FoodPhoto/Foodcheck';
import FoodrecommendPage from '../pages/FoodPhoto/Foodrecommend';
import MenuinputPage from '../pages/PersonalFood/Menuinput';
import MenusearchPage from '../pages/PersonalFood/Menusearch';
import MenuaddPage from '../pages/PersonalFood/Menuadd';
import DietrecommendPage from '../pages/PersonalFood/Dietrecommend';

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
      <Stack.Screen name="FoodcheckPage" component={FoodcheckPage} />
      <Stack.Screen name="FoodrecommendPage" component={FoodrecommendPage} />
      <Stack.Screen name="MenuinputPage" component={MenuinputPage} />
      <Stack.Screen name="MenusearchPage" component={MenusearchPage} />
      <Stack.Screen name="MenuaddPage" component={MenuaddPage} />
      <Stack.Screen name="DietrecommendPage" component={DietrecommendPage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
