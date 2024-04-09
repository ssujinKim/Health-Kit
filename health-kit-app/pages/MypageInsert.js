import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function MypageInsert({navigation, route}) {
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
          <Ionicons name="person" size={28} color="black" />
          <Text style={styles.info}>내 정보 관리</Text>
        </View>
        <View style={styles.nameemailContent}>
          <Text style={styles.name}>홍길동 님</Text>
          <Text style={styles.email}>hong@abc.com</Text>
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
