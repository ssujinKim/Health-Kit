import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';
import logo from './../assets/logo.png';
import Loading from '../components/Loading';

export default function Signin({navigation, route}) {
  const [ready, setReady] = useState(true);

  // 1초 뒤에 실행되는 코드들이 담겨 있는 함수
  useEffect(() => {
    setTimeout(() => {
      setReady(false); // 로딩화면 벗어나기
    }, 1000);
  }, []);

  return ready ? (
    <Loading />
  ) : (
    <ScrollView style={styles.container}>
      <Image source={logo} style={styles.imageStyle} />
      <View style={styles.bodyContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => {
            this.setState({inputText: text});
          }}
          placeholder="이메일을 입력하세요."
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => {
            this.setState({inputText: text});
          }}
          placeholder="비밀번호를 입력하세요."
        />
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
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
