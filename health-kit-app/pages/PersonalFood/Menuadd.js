import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import axios from 'axios';

export default function Menuadd({navigation, route}) {
  const {email, mealType} = route.params;
  const [food, setFood] = useState('');
  const [carbs, setCarbs] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [calories, setCalories] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: mealType,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: 'black',
    });
  }, [navigation, route.params]);

  // 오늘 날짜 함수
  const getFormattedDate = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2); // getMonth()는 0부터 시작하므로, +1 필요
    let day = ('0' + today.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  };

  const submitData = async () => {
    try {
      console.log(route.params);
      const todayDate = getFormattedDate(); // 오늘 날짜를 구함
      const response = await axios.post('http://10.50.249.191:3000/menuAdd', {
        email: email,
        food: food,
        carbs: carbs,
        protein: protein,
        fat: fat,
        calories: calories,
        date: todayDate,
        meal_type: mealType,
      });
      console.log(response.data);
      Alert.alert('성공', '식단 정보가 업데이트되었습니다.', [{text: '확인'}]);
      navigation.navigate('MenuinputPage', {email: email});
    } catch (error) {
      console.error(error);
      Alert.alert('실패', '데이터 저장 중 오류가 발생했습니다.', [{text: '확인'}]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>음식</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(text) => setFood(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>탄수화물(g)</Text>
              <TextInput style={styles.input} underlineColorAndroid="transparent" onChangeText={(text) => setCarbs(text)}
              keyboardType="numeric"/>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>단백질(g)</Text>
              <TextInput style={styles.input} underlineColorAndroid="transparent" onChangeText={(text) => setProtein(text)}
              keyboardType="numeric"/>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>지방(g)</Text>
              <TextInput style={styles.input} underlineColorAndroid="transparent" onChangeText={(text) => setFat(text)}
              keyboardType="numeric"/>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>칼로리(kcal)</Text>
              <TextInput style={styles.input} underlineColorAndroid="transparent" onChangeText={(text) => setCalories(text)}
              keyboardType="numeric"/>
            </View>
          </View>
        </View>
        <View style={styles.continue}>
          <TouchableOpacity style={styles.continueButton} onPress={submitData}>
            <Text style={styles.continuebuttonText}>완료하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 20,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    marginBottom: 20,
  },
  textStyle: {
    fontSize: 20,
    marginRight: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    fontSize: 18,
    width: '55%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    right: 0,
  },
  continue: {
    position: 'absolute',
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  continueButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 120,
    borderRadius: 5,
  },
  continuebuttonText: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
  },
});
