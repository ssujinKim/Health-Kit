// 로딩 화면
// 로고를 넣을까..?
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import logo from './../assets/logo.png';

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.imageStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
