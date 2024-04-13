import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';

export default function MypageInsert({navigation, route}) {
  const { email } = route.params;
  // 사용자 정보를 관리하는 상태를 추가
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    email: '',
    height: 0,
    weight: 0,
    age: 0
  });

  // userInfo에서 각 필드를 추출
  const { nickname, height, weight, age } = userInfo;

  useEffect(() => {
    navigation.setOptions({
      title: '마이페이지',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: 'black',
    });

    // fetchUserInfo 함수를 정의
    const fetchUserInfo = () => {
      const url = `http://10.50.231.252:3000/userInfo?email=${encodeURIComponent(email)}`;

      axios.get(url)
        .then(response => {
          const data = response.data;
          setUserInfo({
            nickname: data.nickname,
            email: data.email,
            height: data.height,
            weight: data.weight,
            age: data.age
          });
        })
        .catch(error => {
          console.error('사용자 정보를 가져오는 동안 에러가 발생했습니다:', error);
        });
    };

    // useEffect 내부에서 fetchUserInfo를 호출하여 사용자 정보를 가져옴
    fetchUserInfo();
  }, [email]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.myinformationContent}>
        <View style={styles.myinfo}>
          <Ionicons name="person" size={28} color="black" />
          <Text style={styles.info}>내 정보 관리</Text>
        </View>
        <View style={styles.nameemailContent}>
          <Text style={styles.name}>{nickname} 님</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.plusserviceContent}>
        <Text style={styles.info}>비밀번호 변경</Text>
        <Text style={styles.info}>로그아웃</Text>
        <Text style={styles.info}>탈퇴하기</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  email: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 7, // 이메일 텍스트와 선 사이 간격 조절
  },
  horizontalLine: {
    position: 'absolute',
    top: 200, // 이메일 텍스트 아래에 위치하도록 설정
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '100%',
  },
  myinformationContent: {
    top: 20,
    left: 20,
    width: '100%',
  },
  myinfo: {
    position: 'absolute',
    left: 20,
    flexDirection: 'row',
  },
  nameemailContent: {
    top: 100,
  },
  info: {
    fontSize: 28,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  insert: {
    position: 'absolute',
    right: 40,
  },
  health: {
    position: 'absolute',
    top: 190,
    width: '90%',
  },
  statusContainer: {
    flexDirection: 'row',
  },
  statusInput: {
    left: 30,
    fontSize: 20,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  statusOutput: {
    position: 'absolute',
    right: 0,
    fontSize: 20,
    marginBottom: 40,
    width: '45%',
  },
  plusserviceContent: {
    position: 'absolute',
    top: 530,
    left: 20,
  },
});
