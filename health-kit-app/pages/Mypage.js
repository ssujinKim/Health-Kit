import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function Mypage({navigation, route}) {
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
        <TouchableOpacity onPress={() => navigation.navigate('MypageInsertPage')}>
          <Text style={styles.name}>홍길동 님</Text>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>
        {/* 본인의 이름 끌고와야 함 */}
        <Text style={styles.email}>hong@abc.com</Text>
        {/* 본인의 이메일 끌고와야 함 */}
      </View>
      <View style={styles.horizontalLine1} />
      <View style={styles.diseaseContent}>
        <Ionicons name="heart" size={28} color="black" />
        <Text style={styles.info}>나의 건강 정보</Text>
        <View style={styles.insert}>
          <Ionicons name="pencil" size={28} color="black" />
        </View>
      </View>
      <View style={styles.health}>
        <View style={styles.statusContainer}>
          <Text style={styles.statusInput}>키(cm)</Text>
          <Text style={styles.statusOutput}>183cm</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusInput}>몸무게(kg)</Text>
          <Text style={styles.statusOutput}>78kg</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusInput}>나이</Text>
          <Text style={styles.statusOutput}>24세</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusInput}>질병</Text>
          <Text style={styles.statusOutput}>고지혈증</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusInput}>복용중인 약</Text>
          <Text style={styles.statusOutput}>뽀또맛 사탕</Text>
        </View>
      </View>
      <View style={styles.horizontalLine2} />
      <View style={styles.adviceContent}>
        <Ionicons name="chatbubbles" size={28} color="black" />
        <Text style={styles.info}>진행중인 상담</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myinformationContent: {
    position: 'absolute',
    top: 5,
    left: 5,
    padding: 20,
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
    top: 120, // 이메일 텍스트 아래에 위치하도록 설정
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '100%',
  },
  horizontalLine2: {
    position: 'absolute',
    top: 500, // 이메일 텍스트 아래에 위치하도록 설정
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '100%',
  },
  diseaseContent: {
    position: 'absolute',
    top: 140,
    left: 20,
    flexDirection: 'row',
    width: '100%',
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
    width: '45%',
  },
  adviceContent: {
    position: 'absolute',
    top: 530,
    left: 20,
    flexDirection: 'row',
  },
});
