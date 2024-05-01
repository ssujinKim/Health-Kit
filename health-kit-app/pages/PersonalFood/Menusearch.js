import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function Menusearch({navigation, route}) {
  useEffect(() => {
    navigation.setOptions({
      title: '아침 식사',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: 'black',
    });
  }, []);

  // 입력 상태 관리
  const [searchText, setSearchText] = useState('');
  // 검색창 활성화 상태 관리
  const [isFocused, setIsFocused] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={28} color="gray" style={{marginLeft: 15}} />
          <TextInput
            style={{
              marginLeft: 10,
              fontSize: 22,
              color: searchText ? 'black' : 'lightgray',
              flex: 1,
            }}
            placeholder="음식 검색하기"
            placeholderTextColor="lightgray"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <TouchableOpacity
          style={styles.addContent}
          onPress={() => {
            navigation.navigate('MenuaddPage');
          }}
        >
          <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
            + 영양 성분 직접 추가하기
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    marginTop: 40,
  },
  searchBox: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    height: 55,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 15,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  addContent: {
    width: '90%',
    marginTop: 20,
  },
});
