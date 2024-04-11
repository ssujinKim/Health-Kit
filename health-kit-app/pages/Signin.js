import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import logo from './../assets/logo.png';
import Loading from '../components/Loading';
import axios from 'axios';

export default function Signin({navigation, route}) {
  const [ready, setReady] = useState(true);

  // 1초 뒤에 실행되는 코드들이 담겨 있는 함수
  useEffect(() => {
    setTimeout(() => {
      setReady(false); // 로딩화면 벗어나기
    }, 1000);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const loginData = {
      email: email,
      password: password,
    };
    axios
      .post('http://10.50.231.252:3000/signIn', loginData)
      .then((res) => {
        if (email === '' || password === '') {
          Alert.alert(
            "입력 오류",
            "모든 정보를 입력해주세요.",
            [{ text: "확인" }]
          );
          return; // 필수 정보가 누락되었으므로 여기서 함수 종료
        }
        if (res.data.login) {
          console.log(res.data.message);
          Alert.alert(res.data.message, "메인 화면으로 이동합니다.", 
          [{ text: "확인", onPress: () => navigation.navigate('MainPage') }]);
        } else {
          console.log(res.data.message);
          Alert.alert("로그인 실패", res.data.message, [{text: '확인'}]);
        }
      })
      .catch((error) => {
        console.log('에러 발생: ', error);
      });
  };

  return ready ? (
    <Loading />
  ) : (
    <ScrollView style={styles.container}>
      <Image source={logo} style={styles.imageStyle} />
      <View style={styles.bodyContainer}>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          placeholder="이메일을 입력하세요."
        />
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호를 입력하세요."
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('MainPage');
          }}
        > */}
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.signupbutton}
            onPress={() => {
              navigation.navigate('NicknamePage');
            }}
          >
            <Text style={styles.signupbuttonText}>회원가입</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.idpwfindbutton}
            onPress={() => {
              navigation.navigate('');
            }}
          >
            <Text style={styles.idpwfindbuttonText}>아이디/비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 30,
    flex: 1,
  },
  imageStyle: {
    height: 90,
    width: 230,
    alignSelf: 'center',
    marginTop: 140,
    marginBottom: 20,
  },
  bodyContainer: {
    backgroundColor: '#FFF',
    // paddingHorizontal: 0,
    marginVertical: 30,
    flex: 1,
  },
  textInput: {
    marginTop: 15,
    paddingHorizontal: 15,
    height: 55,
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: 2,
    fontSize: 18,
    fontWeight: '500',
  },
  button: {
    marginTop: 30,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  separator: {
    // 구분선
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    marginTop: 30,
    marginBottom: 20,
  },
  signupbuttonText: {
    color: 'gray',
    fontSize: 15,
    fontWeight: '400',
  },
  idpwfindbuttonText: {
    color: 'gray',
    fontSize: 15,
    fontWeight: '400',
  },
});
