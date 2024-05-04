import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function Menuinput({navigation, route}) {
  useEffect(() => {
    navigation.setOptions({
      title: '하루 식단 입력하기',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: 'black',
    });
  }, []);

  // 오늘 날짜 함수
  const getFormattedDate = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2); // getMonth()는 0부터 시작하므로, +1 필요
    let day = ('0' + today.getDate()).slice(-2);

    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dateContainer}>
        <Ionicons name="calendar" size={20} color="gray" style={styles.icon} />
        <View style={styles.dateBox}>
          <Text style={styles.dateFont}>{getFormattedDate()}</Text>
        </View>
      </View>

      <View style={styles.nutritionContainer}>
        <View style={styles.nutritionContent}>
          <Text style={styles.nutritionText}>탄수화물</Text>
          <Text style={styles.nutritionText}>단백질</Text>
          <Text style={styles.nutritionText}>지방</Text>
          <Text style={styles.nutritionText}>총 칼로리</Text>
        </View>
        <View style={styles.nutritionContent}>
          <Text style={styles.nutritionText}>-</Text>
          <Text style={styles.nutritionText}>-</Text>
          <Text style={styles.nutritionText}>-</Text>
          <Text style={styles.nutritionText}>0 kcal</Text>
        </View>
      </View>

      <View style={styles.foodContainer}>
        <TouchableOpacity
          style={styles.recommendButton}
          onPress={() => {
            navigation.navigate('MenusearchPage', { mealType: '아침 식사' });
          }}
        >
          <View style={styles.foodBox}>
            <Text style={styles.foodText}>아침 식사</Text>
            <Ionicons name="add" size={32} color="gray" style={styles.icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.recommendButton}
          onPress={() => {
            navigation.navigate('MenusearchPage', { mealType: '점심 식사' });
          }}
        >
          <View style={styles.foodBox}>
            <Text style={styles.foodText}>점심 식사</Text>
            <Ionicons name="add" size={32} color="gray" style={styles.icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.recommendButton}
          onPress={() => {
            navigation.navigate('MenusearchPage', { mealType: '저녁 식사' });
          }}
        >
          <View style={styles.foodBox}>
            <Text style={styles.foodText}>저녁 식사</Text>
            <Ionicons name="add" size={32} color="gray" style={styles.icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.recommendButton}
          onPress={() => {
            navigation.navigate('MenusearchPage', { mealType: '간식' });
          }}
        >
          <View style={styles.foodBox}>
            <Text style={styles.foodText}>간식</Text>
            <Ionicons name="add" size={32} color="gray" style={styles.icon} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.recommendButton}
          onPress={() => {
            navigation.navigate('DietrecommendPage');
          }}
        >
          <View style={styles.foodBox}>
            <Text style={styles.foodText}>식단 추천 받기</Text>
            <Ionicons name="add" size={32} color="gray" style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
  },
  icon: {
    marginRight: 10,
  },
  dateFont: {
    top: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  nutritionContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nutritionContent: {
    flexDirection: 'row',
    top: 80,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nutritionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },
  foodBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    height: 60,
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
  foodText: {
    lineHeight: 70,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});
