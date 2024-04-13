import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function Mypageinfo({navigation, route}) {
  useEffect(() => {
    navigation.setOptions({
      title: '마이페이지',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: 'black',
    });
  }, []);

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
            <Text style={styles.name2}>홍길동</Text>
          </View>
          <View style={styles.emailContent}>
            <Text style={styles.email1}>이메일</Text>
            <Text style={styles.email2}>hong@abc.com</Text>
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
    justifyContent: 'space-between', // 좌우 배치
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
