import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

export default function Foodcheck({navigation, route}) {
  useEffect(() => {
    navigation.setOptions({
      title: '식품 섭취 여부',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: 'black',
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollviewContainer}>
        <View style={styles.foodPictureContainer}>
          <View style={styles.foodPicture}></View>
          {/* <Text style={styles.foodText}>섭취 가능한 식품입니다 :)</Text> */}
          <Text style={styles.foodText}>섭취 불가능한 식품입니다.</Text>
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
});
