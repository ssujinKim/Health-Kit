import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity, TextInput, FlatList} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';

export default function Menusearch({navigation, route}) {
  const {email, mealType} = route.params;

  // 입력 상태 및 검색 결과 상태 관리
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // 검색창 활성화 상태 관리
  const [isFocused, setIsFocused] = useState(false);

  // 검색 텍스트가 변경될 때마다 실행되는 함수
  const fetchSearchResults = async (searchText) => {
    try {
      const response = await axios.post('http://192.168.0.11:3000/searchFood', {searchText});
      if (response.data.success) {
        setSearchResults(response.data.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // searchText 상태가 변경될 때마다 fetchSearchResults 호출
  useEffect(() => {
    if (searchText.trim()) {
      fetchSearchResults(searchText);
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  useEffect(() => {
    navigation.setOptions({
      title: mealType,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: 'black',
    });
  }, [navigation, route.params]);

  const getFormattedDate = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  };

  const submitData = async (selectedItem) => {
    try {
      console.log(route.params);
      const todayDate = getFormattedDate(); // 오늘 날짜를 구함
      const response = await axios.post('http://192.168.0.11:3000/menuSearchAdd', {
        email: email,
        food: selectedItem.food_name, // 여기를 수정
        date: todayDate,
        meal_type: mealType,
      });
      console.log(response.data);
      Alert.alert('성공', '식단 정보가 업데이트되었습니다.', [{text: '확인'}]);
      navigation.navigate('MenuinputPage', {email: email});
    } catch (error) {
      console.error(error);
      Alert.alert('실패', '데이터 저장 중 오류가 발생했습니다.', [{text: '확인'}]);
    }
  };

  return (
    <FlatList
      data={searchText.trim().length > 0 ? searchResults : []}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={28} color="gray" style={{marginLeft: 15}} />
            <TextInput
              style={{
                marginLeft: 10,
                fontSize: 20,
                color: searchText ? 'black' : 'lightgray',
                flex: 1,
              }}
              placeholder="음식을 검색해보세요!"
              placeholderTextColor="lightgray"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>
      }
      renderItem={({item, index}) => (
        <TouchableOpacity
          key={index}
          style={{
            margin: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
            top: 10,
            paddingBottom: 15,
            left: 10,
          }}
          onPress={() => setSearchText(item.food_name)}
        >
          <View
            style={{
              flexDirection: 'column',
            }}
          >
            <Text style={{fontSize: 18, fontWeight: '400'}}>{item.food_name}</Text>
            <Text style={{fontSize: 12, marginTop: 5, color:'gray'}}>
              100g 당 {item.kcal}Kcal, 탄수화물: {item.carbs}g, 단백질: {item.protein}g, 지방: {item.fat}g
            </Text>
          </View>
          <TouchableOpacity onPress={() => submitData(item)}>
            <Ionicons name="add" size={32} color="black" />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      ListFooterComponent={
        searchResults.length === 0 || searchText.trim().length === 0 ? (
          <TouchableOpacity
            style={styles.addContent}
            onPress={() => {
              navigation.navigate('MenuaddPage', {
                mealType: route.params?.mealType || '기본값',
                email: email,
              });
            }}
          >
            <Text style={{marginLeft: 20, fontSize: 18, fontWeight: 'bold'}}>
              + 영양 성분 직접 추가하기
            </Text>
          </TouchableOpacity>
        ) : null
      }
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  searchBox: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 25,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  addContent: {
    width: '90%',
    marginTop: 20,
  },
});