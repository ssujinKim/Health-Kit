// 회원가입 화면 04 (건강상태)
// 비활성화 시키기
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Health({navigation, route}) {
  useEffect(() => {
    navigation.setOptions({
      title: '회원가입',
      headerStyle: {
        backgroundColor: '#fff',
        // shadowColor: '#1F266A',
      },
      headerTintColor: 'black',
    });
  }, []);
  const [openDisease, setOpenDisease] = useState(false);
  const [valueDisease, setValueDisease] = useState(null);
  const [disease, setDisease] = useState([
    {label: '당뇨', value: '1'},
    {label: '고지혈증', value: '2'},
    {label: '고혈압', value: '3'},
  ]);

  const [openCondition, setOpenCondition] = useState(false);
  const [valueCondition, setValueCondition] = useState(null);
  const [condition, setCondition] = useState([
    {label: '위', value: '1'},
    /* {label: '------------------', value: '-', disabled: true}, 구분선 둘까말까 */
    {label: '간', value: '2'},
  ]);

  const [openMedicine, setOpenMedicine] = useState(false);
  const [valueMedicine, setValueMedicine] = useState(null);
  const [medicine, setMedicine] = useState([
    {label: '보기1', value: '1'},
    {label: '보기2', value: '2'},
  ]);

  const handleOpenDisease = () => {
    setOpenDisease(!openDisease);
    setOpenCondition(false); // 다른 드롭다운 닫기
    setOpenMedicine(false); // 다른 드롭다운 닫기
  };

  const handleOpenCondition = () => {
    setOpenCondition(!openCondition);
    setOpenDisease(false);
    setOpenMedicine(false);
  };

  const handleOpenMedicine = () => {
    setOpenMedicine(!openMedicine);
    setOpenDisease(false);
    setOpenCondition(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.contentText}>건강상태를 입력해주세요</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.textStyle}>키(cm)</Text>
            <TextInput style={styles.input} underlineColorAndroid="transparent" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.textStyle}>몸무게(kg)</Text>
            <TextInput style={styles.input} underlineColorAndroid="transparent" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.textStyle}>질병</Text>
            <DropDownPicker
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              open={openDisease}
              value={valueDisease}
              items={disease}
              setOpen={handleOpenDisease}
              setValue={setValueDisease}
              setItems={setDisease}
              placeholder=""
              // listMode="MODAL"
              modalProps={{
                animationType: 'fade',
              }}
              // modalTitle="선택해주세요."
            />
          </View>
          <View style={[styles.inputContainer, {zIndex: openDisease ? -1 : 1}]}>
            <Text style={styles.textStyle}>여기가 안 좋아요</Text>
            <DropDownPicker
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              open={openCondition}
              value={valueCondition}
              items={condition}
              setOpen={handleOpenCondition}
              setValue={setValueCondition}
              setItems={setCondition}
              placeholder=""
              // listMode="MODAL"
              modalProps={{
                animationType: 'fade',
              }}
              // modalTitle="선택해주세요."
            />
          </View>
          <View style={[styles.inputContainer, {zIndex: openDisease || openCondition ? -1 : 1}]}>
            <Text style={styles.textStyle}>복용중인 약</Text>
            <DropDownPicker
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              open={openMedicine}
              value={valueMedicine}
              items={medicine}
              setOpen={handleOpenMedicine}
              setValue={setValueMedicine}
              setItems={setMedicine}
              placeholder=""
              // listMode="MODAL"
              modalProps={{
                animationType: 'fade',
              }}
              // modalTitle="선택해주세요."
            />
          </View>
        </View>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 20,
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
    zIndex: 1, // 다른 요소 위에 표시되도록 설정
  },
  textStyle: {
    fontSize: 20,
    marginRight: 20,
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
  dropdownContainer: {
    width: '55%',
  },
  dropdown: {
    width: '100%',
  },
});
