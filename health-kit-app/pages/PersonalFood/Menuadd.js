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
  ScrollView,
} from 'react-native';
import axios from 'axios';

export default function Menuadd({navigation, route}) {
  const {email, mealType} = route.params;
  const [food, setFood] = useState('');
  const [carbs, setCarbs] = useState(''); // 탄수화물
  const [sugars, setSugars] = useState(''); // 당류
  const [fat, setFat] = useState(''); // 지방
  const [transfat, setTransfat] = useState(''); // 트랜스지방산
  const [saturatedfat, setSaturatedfat] = useState(''); // 포화지방산
  const [choles, setCholes] = useState(''); // 콜레스테롤
  const [protein, setProtein] = useState(''); // 단백질
  const [calcium, setCalcium] = useState(''); // 칼슘
  const [sodium, setSodium] = useState(''); // 나트륨
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
      const response = await axios.post('http://192.168.0.11:3000/menuAdd', {
        email: email,
        food: food,
        carbs: carbs, // 탄수화물
        sugars: sugars, // 당류
        fat: fat, // 지방
        transfat: transfat, // 트랜스지방산
        saturatedfat: saturatedfat, // 포화지방산
        choles: choles, // 콜레스테롤
        protein: protein, // 단백질
        calcium: calcium, // 칼슘
        sodium: sodium, // 나트륨
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
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView contentContainerStyle={[styles.scrollViewContent, {paddingBottom: 1200}]}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>음식명</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setFood(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>탄수화물(g)</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setCarbs(text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>당류(g)</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setSugars(text)}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>지방(g)</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setFat(text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>트랜스지방산(g)</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setTransfat(text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>포화지방산(g)</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setSaturatedfat(text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>콜레스테롤(mg)</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setCholes(text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>단백질(g)</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setProtein(text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>칼슘(mg)</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setCalcium(text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>나트륨(mg)</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setSodium(text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>칼로리(Kcal)</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setCalories(text)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <View style={styles.continue}>
        <TouchableOpacity style={styles.continueButton} onPress={submitData}>
          <Text style={styles.continuebuttonText}>완료하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    backgroundColor: '#47c83e',
    paddingVertical: 10,
    paddingHorizontal: 130,
    borderRadius: 5,
  },
  continuebuttonText: {
    fontSize: 30,
    color: 'black',
    fontWeight: '500',
  },
});