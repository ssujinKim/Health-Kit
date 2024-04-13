import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Ionicons} from '@expo/vector-icons';

export default function Health({navigation, route}) {
  useEffect(() => {
    navigation.setOptions({
      title: '건강 정보 수정',
      headerStyle: {
        backgroundColor: '#fff',
        // shadowColor: '#1F266A',
      },
      headerTintColor: 'black',
    });
  }, []);

  const [openDisease, setOpenDisease] = useState([null]);
  const [valueDisease, setValueDisease] = useState([null]);
  const [disease, setDisease] = useState([
    {label: '당뇨', value: '1'},
    {label: '고지혈증', value: '2'},
    {label: '고혈압', value: '3'},
  ]);

  const [openMedicine, setOpenMedicine] = useState([null]);
  const [valueMedicine, setValueMedicine] = useState([null]);
  const [medicine, setMedicine] = useState([
    {label: '보기1', value: '1'},
    {label: '보기2', value: '2'},
  ]);

  const handleAddDropdown = (type) => {
    if (type === 'disease' && openDisease.length < 5) {
      setOpenDisease([...openDisease, null]);
      setValueDisease([...valueDisease, null]);
    } else if (type === 'medicine' && openMedicine.length < 5) {
      setOpenMedicine([...openMedicine, null]);
      setValueMedicine([...valueMedicine, null]);
    }
  };

  const handleOpenDisease = (index) => {
    const updatedOpenState = [...openDisease];
    updatedOpenState[index] = !updatedOpenState[index];
    setOpenDisease(updatedOpenState);
  };

  const handleOpenMedicine = (index) => {
    const updatedOpenState = [...openMedicine];
    updatedOpenState[index] = !updatedOpenState[index];
    setOpenMedicine(updatedOpenState);
  };

  const handleSelectDisease = (index, newValue) => {
    const updatedValueState = [...valueDisease];
    updatedValueState[index] = newValue;
    setValueDisease(updatedValueState);
  };

  const handleSelectMedicine = (index, newValue) => {
    const updatedValueState = [...valueMedicine];
    updatedValueState[index] = newValue;
    setValueMedicine(updatedValueState);
  };

  const handleRemoveDropdown = (type, index) => {
    if (type === 'disease') {
      const updatedOpenState = [...openDisease];
      updatedOpenState.splice(index, 1);
      setOpenDisease(updatedOpenState);

      const updatedValueState = [...valueDisease];
      updatedValueState.splice(index, 1);
      setValueDisease(updatedValueState);
    } else if (type === 'medicine') {
      const updatedOpenState = [...openMedicine];
      updatedOpenState.splice(index, 1);
      setOpenMedicine(updatedOpenState);

      const updatedValueState = [...valueMedicine];
      updatedValueState.splice(index, 1);
      setValueMedicine(updatedValueState);
    }
  };

  const [gender, setGender] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <Text style={styles.contentText}>건강상태를 수정해주세요</Text>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>나이</Text>
              <TextInput style={styles.input} underlineColorAndroid="transparent" />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>키(cm)</Text>
              <TextInput style={styles.input} underlineColorAndroid="transparent" />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>몸무게(kg)</Text>
              <TextInput style={styles.input} underlineColorAndroid="transparent" />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>성별</Text>
              <TouchableOpacity
                onPress={() => setGender('male')}
                style={[styles.radioButton, gender === 'male' && styles.selectedRadioButton]}
              >
                <View style={styles.radioButtonCircle}>
                  {gender === 'male' && <View style={styles.selectedRadioButtonCircle} />}
                </View>
                <Text style={styles.radioButtonText}>남자</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setGender('female')}
                style={[styles.radioButton, gender === 'female' && styles.selectedRadioButton]}
              >
                <View style={styles.radioButtonCircle}>
                  {gender === 'female' && <View style={styles.selectedRadioButtonCircle} />}
                </View>
                <Text style={styles.radioButtonText}>여자</Text>
              </TouchableOpacity>
            </View>
            {openDisease.map((isOpen, index) => (
              <View key={index} style={styles.dropContainer} zIndex={100}>
                {index > 0 && (
                  <TouchableOpacity onPress={() => handleRemoveDropdown('disease', index)}>
                    <Ionicons name="remove" size={24} color="black" />
                  </TouchableOpacity>
                )}
                <Text style={styles.textStyle}>질병</Text>
                <DropDownPicker
                  containerStyle={styles.dropdownContainer}
                  style={styles.dropdown}
                  open={isOpen}
                  value={valueDisease[index]}
                  items={disease}
                  setOpen={() => handleOpenDisease(index)}
                  setValue={(newValue) => handleSelectDisease(index, newValue)}
                  setItems={setDisease}
                  placeholder=""
                  modalProps={{animationType: 'fade'}}
                />
              </View>
            ))}
            <TouchableOpacity
              style={styles.diseaseContainer}
              onPress={() => handleAddDropdown('disease')}
            >
              <Ionicons name="add" size={24} color="black" />
              <Text style={styles.addDisease}>질병 추가하기</Text>
            </TouchableOpacity>

            {openMedicine.map((isOpen, index) => (
              <View key={index} style={styles.dropContainer}>
                {index > 0 && (
                  <TouchableOpacity onPress={() => handleRemoveDropdown('medicine', index)}>
                    <Ionicons name="remove" size={24} color="black" />
                  </TouchableOpacity>
                )}
                <Text style={styles.textStyle}>복용약</Text>
                <DropDownPicker
                  containerStyle={styles.dropdownContainer}
                  style={styles.dropdown}
                  open={isOpen}
                  value={valueMedicine[index]}
                  items={medicine}
                  setOpen={() => handleOpenMedicine(index)}
                  setValue={(newValue) => handleSelectMedicine(index, newValue)}
                  setItems={setMedicine}
                  placeholder=""
                  modalProps={{animationType: 'fade'}}
                />
              </View>
            ))}
            <TouchableOpacity
              style={styles.medicineContainer}
              onPress={() => handleAddDropdown('medicine')}
            >
              <Ionicons name="add" size={24} color="black" />
              <Text style={styles.addMedicine}>약 추가하기</Text>
            </TouchableOpacity>
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
  scrollViewContent: {
    paddingBottom: 1100,
  },
  content: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  contentText: {
    fontSize: 25,
    fontWeight: 'bold',
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
  dropContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    marginBottom: 10,
  },
  dropdownContainer: {
    width: '65%',
  },
  diseaseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  medicineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addDisease: {
    marginLeft: 5,
    fontSize: 16,
  },
  addMedicine: {
    marginLeft: 5,
    fontSize: 16,
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
