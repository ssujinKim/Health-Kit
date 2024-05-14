import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

export default function Dietrecommend({navigation, route}) {
  useEffect(() => {
    navigation.setOptions({
      title: '식단 추천',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: 'black',
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={{marginLeft: 25, marginTop: 30, fontSize: 20, fontWeight: 'bold'}}>
        기준 영양성분을 토대로 추천해드려요 :)
      </Text>
      <View style={styles.foodContainer}>
        <View style={styles.foodBox}>
          <Image
            source={require('./../../assets/foodimages/bibimbap.jpg')}
            style={{width: 100, height: 100, left: 10, alignSelf: 'center', borderRadius: 10}}
          />
          <View style={styles.foodMenu}>
            <Text style={styles.foodText}>비빕밥</Text>
            <View style={styles.horizontalLine} />
            <Text style={styles.kcalText}>650 kcal</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
    marginLeft: 100,
    fontWeight: 'bold',
    fontSize: 12,
  },
});
