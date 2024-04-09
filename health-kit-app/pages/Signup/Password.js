// 회원가입 화면 03 (비밀번호)
// content, contentCheck도 비활성화(?)되게 하기
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, TextInput} from 'react-native';
import { useUser } from './UserContext';

export default function Password({navigation, route}) {
  const [password, setPassword] = useState('');
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

  const handleNext = () => {
    updateUser('password', password);
    navigation.navigate('HealthPage');
  }

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.contentText}>비밀번호를 입력해주세요</Text>
        <View
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
        </View>
      </View>
      <View style={styles.contentCheck}>
        <Text style={styles.contentText}>비밀번호 확인</Text>
        <View
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
  contentCheck: {
    position: 'absolute',
    top: 180,
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
