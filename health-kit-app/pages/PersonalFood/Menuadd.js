import React, {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export default function Menuadd({navigation, route}) {
  useEffect(() => {
    navigation.setOptions({
      title: '아침 식사',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: 'black',
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>음식</Text>
              <TextInput style={styles.input} underlineColorAndroid="transparent" />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>탄수화물(g)</Text>
              <TextInput style={styles.input} underlineColorAndroid="transparent" />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>단백질(g)</Text>
              <TextInput style={styles.input} underlineColorAndroid="transparent" />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>지방(g)</Text>
              <TextInput style={styles.input} underlineColorAndroid="transparent" />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>칼로리(kcal)</Text>
              <TextInput style={styles.input} underlineColorAndroid="transparent" />
            </View>
          </View>
        </View>
        <View style={styles.continue}>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continuebuttonText}>완료하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 20,
  },
  form: {
    flex: 1,
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
    marginRight: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    fontSize: 18,
    width: '55%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    right: 0,
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
