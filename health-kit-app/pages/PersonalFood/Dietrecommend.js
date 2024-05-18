import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';

export default function Dietrecommend({navigation, route}) {
  const {email} = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: '식단 추천',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: 'black',
    });
  }, []);

  const [preferences, setPreferences] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });

  // 영양소 한국어 매핑
  const preferenceLabels = {
    1: '에너지 30% 미만',
    2: '에너지 30% 초과',
    3: '저지방',
    4: '고단백',
    5: '저나트륨',
    6: '저탄수화물',
    7: '저콜레스테롤',
  };

  const togglePreference = (preference) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [preference]: !prevPreferences[preference],
    }));
  };

  const handleNext = () => {
    const filteredPreferences = Object.entries(preferences)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => key);

    navigation.navigate('RecommendresultPage', {email: email, preferences: filteredPreferences});
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
