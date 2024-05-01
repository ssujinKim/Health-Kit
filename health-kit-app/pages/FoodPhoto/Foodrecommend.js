import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

export default function Foodrecommend({navigation, route}) {
  useEffect(() => {
    navigation.setOptions({
      title: '식품 추천 받기',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: 'black',
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.foodContainer}>
          <View style={styles.foodBox}>
            <View style={styles.foodPicture}></View>
            <View style={styles.foodMenu}>
              <Text style={styles.foodText}>김치볶음밥</Text>
              <View style={styles.horizontalLine} />
              <Text style={styles.kcalText}>250 kcal</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.continue}>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continuebuttonText}>완료하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  foodContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  foodBox: {
    flexDirection: 'row',
    width: '90%',
    height: 130,
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
  foodPicture: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
    left: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  foodMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foodText: {
    lineHeight: 70,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 30,
  },
  horizontalLine: {
    position: 'absolute',
    top: 50,
    left: 22,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '90%',
  },
  kcalText: {
    marginTop: 100,
    marginLeft: 80,
    fontWeight: 'bold',
    fontSize: 12,
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
