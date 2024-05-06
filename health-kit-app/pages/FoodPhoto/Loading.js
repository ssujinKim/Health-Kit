import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [pythonData, setPythonData] = useState('');

  useEffect(() => {
    axios.get('http://192.168.0.11:3000/run-python')
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>분석 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>파이썬 데이터: {pythonData}</Text>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  loadingText: {
    marginTop: 20, // 로딩 인디케이터와 텍스트 사이 간격
    fontSize: 20, // 텍스트 크기
  },
});

export default LoadingScreen;
