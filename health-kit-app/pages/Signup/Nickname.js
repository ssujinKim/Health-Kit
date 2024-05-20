// 회원가입 화면 01 (닉네임)
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
import {useUser} from './UserContext';
import axios from 'axios';

export default function Nickname({navigation, route}) {
  const [nickname, setNickname] = useState('');
  const [hasCheckedNickname, setHasCheckedNickname] = useState(false);
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

  const checkNickname = () => {
    if (nickname.trim() === '') {
      Alert.alert('닉네임 입력', '닉네임을 입력해주세요.', [{text: '확인'}]);
      return; // 닉네임이 비어있으면 여기서 처리를 멈춥니다.
    }
    axios
      .post('http://192.168.0.11:3000/checkNickname', {nickname})
      .then((response) => {
        if (response.data.isAvailable) {
          console.log('사용할 수 있는 닉네임입니다.');
          Alert.alert('닉네임 사용 가능', '사용할 수 있는 닉네임입니다.', [{text: '확인'}]);
          setHasCheckedNickname(true); // 중복 확인이 성공적으로 완료되었다고 표시
        } else {
          console.log('이미 사용 중인 닉네임입니다.');
          Alert.alert('닉네임 중복', '이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.', [
            {text: '확인'},
          ]);
          setHasCheckedNickname(false); // 중복이 확인되어 다시 중복 확인이 필요하다고 표시
        }
      })
      .catch((error) => {
        console.error('오류 발생', error);
      });
  };

  const handleNext = () => {
    if (!hasCheckedNickname) {
      Alert.alert('닉네임 중복 확인', '닉네임 중복 확인을 해주세요.', [{text: '확인'}]);
      return;
    }
    updateUser('nickname', nickname);
    navigation.navigate('EmailPage');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.contentText}>닉네임을 입력해주세요</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={nickname}
              onChangeText={setNickname}
              style={styles.input}
              underlineColorAndroid="transparent" // 안드로이드에서 기본 밑줄을 제거
            />
            <TouchableOpacity style={styles.overlapButton} onPress={checkNickname}>
              <Text style={styles.overlapbuttonText}>중복 확인</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.continue}>
          <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
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
    backgroundColor: 'white',
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
    width: '60%',
  },
  overlapButton: {
    backgroundColor: '#47c83e',
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
