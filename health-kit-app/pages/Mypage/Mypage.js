import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';

export default function Mypage({navigation, route}) {
  const {email} = route.params;
  // 사용자 정보를 관리하는 상태를 추가
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    email: '',
    height: 0,
    weight: 0,
    age: 0,
    disease1: '',
    disease2: '',
    disease3: '',
    medicine1: '',
    medicine2: '',
    medicine3: '',
  });

  // userInfo에서 각 필드를 추출
  const {
    nickname,
    height,
    weight,
    age,
    disease1,
    disease2,
    disease3,
    medicine1,
    medicine2,
    medicine3,
  } = userInfo;

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
      const url = `http://192.168.0.11:3000/userInfo?email=${encodeURIComponent(email)}`;

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
            disease1: data.disease1,
            disease2: data.disease2,
            disease3: data.disease3,
            medicine1: data.medicine1,
            medicine2: data.medicine2,
            medicine3: data.medicine3,
          });
        })
        .catch((error) => {
          console.error('사용자 정보를 가져오는 동안 에러가 발생했습니다:', error);
        });
    };

    // useEffect 내부에서 fetchUserInfo를 호출하여 사용자 정보를 가져옴
    fetchUserInfo();
  }, [userInfo]);

  const safeMedicine1 = medicine1 || '';
  const safeMedicine2 = medicine2 || '';
  const safeMedicine3 = medicine3 || '';

  const medicine1Display = safeMedicine1.indexOf('(') !== -1 ? safeMedicine1.substring(0, safeMedicine1.indexOf('(')) : safeMedicine1;
  const medicine2Display = safeMedicine2.indexOf('(') !== -1 ? safeMedicine2.substring(0, safeMedicine2.indexOf('(')) : safeMedicine2;
  const medicine3Display = safeMedicine3.indexOf('(') !== -1 ? safeMedicine3.substring(0, safeMedicine3.indexOf('(')) : safeMedicine3;

  const diseaseContainerStyle = {
    marginBottom: disease1 === null ? 0 : 20,
  };

  return (
    <View style={styles.container}>
      <View style={styles.myinformationContent}>
        <TouchableOpacity
          style={styles.nameicon}
          onPress={() => navigation.navigate('MypageinfoPage', {email: email})}
        >
          <Text style={styles.name}>{nickname} 님 </Text>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.horizontalLine1} />
      <View style={styles.diseaseContent}>
        <Ionicons name="heart" size={28} color="black" />
        <Text style={styles.info}>나의 건강 정보</Text>
        <TouchableOpacity
          style={styles.insert}
          onPress={() => navigation.navigate('MypagehealthPage', {email: email})}
        >
          <Ionicons name="pencil" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.health}>
        <View style={styles.statusContainer}>
          <Text style={styles.statusInput}>키(cm)</Text>
          <Text style={styles.statusOutput}>{height}cm</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusInput}>몸무게(kg)</Text>
          <Text style={styles.statusOutput}>{weight}kg</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusInput}>나이</Text>
          <Text style={styles.statusOutput}>{age}세</Text>
        </View>
        <View style={[styles.statusContainer, diseaseContainerStyle]}>
          <Text style={styles.statusInput}>질병</Text>
          <Text style={styles.statusOutput}>
            {disease1}
            {'\n'}
            {disease2}
            {'\n'}
            {disease3}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusInput}>복용중인 약</Text>
          <Text style={styles.statusOutput}>
            {medicine1Display}
            {'\n'}
            {medicine2Display}
            {'\n'}
            {medicine3Display}
          </Text>
        </View>
      </View>
      {/* <View style={styles.horizontalLine2} />
      <View style={styles.adviceContent}>
        <Ionicons name="chatbubbles" size={28} color="black" />
        <Text style={styles.info}>진행중인 상담</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  myinformationContent: {
    position: 'absolute',
    top: 5,
    padding: 20,
  },
  nameicon: {
    flexDirection: 'row',
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
  horizontalLine1: {
    position: 'absolute',
    top: 110, // 이메일 텍스트 아래에 위치하도록 설정
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '95%',
    alignSelf: 'center',
  },
  // horizontalLine2: {
  //   position: 'absolute',
  //   top: 500, // 이메일 텍스트 아래에 위치하도록 설정
  //   borderBottomColor: 'lightgray',
  //   borderBottomWidth: 1,
  //   width: '95%',
  //   alignSelf: 'center',
  // },
  diseaseContent: {
    position: 'absolute',
    top: 140,
    left: 15,
    flexDirection: 'row',
    width: '100%',
  },
  info: {
    fontSize: 26,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  insert: {
    position: 'absolute',
    right: 40,
  },
  health: {
    position: 'absolute',
    top: 200,
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
    width: '55%',
  },
  adviceContent: {
    position: 'absolute',
    top: 530,
    left: 15,
    flexDirection: 'row',
  },
});
