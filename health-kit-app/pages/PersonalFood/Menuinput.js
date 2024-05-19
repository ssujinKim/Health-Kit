import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Calendar, LocaleConfig} from 'react-native-calendars';

export default function Menuinput({navigation, route}) {
  const {email} = route.params;
  const [totalInfo, setTotalInfo] = useState({
    totalCarbs: '-',
    totalProtein: '-',
    totalFat: '-',
    totalCalories: '-',
  });

  const {totalCarbs, totalProtein, totalFat, totalCalories} = totalInfo;

  const [breakfastData, setBreakfastData] = useState([]);
  const [lunchData, setLunchData] = useState([]);
  const [dinnerData, setDinnerData] = useState([]);
  const [snackData, setSnackData] = useState([]);

  // 음식 정보 삭제 상태
  const [deleteRun, setDeleteRun] = useState(false);

  // 오늘 날짜 함수
  const getFormattedDate = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2); // getMonth()는 0부터 시작하므로, +1 필요
    let day = ('0' + today.getDate()).slice(-2);

    return `${year}년 ${month}월 ${day}일`;
  };
  const [date, setDate] = useState(
    getFormattedDate().replace(/년 /, '-').replace(/월 /, '-').replace(/일/, '')
  );

  const [selectedDate, setSelectedDate] = useState('');
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  // onDayPress 함수 수정
  const onDayPress = (day) => {
    const {dateString} = day;
    const selectedDate = new Date(dateString);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(selectedDate.getDate()).padStart(2, '0');
    setSelectedDate(`${year}년 ${month}월 ${dayOfMonth}일`);
    setCalendarVisible(false); // 달력 닫기
  };

  useEffect(() => {
    navigation.setOptions({
      title: '하루 식단 입력하기',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: 'black',
    });

    if (selectedDate) {
      // selectedDate가 있는 경우에만 setDate 호출
      setDate(selectedDate.replace(/년 /, '-').replace(/월 /, '-').replace(/일/, ''));
    }

    const fetchTotalInfo = async () => {
      if (!date) return; // date가 비어있는 경우 함수 실행 중지

      const url = `http://10.50.213.228:3000/totalInfo?email=${encodeURIComponent(
        email
      )}&date=${encodeURIComponent(date)}`;

      try {
        const response = await axios.get(url);
        const data = response.data;
        if (data) {
          setTotalInfo({
            totalCarbs: data.totalCarbs ? data.totalCarbs.toFixed(2) : '-',
            totalProtein: data.totalProtein ? data.totalProtein.toFixed(2) : '-',
            totalFat: data.totalFat ? data.totalFat.toFixed(2) : '-',
            totalCalories: data.totalCalories || '-',
          });
        }
      } catch (error) {
        console.error('식단 정보를 가져오는 동안 에러가 발생했습니다:', error);
      }
    };

    const fetchMealInfo = async () => {
      const url = `http://10.50.213.228:3000/mealInfo?email=${email}&date=${encodeURIComponent(
        date
      )}`;

      try {
        const response = await axios.get(url);
        const data = response.data;

        // 데이터가 null인 경우를 대비하여 빈 배열을 할당합니다.
        const breakfastData = data.filter((item) => item.meal_type === '아침 식사') || [];
        const lunchData = data.filter((item) => item.meal_type === '점심 식사') || [];
        const dinnerData = data.filter((item) => item.meal_type === '저녁 식사') || [];
        const snackData = data.filter((item) => item.meal_type === '간식') || [];

        // 빈 배열인 경우에도 상태를 설정합니다.
        setBreakfastData(breakfastData);
        setLunchData(lunchData);
        setDinnerData(dinnerData);
        setSnackData(snackData);
      } catch (error) {
        console.error('식단 정보를 가져오는 동안 에러가 발생했습니다:', error);
      }
    };

    fetchMealInfo();
    fetchTotalInfo();

    const focusListener = navigation.addListener('focus', () => {
      fetchTotalInfo();
      fetchMealInfo();
    });

    return () => {
      navigation.removeListener('focus', focusListener);
    };
  }, [email, navigation, selectedDate, date, deleteRun]);

  const toggleCalendar = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  LocaleConfig.locales['kr'] = {
    monthNames: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    monthNamesShort: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  };

  // 현재 로케일을 'kr'로 설정
  LocaleConfig.defaultLocale = 'kr';

  const [isDetailVisible1, setIsDetailVisible1] = useState(false);
  const [isDetailVisible2, setIsDetailVisible2] = useState(false);
  const [isDetailVisible3, setIsDetailVisible3] = useState(false);
  const [isDetailVisible4, setIsDetailVisible4] = useState(false);

  // const deleteMeal = async (food_name, mealType) => {
  //   try {
  //     await axios.post(`http://10.50.213.228:3000/deleteMeal?email=${email}&date=${(date)}&food_name=${(food_name)}&meal_type=${(mealType)}`);
  //     console.log('음식 삭제 완료');
  //     Alert.alert('완료', '음식 정보가 삭제되었습니다.', { text: '확인' });

  //     setDeleteRun(prev => !prev);
  //   } catch(error) {
  //     console.error('음식 정보를 삭제하는 동안 에러가 발생했습니다:', error);
  //   }
  // };
  const deleteMeal = async (food_name, mealType) => {
    Alert.alert(
      '삭제 확인', // 제목
      '정말로 이 음식 정보를 삭제하시겠습니까?', // 내용
      [
        {
          text: '취소',
          onPress: () => console.log('삭제 취소'),
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: async () => {
            try {
              await axios.post(
                `http://10.50.213.228:3000/deleteMeal?email=${email}&date=${date}&food_name=${food_name}&meal_type=${mealType}`
              );
              console.log('음식 삭제 완료');
              Alert.alert('완료', '음식 정보가 삭제되었습니다.', {text: '확인'});
              setDeleteRun((prev) => !prev);
            } catch (error) {
              console.error('음식 정보를 삭제하는 동안 에러가 발생했습니다:', error);
            }
          },
        },
      ],
      {cancelable: false} // 사용자가 다른 곳을 클릭해도 창이 닫히지 않게 설정
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={toggleCalendar}>
          <View style={styles.calenderContainer}>
            <Ionicons name="calendar" size={22} color="black" style={styles.icon} />
          </View>
        </TouchableOpacity>
        <View style={styles.dateBox}>
          <Text style={styles.dateFont}>{selectedDate || getFormattedDate()}</Text>
        </View>
      </View>
      {isCalendarVisible && (
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={{[selectedDate]: {selected: true}}}
            style={styles.calendar}
            theme={{
              textDayFontSize: 20,
              textMonthFontSize: 20,
              textMonthFontWeight: 'bold',
              textSectionTitleColor: 'rgba(138, 138, 138, 1)',
              todayTextColor: '#47c83e',
              arrowColor: 'gray',
            }}
            hideExtraDays={true}
            monthFormat={'M월'}
          />
        </View>
      )}

      <View style={styles.nutritionContainer}>
        <View style={styles.nutritionContent}>
          <View style={{alignItems: 'flex-start'}}>
            <Text style={styles.nutritionText}>탄수화물</Text>
            <Text style={styles.nutritionNum}>{totalCarbs}</Text>
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <Text style={styles.nutritionText}>단백질</Text>
            <Text style={styles.nutritionNum}>{totalProtein}</Text>
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <Text style={styles.nutritionText}>지방</Text>
            <Text style={styles.nutritionNum}>{totalFat}</Text>
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <Text style={styles.nutritionText}>칼로리</Text>
            <Text style={styles.nutritionNum}>{totalCalories}kcal</Text>
          </View>
        </View>
      </View>

      <View style={styles.foodContainer}>
        <TouchableOpacity
          style={styles.recommendButton}
          onPress={() => {
            navigation.navigate('MenusearchPage', {mealType: '아침 식사', email: email});
          }}
        >
          <View style={styles.foodBox}>
            <Text style={styles.foodText}>아침 식사</Text>
            <Ionicons name="add" size={32} color="gray" style={styles.icon} />
          </View>
        </TouchableOpacity>
        {breakfastData && breakfastData.length > 0 && (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '83%',
              alignSelf: 'center',
              marginBottom: 20,
            }}
          >
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {isDetailVisible1
                ? breakfastData.map((meal, index) => (
                    <View key={index}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{meal.food_name}</Text>
                        <TouchableOpacity onPress={() => deleteMeal(meal.food_name, '아침 식사')}>
                          <Ionicons name={'close'} size={24} color="gray" />
                        </TouchableOpacity>
                      </View>
                      <Text style={{fontSize: 12, marginBottom: 10}}>
                        탄수화물: {meal.carbs}g, 단백질: {meal.protein}g, 지방: {meal.fat}g,{' '}
                        {meal.kcal}kcal
                      </Text>
                    </View>
                  ))
                : `${breakfastData.length}개 음식`}
            </Text>
            <TouchableOpacity onPress={() => setIsDetailVisible1(!isDetailVisible1)}>
              <Ionicons
                name={isDetailVisible1 ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={styles.recommendButton}
          onPress={() => {
            navigation.navigate('MenusearchPage', {mealType: '점심 식사', email: email});
          }}
        >
          <View style={styles.foodBox}>
            <Text style={styles.foodText}>점심 식사</Text>
            <Ionicons name="add" size={32} color="gray" style={styles.icon} />
          </View>
        </TouchableOpacity>
        {lunchData && lunchData.length > 0 && (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '83%',
              alignSelf: 'center',
              marginBottom: 20,
            }}
          >
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {isDetailVisible2
                ? lunchData.map((meal, index) => (
                    <View key={index}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{meal.food_name}</Text>
                        <TouchableOpacity onPress={() => deleteMeal(meal.food_name, '점심 식사')}>
                          <Ionicons name={'close'} size={24} color="gray" />
                        </TouchableOpacity>
                      </View>
                      <Text style={{fontSize: 12, marginBottom: 10}}>
                        탄수화물: {meal.carbs}g, 단백질: {meal.protein}g, 지방: {meal.fat}g,{' '}
                        {meal.kcal}kcal
                      </Text>
                    </View>
                  ))
                : `${lunchData.length}개 음식`}
            </Text>
            <TouchableOpacity onPress={() => setIsDetailVisible2(!isDetailVisible2)}>
              <Ionicons
                name={isDetailVisible2 ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.recommendButton}
          onPress={() => {
            navigation.navigate('MenusearchPage', {mealType: '저녁 식사', email: email});
          }}
        >
          <View style={styles.foodBox}>
            <Text style={styles.foodText}>저녁 식사</Text>
            <Ionicons name="add" size={32} color="gray" style={styles.icon} />
          </View>
        </TouchableOpacity>
        {dinnerData && dinnerData.length > 0 && (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '83%',
              alignSelf: 'center',
              marginBottom: 20,
            }}
          >
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {isDetailVisible3
                ? dinnerData.map((meal, index) => (
                    <View key={index}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{meal.food_name}</Text>
                        <TouchableOpacity onPress={() => deleteMeal(meal.food_name, '저녁 식사')}>
                          <Ionicons name={'close'} size={24} color="gray" />
                        </TouchableOpacity>
                      </View>
                      <Text style={{fontSize: 12, marginBottom: 10}}>
                        탄수화물: {meal.carbs}g, 단백질: {meal.protein}g, 지방: {meal.fat}g,{' '}
                        {meal.kcal}kcal
                      </Text>
                    </View>
                  ))
                : `${dinnerData.length}개 음식`}
            </Text>
            <TouchableOpacity onPress={() => setIsDetailVisible3(!isDetailVisible3)}>
              <Ionicons
                name={isDetailVisible3 ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.recommendButton}
          onPress={() => {
            navigation.navigate('MenusearchPage', {mealType: '간식', email: email});
          }}
        >
          <View style={styles.foodBox}>
            <Text style={styles.foodText}>간식</Text>
            <Ionicons name="add" size={32} color="gray" style={styles.icon} />
          </View>
        </TouchableOpacity>
        {snackData && snackData.length > 0 && (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '83%',
              alignSelf: 'center',
              marginBottom: 20,
            }}
          >
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {isDetailVisible4
                ? snackData.map((meal, index) => (
                    <View key={index}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{meal.food_name}</Text>
                        <TouchableOpacity onPress={() => deleteMeal(meal.food_name, '간식')}>
                          <Ionicons name={'close'} size={24} color="gray" />
                        </TouchableOpacity>
                      </View>
                      <Text style={{fontSize: 12, marginBottom: 10}}>
                        탄수화물: {meal.carbs}g, 단백질: {meal.protein}g, 지방: {meal.fat}g,{' '}
                        {meal.kcal}kcal
                      </Text>
                    </View>
                  ))
                : `${snackData.length}개 음식`}
            </Text>
            <TouchableOpacity onPress={() => setIsDetailVisible4(!isDetailVisible4)}>
              <Ionicons
                name={isDetailVisible4 ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={styles.recommendButton}
          onPress={() => {
            navigation.navigate('DietrecommendPage', {email: email});
          }}
        >
          <View style={[styles.foodBox, {backgroundColor: '#b7f0b1'}]}>
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
    backgroundColor: 'white',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    zIndex: 1,
  },
  icon: {
    marginRight: 10,
  },
  dateFont: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  calendarContainer: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  calendar: {
    paddingBottom: 30,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 20,
  },
  nutritionContainer: {
    alignItems: 'center',
    marginTop: 50,
    zIndex: 1,
  },
  nutritionContent: {
    flexDirection: 'row',
    width: '95%',
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  nutritionItem: {
    alignItems: 'flex-start',
  },
  nutritionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nutritionNum: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    zIndex: 1,
  },
  foodBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    height: 55,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    textAlign: 'center',
  },
});
