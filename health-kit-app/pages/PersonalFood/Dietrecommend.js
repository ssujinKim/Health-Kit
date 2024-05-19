import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function DietRecommend({navigation, route}) {
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
      <Text
        style={{fontSize: 20, fontWeight: 'bold', marginLeft: 25, marginTop: 30, marginBottom: 5}}
      >
        원하는 식단유형을 선택해주세요
      </Text>
      <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 25, marginBottom: 30}}>
        (한 가지 이상)
      </Text>
      <View style={styles.preferenceRow}>
        {Object.keys(preferences)
          .slice(0, 2)
          .map((preference) => (
            <TouchableOpacity
              key={preference}
              style={preferences[preference] ? styles.selectedPreference : styles.preference}
              onPress={() => togglePreference(preference)}
            >
              <Ionicons
                name={preferences[preference] ? 'checkmark' : 'add'}
                size={12}
                style={styles.icon}
              />
              <Text style={styles.text}>{preferenceLabels[preference]}</Text>
            </TouchableOpacity>
          ))}
      </View>
      <View style={styles.preferenceRow}>
        {Object.keys(preferences)
          .slice(2, 5)
          .map((preference) => (
            <TouchableOpacity
              key={preference}
              style={preferences[preference] ? styles.selectedPreference1 : styles.preference1}
              onPress={() => togglePreference(preference)}
            >
              <Ionicons
                name={preferences[preference] ? 'checkmark' : 'add'}
                size={12}
                style={styles.icon}
              />
              <Text style={styles.text}>{preferenceLabels[preference]}</Text>
            </TouchableOpacity>
          ))}
      </View>
      <View style={styles.preferenceRow}>
        {Object.keys(preferences)
          .slice(5, 7)
          .map((preference) => (
            <TouchableOpacity
              key={preference}
              style={preferences[preference] ? styles.selectedPreference : styles.preference}
              onPress={() => togglePreference(preference)}
            >
              <Ionicons
                name={preferences[preference] ? 'checkmark' : 'add'}
                size={12}
                style={styles.icon}
              />
              <Text style={styles.text}>{preferenceLabels[preference]}</Text>
            </TouchableOpacity>
          ))}
      </View>
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
    backgroundColor: 'white',
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 50,
    padding: 10,
    width: '30%',
    height: 45,
    margin: 5,
  },
  selectedPreference: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#86e57f',
    backgroundColor: '#b7f0b1',
    borderRadius: 50,
    padding: 10,
    width: '30%',
    height: 45,
    margin: 5,
  },
  preference1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 50,
    padding: 10,
    width: '25%',
    height: 45,
    margin: 10,
  },
  selectedPreference1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#86e57f',
    backgroundColor: '#b7f0b1',
    borderRadius: 50,
    padding: 10,
    width: '25%',
    height: 45,
    margin: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
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
});
