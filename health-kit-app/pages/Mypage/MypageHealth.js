import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, TextInput, ScrollView, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';

export default function MypageHealth({navigation, route}) {
  const {email} = route.params;

  const [userInfo, setUserInfo] = useState({
    email: '',
    height: 0,
    weight: 0,
    age: 0,
    gender: '',
    diseases: ['', '', ''],
    medicine: ['', '', ''],
  });

  // userInfo에서 각 필드를 추출
  const {height, weight, age, gender} = userInfo;

  // 질병
  const [dSearchTexts, dSetSearchTexts] = useState(['', '', '']);
  const [dSearchResults, dSetSearchResults] = useState([[], [], []]);
  const [dIsFocused, dSetIsFocused] = useState([false, false, false]);

  const fetchSearchDisease = async (searchText, index) => {
    try {
      const response = await axios.post('http://192.168.35.196:3000/searchDisease', {searchText});
      if (response.data.success) {
        dSetSearchResults((prevResults) =>
          prevResults.map((result, idx) => (idx === index ? response.data.data : result))
        );
      } else {
        dSetSearchResults((prevResults) =>
          prevResults.map((result, idx) => (idx === index ? [] : result))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dSearchTexts.forEach((searchText, index) => {
      if (searchText && searchText.trim()) {
        fetchSearchDisease(searchText, index);
      } else {
        dSetSearchResults((prevResults) =>
          prevResults.map((result, idx) => (idx === index ? [] : result))
        );
      }
    });
  }, [dSearchTexts]);

  // 의약품
  const [mSearchTexts, mSetSearchTexts] = useState(['', '', '']);
  const [mSearchResults, mSetSearchResults] = useState([[], [], []]);
  const [mIsFocused, mSetIsFocused] = useState([false, false, false]);

  const fetchSearchMedicine = async (searchText, index) => {
    try {
      const response = await axios.post('http://192.168.35.196:3000/searchMedicine', {searchText});
      if (response.data.success) {
        mSetSearchResults((prevResults) =>
          prevResults.map((result, idx) => (idx === index ? response.data.data : result))
        );
      } else {
        mSetSearchResults((prevResults) =>
          prevResults.map((result, idx) => (idx === index ? [] : result))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    mSearchTexts.forEach((searchText, index) => {
      if (searchText && searchText.trim()) {
        fetchSearchMedicine(searchText, index);
      } else {
        mSetSearchResults((prevResults) =>
          prevResults.map((result, idx) => (idx === index ? [] : result))
        );
      }
    });
  }, [mSearchTexts]);

  useEffect(() => {
    navigation.setOptions({
      title: '건강 정보 수정',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: 'black',
    });

    // 사용자 정보 불러오기
    const fetchUserInfo = () => {
      const url = `http://192.168.35.196:3000/userInfo?email=${encodeURIComponent(email)}`;

      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          setUserInfo({
            nickname: data.nickname,
            email: data.email,
            height: data.height,
            weight: data.weight,
            age: data.age,
            gender: data.gender,
            diseases: [data.disease1, data.disease2, data.disease3],
            medicines: [data.medicine1, data.medicine2, data.medicine3],
          });

          // 사용자 정보가 성공적으로 가져와진 후 정보를 검색창에 미리 띄워줌
          dSetSearchTexts([data.disease1, data.disease2, data.disease3]);
          mSetSearchTexts([data.medicine1, data.medicine2, data.medicine3]);
        })
        .catch((error) => {
          console.error('사용자 정보를 가져오는 동안 에러가 발생했습니다:', error);
        });
    };

    fetchUserInfo();
  }, [email, navigation]);

  // 사용자 정보 전송
  const handleComplete = async () => {
    try {
      const updatedUserInfo = {
        ...userInfo,
        disease1: dSearchTexts[0],
        disease2: dSearchTexts[1],
        disease3: dSearchTexts[2],
        medicine1: mSearchTexts[0],
        medicine2: mSearchTexts[1],
        medicine3: mSearchTexts[2],
      };
      console.log(mSearchTexts[0]);

      await axios.post('http://192.168.35.196:3000/updateUserInfo', updatedUserInfo);
      console.log('건강 정보가 성공적으로 업데이트되었습니다.');
      Alert.alert('완료', '건강 정보가 성공적으로 업데이트되었습니다.', [
        {text: '확인', onPress: () => navigation.navigate('Mypage', {email: email})},
      ]);
    } catch (error) {
      console.error('건강 정보를 업데이트하는 동안 에러가 발생했습니다:', error);
    }
  };

  // 검색창 및 검색 결과를 렌더링하는 컴포넌트를 동적으로 생성하기 위한 함수
  // 질병
  const dRenderSearchBox = (index) => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={24} color="gray" style={{marginLeft: 15}} />
        <TextInput
          style={{
            marginLeft: 10,
            fontSize: 16,
            color: dSearchTexts[index] ? 'black' : 'lightgray',
            flex: 1,
          }}
          placeholder="질병 검색하기"
          placeholderTextColor="lightgray"
          value={dSearchTexts[index]}
          onChangeText={(text) =>
            dSetSearchTexts((prevTexts) => prevTexts.map((t, idx) => (idx === index ? text : t)))
          }
          onFocus={() =>
            dSetIsFocused((prevFocused) => prevFocused.map((f, idx) => (idx === index ? true : f)))
          }
        />
      </View>
      {dIsFocused[index] &&
        dSearchResults[index].map((disease, idx) => (
          <TouchableOpacity
            key={idx}
            style={{marginLeft: 15, marginBottom: 15}}
            onPress={() => {
              dSetSearchTexts((prevTexts) =>
                prevTexts.map((t, i) => (i === index ? disease.disease_name : t))
              );
              dSetIsFocused((prevFocused) => prevFocused.map((f, i) => (i === index ? false : f)));
            }}
          >
            <Text style={{fontSize: 18}}>{disease.disease_name}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );

  // 의약품
  const mRenderSearchBox = (index) => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={24} color="gray" style={{marginLeft: 15}} />
        <TextInput
          style={{
            marginLeft: 10,
            fontSize: 16,
            color: mSearchTexts[index] ? 'black' : 'lightgray',
            flex: 1,
          }}
          placeholder="의약품 검색하기"
          placeholderTextColor="lightgray"
          value={mSearchTexts[index]}
          onChangeText={(text) =>
            mSetSearchTexts((prevTexts) => prevTexts.map((t, idx) => (idx === index ? text : t)))
          }
          onFocus={() =>
            mSetIsFocused((prevFocused) => prevFocused.map((f, idx) => (idx === index ? true : f)))
          }
        />
      </View>
      {mIsFocused[index] &&
        mSearchResults[index].map((medicine, idx) => (
          <TouchableOpacity
            key={idx}
            style={{marginLeft: 15, marginBottom: 15}}
            onPress={() => {
              mSetSearchTexts((prevTexts) =>
                prevTexts.map((t, i) => (i === index ? medicine.medicine_name : t))
              );
              mSetIsFocused((prevFocused) => prevFocused.map((f, i) => (i === index ? false : f)));
            }}
          >
            <Text style={{fontSize: 18}}>{medicine.medicine_name}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{marginTop: 20}}>
        <ScrollView contentContainerStyle={{paddingBottom: 130}}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
            <Ionicons name={'checkmark'} size={24} style={styles.icon} />
            <Text style={styles.contentText}>기본 정보를 수정해주세요</Text>
          </View>
          <View style={styles.content1}>
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>나이</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(newAge) => setUserInfo({...userInfo, age: newAge})}
                  placeholder={`${age}`}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>키(cm)</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(newHeight) => setUserInfo({...userInfo, height: newHeight})}
                  placeholder={`${height}`}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>몸무게(kg)</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(newWeight) => setUserInfo({...userInfo, weight: newWeight})}
                  placeholder={`${weight}`}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputContainer, {marginBottom: 35}]}>
                <Text style={styles.textStyle}>성별</Text>
                <TouchableOpacity
                  //onPress={() => setGender('male')}
                  style={[styles.radioButton, gender === 'male' && styles.selectedRadioButton]}
                >
                  <View style={styles.radioButtonCircle}>
                    {gender === 'male' && <View style={styles.selectedRadioButtonCircle} />}
                  </View>
                  <Text style={styles.radioButtonText}>남자</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  //onPress={() => setGender('female')}
                  style={[styles.radioButton, gender === 'female' && styles.selectedRadioButton]}
                >
                  <View style={styles.radioButtonCircle}>
                    {gender === 'female' && <View style={styles.selectedRadioButtonCircle} />}
                  </View>
                  <Text style={styles.radioButtonText}>여자</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.horizontalLine1} />

          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
            <Ionicons name={'checkmark'} size={24} style={styles.icon} />
            <Text style={[styles.contentText, {marginTop: 20, marginBottom: 20}]}>
              질병을 선택해주세요
            </Text>
          </View>
          {dSearchTexts.map((_, index) => (
            <View key={index} style={styles.content2}>
              {dRenderSearchBox(index)}
            </View>
          ))}
          
          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
            <Ionicons name={'checkmark'} size={24} style={styles.icon} />
            <Text style={[styles.contentText, {marginTop: 20, marginBottom: 20}]}>
              복용중인 약을 선택해주세요
            </Text>
          </View>
          {mSearchTexts.map((_, index) => (
            <View key={index} style={styles.content3}>
              {mRenderSearchBox(index)}
            </View>
          ))}
          
          <View style={styles.continue}>
            <TouchableOpacity style={styles.continueButton} onPress={handleComplete}>
              <Text style={styles.continuebuttonText}>완료하기</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content1: {
    alignItems: 'center',
  },
  content2: {
    alignItems: 'center',
  },
  content3: {
    alignItems: 'center',
  },
  contentText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 5,
  },
  form: {
    flex: 1,
    top: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    marginBottom: 20,
  },
  textStyle: {
    fontSize: 20,
  },
  input: {
    height: 40,
    fontSize: 18,
    width: '65%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioButtonCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioButtonCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#000',
  },
  radioButtonText: {
    fontSize: 16,
    left: 10,
  },
  horizontalLine1: {
    position: 'absolute',
    top: 360, // 이메일 텍스트 아래에 위치하도록 설정
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '95%',
    alignSelf: 'center',
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

  searchBox: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '85%',
    height: 45,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 15,
    borderColor: 'lightgray',
    borderWidth: 1,
    marginBottom: 10,
  },
});