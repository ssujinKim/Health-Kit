// 회원가입 화면 03 (비밀번호)
// content, contentCheck도 비활성화(?)되게 하기
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

export default function Password({navigation, route}) {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
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

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    return regex.test(password);
  };
  const validatePassword2 = (password, password2) => {
    return password === password2;
  };

  const handleNext = () => {
    // 비밀번호 유효성 검사
    if (!validatePassword(password)) {
      Alert.alert(
        '오류',
        '비밀번호는 4자 이상이며, 최소 하나의 영문자와 하나의 숫자를 포함해야 합니다.',
        [{text: '확인'}]
      );
      return;
    }
    // 비밀번호 재입력 검사
    if (!validatePassword2(password, password2)) {
      Alert.alert('오류', '입력하신 비밀번호가 일치하지 않습니다.', [{text: '확인'}]);
      return;
    }
    updateUser('password', password);
    navigation.navigate('HealthPage');
  };

  // const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  // const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.contentText}>비밀번호를 입력해주세요</Text>
          {/* <View
          style={[
            styles.inputContainer,
            {borderBottomColor: isPasswordFocused ? 'black' : 'lightgray'},
          ]}
        >
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="8자리 이상 영어와 숫자를 입력해주세요"
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
        </View> */}
          <View
            style={[
              styles.inputContainer,
              {borderBottomColor: passwordError ? 'red' : 'lightgray'},
            ]}
          >
            <TextInput
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError(!validatePassword(text));
              }}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="4자리 이상 영어와 숫자를 입력해주세요"
              onFocus={() => setPasswordError('')}
              secureTextEntry={true}
            />
          </View>
          {passwordError && (
            <Text style={{color: 'red', marginTop: 20}}>
              비밀번호는 4자 이상이며, {'\n'}최소 하나의 영문자와 하나의 숫자를 포함해야 합니다.
            </Text>
          )}
        </View>
        <View style={styles.contentCheck}>
          <Text style={styles.contentText}>비밀번호 확인</Text>
          {/* <View
          style={[
            styles.inputContainer,
            {borderBottomColor: isConfirmPasswordFocused ? 'black' : 'lightgray'},
          ]}
        >
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="다시 한 번 입력해주세요"
            onFocus={() => setIsConfirmPasswordFocused(true)}
            onBlur={() => setIsConfirmPasswordFocused(false)}
          />
        </View> */}
          <View
            style={[
              styles.inputContainer,
              {borderBottomColor: passwordCheck ? 'red' : 'lightgray'},
            ]}
          >
            <TextInput
              value={password2}
              onChangeText={(text) => {
                setPassword2(text);
                setPasswordCheck(!validatePassword2(password, text));
              }}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="다시 한 번 입력해주세요"
              onFocus={() => setPasswordCheck('')}
              secureTextEntry={true}
            />
          </View>
          {passwordCheck && (
            <Text style={{color: 'red', marginTop: 20}}>비밀번호가 일치하지 않습니다.</Text>
          )}
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
  contentCheck: {
    position: 'absolute',
    top: 200,
    left: 10,
    padding: 20,
  },
  contentText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 20,
    top: 30,
  },
  input: {
    // flex: 1, // TextInput이 화면의 남은 공간을 모두 차지하도록 함
    height: 40,
    fontSize: 18,
    width: '90%',
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
