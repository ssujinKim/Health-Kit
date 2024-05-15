import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';

export default function Menusearch({navigation, route}) {
  const {email} = route.params;

  // 입력 상태 및 검색 결과 상태 관리
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // 검색창 활성화 상태 관리
  const [isFocused, setIsFocused] = useState(false);

  // 검색 텍스트가 변경될 때마다 실행되는 함수
  const fetchSearchResults = async (searchText) => {
    try {
      const response = await axios.post('http://192.168.35.243:3000/searchFood', {searchText});
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
    const mealType = route.params?.mealType || '기본값';

    navigation.setOptions({
      title: mealType,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: 'black',
    });
  }, [navigation, route.params]);

  return (
    <FlatList
      data={searchResults}
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
          <Text style={{fontSize: 18, fontWeight: '400'}}>{item.food_name}</Text>
          <Ionicons name="add" size={32} color="black" />
        </TouchableOpacity>
      )}
      ListFooterComponent={
        searchResults.length === 0 ? (
          <TouchableOpacity
            style={styles.addContent}
            onPress={() => {
              navigation.navigate('MenuaddPage', {mealType: route.params?.mealType || '기본값'});
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
    borderRadius: 15,
    borderColor: 'lightgray',
    borderWidth: 1.5,
  },
  addContent: {
    width: '90%',
    marginTop: 20,
  },
});
