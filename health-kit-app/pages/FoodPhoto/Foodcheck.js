import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';

export default function Foodcheck({navigation, route}) {
  const {email, productName, amount, calories, calorieType} = route.params;
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

    axios
      .get(
        `http://192.168.35.196:3000/run-python-ocr?email=${email}&date=${todayDate}
               &productName=${productName}&amount=${amount}&calories=${calories}&calorieType=${calorieType}`
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
        <Text style={styles.loadingText}>분석 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.foodPictureContainer}>
          <Image
            source={require('../../ocr/to/photo.jpg')}
            style={styles.foodPicture}
            resizeMode="contain"
          />
          <Text style={styles.foodText}>{pythonData}</Text>
        </View>
        </ScrollView>

      <View style={styles.recommend}>
      {/* 조건부 렌더링을 위한 코드 부분 */}
        {pythonData.trim() === '섭취 가능한 품목입니다.' ? (
        <TouchableOpacity
          style={styles.recommendButton}
          onPress={() => {
            navigation.navigate('MainPage', {email: email});
          }}
        >
          <Text style={styles.recommendbuttonText}>완료하기</Text>
        </TouchableOpacity>
        ) : null}

        {pythonData.trim() === '일일 영양섭취 초과입니다.' ? (
        <TouchableOpacity
          style={styles.recommendButton1}
          onPress={() => {
            navigation.navigate('FoodrecommendPage', {
              email: email,
              todayDate: todayDate,
              productName: productName, 
              amount: amount, 
              calories: calories, 
              calorieType: calorieType
            });
          }}
        >
          <Text style={styles.recommendbuttonText}>비슷한 식품 추천 받기</Text>
        </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollviewContainer: {
    flex: 1,
  },
  foodPictureContainer: {
    alignItems: 'center',
    minHeight: 400, // 이미지와 텍스트를 모두 포함할 수 있도록 높이 조정
    width: '100%',
    top: 30,
  },
  foodPicture: {
    width: '100%', // 화면 너비에 맞게 조정
    height: 300, // 이미지가 더 크게 보이도록 높이 조정
    resizeMode: 'contain', // 이미지가 컨테이너를 벗어나지 않도록 설정
    backgroundColor: 'black',
  },
  foodText: {
    fontSize: 20,
    marginTop: 20, // 이미지 아래에 텍스트가 위치하도록 top 대신 marginTop 사용
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
    backgroundColor: '#47c83e',
    paddingVertical: 10,
    paddingHorizontal: 130,
    borderRadius: 5,
  },
  recommendButton1: {
    backgroundColor: '#47c83e',
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 5,
  },
  recommendbuttonText: {
    fontSize: 30,
    color: 'black',
    fontWeight: '500',
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
