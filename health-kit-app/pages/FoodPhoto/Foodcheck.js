import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';

export default function Foodcheck({navigation, route}) {
  const {email, productName, calories, calorieType} = route.params;
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
      title: '식품 섭취 여부',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: 'black',
    });

    console.log(email);
    axios.get(`http://10.50.249.191:3000/run-python-ocr?email=${email}&date=${todayDate}
               &productName=${productName}&calories=${calories}&calorieType=${calorieType}`)
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
        <Text style={styles.loadingText}>분석 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollviewContainer}>
        <View style={styles.foodPictureContainer}>
          <Image 
            /*source={{ uri: pythonData.imageUrl }} */
            source={require('../../ocr/to/photo.jpg')} 
            style={styles.foodPicture} 
            resizeMode="contain"
          />
            <Text style={styles.foodText}>{pythonData}</Text>
        </View>
      </ScrollView>

      {/* 섭취 불가능한 식품일때만 보여지는 버튼 */}
      <View style={styles.recommend}>
        <TouchableOpacity
          style={styles.recommendButton}
          onPress={() => {
            navigation.navigate('FoodrecommendPage');
          }}
        >
          <Text style={styles.recommendbuttonText}>비슷한 식품 추천 받기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollviewContainer: {
    flex: 1,
  },
  foodPictureContainer: {
    alignItems: 'center',
    minHeight: 200, // 최소 높이 설정
    width: '100%', // 화면 너비와 맞출 경우
    top: 30,
  },
  foodPicture: {
    width: '90%',
    height: '120%',
    backgroundColor: 'black',
  },
  foodText: {
    fontSize: 20,
    top: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
    fontWeight: 'bold',
  },
  recommend: {
    position: 'absolute',
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  recommendButton: {
    backgroundColor: 'green',
    paddingVertical: 13,
    paddingHorizontal: 60,
    borderRadius: 5,
  },
  recommendbuttonText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
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
