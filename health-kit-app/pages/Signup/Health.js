// 회원가입 화면 04 (그 외 정보)
// 비활성화 시키기
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
import DropDownPicker from 'react-native-dropdown-picker';
import {useUser} from './UserContext';
import axios from 'axios';

export default function Health({navigation, route}) {
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState('');

  const {updateUser, user} = useUser();

  useEffect(() => {
    navigation.setOptions({
      title: '회원가입',
      headerStyle: {
        backgroundColor: '#fff',
        // shadowColor: '#1F266A',
      },
      headerTintColor: 'black',
    });
  }, [navigation]);

  const signUp = () => {
    // 필수 입력 필드 확인
    if (age === 0 || height === 0 || weight === 0 || gender === '') {
      Alert.alert('입력 오류', '모든 정보를 입력해주세요.', [{text: '확인'}]);
      return; // 필수 정보가 누락되었으므로 여기서 함수 종료
    }

    // 모든 필수 입력 필드가 채워졌다면, 회원가입 절차 진행
    const updateUser = {...user, age, height, weight, gender};
    axios
      .post('http://10.50.233.136:3000/signUp', updateUser)
      .then((res) => {
        console.log(res.data);
        // 회원가입 성공 후 할 일
        Alert.alert('회원가입 성공', '로그인 화면으로 이동합니다.', [
          {text: '확인', onPress: () => navigation.navigate('SigninPage')},
        ]);
      })
      .catch((error) => {
        // 에러 처리 로직
        console.log(error);
        console.log('에러 메시지:', error.message);
        if (error.response) {
          console.log('HTTP 상태 코드:', error.response.status);
        } else if (error.request) {
          console.log('요청 정보:', error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.contentText}>본인의 정보를 입력해주세요</Text>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>나이</Text>
              <TextInput
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                style={styles.input}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>키(cm)</Text>
              <TextInput
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                style={styles.input}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>몸무게(kg)</Text>
              <TextInput
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                style={styles.input}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>성별</Text>
              <TouchableOpacity
                onPress={() => setGender('male')}
                style={[styles.radioButton, gender === 'male' && styles.selectedRadioButton]}
              >
                <View style={styles.radioButtonCircle}>
                  {gender === 'male' && <View style={styles.selectedRadioButtonCircle} />}
                </View>
                <Text style={styles.radioButtonText}>남자</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setGender('female')}
                style={[styles.radioButton, gender === 'female' && styles.selectedRadioButton]}
              >
                <View style={styles.radioButtonCircle}>
                  {gender === 'female' && <View style={styles.selectedRadioButtonCircle} />}
                </View>
                <Text style={styles.radioButtonText}>여자</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.continue}>
          <TouchableOpacity style={styles.continueButton} onPress={signUp}>
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
    top: 20,
    left: 10,
    padding: 20,
  },
  contentText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
    top: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    marginBottom: 20,
    zIndex: 1, // 다른 요소 위에 표시되도록 설정
  },
  textStyle: {
    fontSize: 20,
    marginRight: 20,
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
  dropdownContainer: {
    width: '55%',
  },
  dropdown: {
    width: '100%',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 0,
  },
  radioButtonCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioButtonCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#000',
  },
  radioButtonText: {
    fontSize: 16,
    left: 7,
  },
});
