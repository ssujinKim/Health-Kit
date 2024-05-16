// 필요없는 코드는 빼주세요 수진씨.
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {CheckBox} from 'react-native-elements';

export default function Dietrecommend({navigation, route}) {
  const {email} = route.params;

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
      title: '식단 추천',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: 'black',
    });

    axios
      .get(
        `http://10.50.213.228:3000/run-python-dr?email=${encodeURIComponent(
          email
        )}&date=${encodeURIComponent(todayDate)}`
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

  const [preferences, setPreferences] = useState({
    lower30Energy: false,
    upper30Energy: false,
    lowFat: false,
    highProtein: false,
    lowSodium: false,
    lowCarb: false,
  });

  // 영양소 한국어 매핑
  const preferenceLabels = {
    lower30Energy: '에너지 30% 미만',
    upper30Energy: '에너지 30% 초과',
    lowFat: '저지방',
    highProtein: '고단백',
    lowSodium: '저나트륨',
    lowCarb: '저탄수화물',
  };

  const togglePreference = (preference) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [preference]: !prevPreferences[preference],
    }));
  };

  const handleNext = () => {
    // navigation.navigate('RecommendresultPage');
  };

  return (
    <View style={styles.container}>
      <Text>영양성분을 선택해주세요 (중복선택가능)</Text>
      {Object.keys(preferences).map((preference) => (
        <View key={preference} style={styles.preference}>
          <CheckBox
            checked={preferences[preference]}
            onPress={() => togglePreference(preference)}
          />
          {/* 한국어 라벨 사용 */}
          <Text style={styles.text}>{preferenceLabels[preference]}</Text>
        </View>
      ))}
      <View style={styles.continue}>
        <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
          <Text style={styles.continuebuttonText}>계속하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preference: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    marginLeft: 8,
  },
  continue: {
    position: 'absolute',
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  continueButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 120,
    borderRadius: 5,
  },
  continuebuttonText: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
  },
});
