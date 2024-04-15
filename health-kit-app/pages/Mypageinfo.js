import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';

export default function Mypageinfo({navigation, route}) {
  const {email} = route.params;
  // 사용자 정보를 관리하는 상태를 추가
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    email: '',
  });

  // userInfo에서 각 필드를 추출
  const {nickname} = userInfo;

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
      
      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          setUserInfo({
            nickname: data.nickname,
            email: data.email,
            height: data.height,
            weight: data.weight,
            age: data.age,
          });
        })
        .catch((error) => {
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
          <Ionicons name="person" size={24} color="black" />
          <Text style={styles.info}>내 정보 관리</Text>
        </View>

        <View style={styles.nameemailContent}>
          <View style={styles.nameContent}>
            <Text style={styles.name1}>이름</Text>
            <Text style={styles.name2}>{nickname}</Text>
          </View>
          <View style={styles.emailContent}>
            <Text style={styles.email1}>이메일</Text>
            <Text style={styles.email2}>{email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.plusserviceContent}>
        <Text style={styles.plus}>비밀번호 변경</Text>
        <Text style={styles.plus}>로그아웃</Text>
        <Text style={styles.plus}>탈퇴하기</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nameemailContent: {
    top: 50,
    flexDirection: 'row',
  },
  nameContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name1: {
    fontSize: 16,
    marginRight: 10,
  },
  name2: {
    fontSize: 16,
    color: 'gray',
  },
  email1: {
    fontSize: 16,
    marginRight: 10,
  },
  email2: {
    fontSize: 16,
    color: 'gray',
  },
  info: {
    fontSize: 24,
    marginLeft: 8,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  horizontalLine: {
    position: 'absolute',
    top: 110,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '95%',
    alignSelf: 'center',
  },
  myinformationContent: {
    top: 20,
    left: 20,
  },
  myinfo: {
    position: 'absolute',
    flexDirection: 'row',
  },
  plus: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  plusserviceContent: {
    position: 'absolute',
    top: 140,
    left: 20,
  },
});
