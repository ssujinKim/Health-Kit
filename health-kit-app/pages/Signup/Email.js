// 회원가입 화면 02 (이메일)
import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, TextInput} from 'react-native';

export default function EmailPage({navigation, route}) {
  useEffect(() => {
    navigation.setOptions({
      title: '회원가입',
      headerStyle: {
        backgroundColor: '#fff',
        // shadowColor: '#1F266A',
      },
      headerTintColor: 'black',
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.contentText}>이메일을 입력해주세요</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent" // 안드로이드에서 기본 밑줄을 제거
            placeholder="@를 포함하여 작성해주세요"
          />
          <TouchableOpacity style={styles.overlapButton}>
            <Text style={styles.overlapbuttonText}>중복 확인</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.continue}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            navigation.navigate('PasswordPage');
          }}
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
