// 회원가입 화면 02 (이메일)
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import { useUser } from './UserContext';
import axios from 'axios';

export default function Email({navigation, route}) {
  const [email, setEmail] = useState('');
  const [hasCheckedEmail, setHasCheckedEmail] = useState(false);
  const {updateUser} = useUser();

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

  const checkEmail = () => {
    if (email.trim() === '') {
      Alert.alert('이메일 입력', '이메일을 입력해주세요.', [{text: '확인'}]);
      return; // 이메일이 비어있으면 여기서 처리를 멈춥니다.
    }
    axios.post('http://10.50.231.252:3000/checkEmail', { email })
    .then(response => {
      if (response.data.isAvailable) {
        console.log(response.data.message);
        Alert.alert('이메일 사용 가능', response.data.message, [{text: '확인'}]);
        setHasCheckedEmail(true); // 중복 확인이 성공적으로 완료되었다고 표시
      } else {
        console.log(response.data.message);
        Alert.alert('이메일 중복', response.data.message, [{text: '확인'}]);
        setHasCheckedEmail(false); // 중복이 확인되어 다시 중복 확인이 필요하다고 표시
      }
    }).catch(error => {
      console.error('오류 발생', error);
    });
  };

  const handleNext = () => {
    if (!hasCheckedEmail) {
      Alert.alert('이메일 중복 확인', '이메일 중복 확인을 해주세요.', [{text: '확인'}]);
      return;
    }
    updateUser('email', email);
    navigation.navigate('PasswordPage');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.contentText}>이메일을 입력해주세요</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            underlineColorAndroid="transparent" // 안드로이드에서 기본 밑줄을 제거
            placeholder="@를 포함하여 작성해주세요"
          />
          <TouchableOpacity style={styles.overlapButton} onPress={checkEmail}>
            <Text style={styles.overlapbuttonText}>중복 확인</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.continue}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleNext}
        >
          <Text style={styles.continuebuttonText}>계속하기</Text>
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
  inputContainer: {
    flexDirection: 'row', // 가로로 배치
    alignItems: 'center',
    top: 30,
  },
  input: {
    // flex: 1, // TextInput이 화면의 남은 공간을 모두 차지하도록 함
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    height: 40,
    fontSize: 18,
    width: '60%',
  },
  overlapButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    left: 30,
  },
  overlapbuttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
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
