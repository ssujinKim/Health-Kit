import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, ActivityIndicator, Image} from 'react-native';
import axios from 'axios';

export default function Recommendresult({navigation, route}) {
  const {email} = route.params;

  const [loading, setLoading] = useState(true);
  const [pythonData, setPythonData] = useState('');

  // 오늘 날짜 함수
  const getFormattedDate = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2); // getMonth()는 0부터 시작하므로, +1 필요
    let day = ('0' + today.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  };
  let todayDate = getFormattedDate();

  useEffect(() => {
    navigation.setOptions({
      title: '식단 추천',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: 'black',
    });

    axios
      .get(
        `http://10.50.213.228:3000/run-python-dr?email=${encodeURIComponent(
          email
        )}&date=${encodeURIComponent(todayDate)}`
      )
      .then((response) => {
        console.log(response.data);
        setPythonData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>식단 추천 중...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.loadingText}>{pythonData}</Text>
      <Text style={{marginLeft: 25, marginTop: 30, fontSize: 20, fontWeight: 'bold'}}>
        기준 영양성분을 토대로 추천해드려요 :)
      </Text>
      <View style={styles.foodContainer}>
        <View style={styles.foodBox}>
          <Image
            source={require('./../../assets/foodimages/bibimbap.jpg')}
            style={{width: 100, height: 100, left: 10, alignSelf: 'center', borderRadius: 10}}
          />
          <View style={styles.foodMenu}>
            <Text style={styles.foodText}>비빕밥</Text>
            <View style={styles.horizontalLine} />
            <Text style={styles.kcalText}>650 kcal</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  foodContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  foodBox: {
    flexDirection: 'row',
    width: '90%',
    height: 130,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 20,
  },
  foodMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foodText: {
    lineHeight: 70,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 30,
  },
  horizontalLine: {
    position: 'absolute',
    top: 50,
    left: 22,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '90%',
  },
  kcalText: {
    marginTop: 100,
    marginLeft: 100,
    fontWeight: 'bold',
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  loadingText: {
    marginTop: 20, // 로딩 인디케이터와 텍스트 사이 간격
    fontSize: 20, // 텍스트 크기
  },
});
