import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

export default function Recommendresult({navigation, route}) {
  const {email, preferences} = route.params;

  const [loading, setLoading] = useState(true);
  const [pythonData, setPythonData] = useState([]);

  // 오늘 날짜 함수
  const getFormattedDate = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
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
        `http://10.50.213.228:3000/run-python-dr?email=${email}&date=${todayDate}&preferences=${preferences}`
      )
      .then((response) => {
        console.log(response.data);
        let data;
        try {
          // 서버에서 받은 데이터의 작은따옴표를 큰따옴표로 변환
          const correctedData = response.data.replace(/'/g, '"');
          data = JSON.parse(correctedData);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          setLoading(false);
          return;
        }
        setPythonData(data);
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollViewContent, {paddingBottom: 125}]}>
        <Text style={styles.introText}>기준 영양성분을 토대로 추천해드려요 :)</Text>
        {pythonData.map((item, index) => (
          <View key={index} style={styles.foodContainer}>
            <View style={styles.foodBox}>
              <View style={styles.foodMenu}>
                <Text style={styles.foodText}>{item.food_name}</Text>
                <View style={styles.horizontalLine} />
                <Text style={styles.kcalText}>{item.energy} kcal</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.continue}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            navigation.navigate('MainPage', {email: email});
          }}
        >
          <Text style={styles.continuebuttonText}>완료하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  introText: {
    marginLeft: 25,
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
  foodContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  foodBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 70,
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
    marginBottom: 5,
  },
  foodText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  kcalText: {
    marginTop: 10,
    marginLeft: 315,
    fontWeight: 'bold',
    fontSize: 12,
  },
  horizontalLine: {
    position: 'absolute',
    top: 25,
    left: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: 350,
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
  continue: {
    position: 'absolute',
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  continueButton: {
    backgroundColor: '#47c83e',
    paddingVertical: 10,
    paddingHorizontal: 130,
    borderRadius: 5,
  },
  continuebuttonText: {
    fontSize: 30,
    color: 'black',
    fontWeight: '500',
  },
});
