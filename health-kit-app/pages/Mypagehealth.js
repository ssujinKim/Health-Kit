import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, TextInput, ScrollView, Alert} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

export default function Health({navigation, route}) {
  const {email} = route.params;

  const [userInfo, setUserInfo] = useState({
    email: '',
    height: 0,
    weight: 0,
    age: 0,
    gender: '',
    disease1: '',
    disease2: '',
    disease3: '',
  });

  // userInfo에서 각 필드를 추출
  const {height, weight, age, gender, disease1, disease2, disease3} = userInfo;

  useEffect(() => {
    navigation.setOptions({
      title: '건강 정보 수정',
      headerStyle: {
        backgroundColor: '#fff',
        // shadowColor: '#1F266A',
      },
      headerTintColor: 'black',
    });

    const fetchUserInfo = () => {
      const url = `http://10.50.231.252:3000/userInfo?email=${encodeURIComponent(email)}`;

      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          setUserInfo({
            nickname: data.nickname,
            email: data.email,
            height: data.height,
            weight: data.weight,
            age: data.age,
            gender: data.gender,
            disease1: data.disease1,
            disease2: data.disease2,
            disease3: data.disease3,
          });
        })
        .catch((error) => {
          console.error('사용자 정보를 가져오는 동안 에러가 발생했습니다:', error);
        });
    };

    const fetchDiseaseInfo = async () => {
      try {
        const response = await axios.get('http://10.50.231.252:3000/disease');
        // 서버로부터 받은 질병 정보를 상태에 저장
        const diseaseItems = response.data.map(disease => ({
          label: disease.disease_name, value: disease.disease_name
        }));
        setDisease(diseaseItems);
      } catch (error) {
        console.error('질병 정보를 가져오는 동안 에러가 발생했습니다:', error);
      }
    };
    
    fetchDiseaseInfo();
    fetchUserInfo();

    setValueDisease1(disease1);
    setValueDisease2(disease2);
    setValueDisease3(disease3);
  }, [email]);

  const handleComplete = async () => {
    try {
      const updatedUserInfo = { ...userInfo, 
      disease1: valueDisease1 || userInfo.disease1, // 선택한 값이 없으면 이전 값으로 유지
      disease2: valueDisease2 || userInfo.disease2,
      disease3: valueDisease3 || userInfo.disease3, };
      await axios.post('http://10.50.231.252:3000/updateUserInfo', updatedUserInfo);
      console.log('건강 정보가 성공적으로 업데이트되었습니다.');
      Alert.alert('완료', '건강 정보가 성공적으로 업데이트되었습니다.', [
        {text: '확인', onPress: () => navigation.navigate('Mypage', {email: email})},
      ]);
    } catch (error) {
      console.error('건강 정보를 업데이트하는 동안 에러가 발생했습니다:', error);
    }
  };

  const [openDisease1, setOpenDisease1] = useState(false);
  const [valueDisease1, setValueDisease1] = useState(null);
  const [openDisease2, setOpenDisease2] = useState(false);
  const [valueDisease2, setValueDisease2] = useState(null);
  const [openDisease3, setOpenDisease3] = useState(false);
  const [valueDisease3, setValueDisease3] = useState(null);
  const [disease, setDisease] = useState([]);

  const [openMedicine1, setOpenMedicine1] = useState(false);
  const [valueMedicine1, setValueMedicine1] = useState(null);
  const [openMedicine2, setOpenMedicine2] = useState(false);
  const [valueMedicine2, setValueMedicine2] = useState(null);
  const [openMedicine3, setOpenMedicine3] = useState(false);
  const [valueMedicine3, setValueMedicine3] = useState(null);
  const [medicine1, setMedicine1] = useState([
    {label: '약1', value: '1'},
    {label: '약2', value: '2'},
  ]);

  const handleOpenDisease1 = () => {
    setOpenDisease1(!openDisease1);
    setOpenDisease2(false);
    setOpenDisease3(false);
    setOpenMedicine1(false);
    setOpenMedicine2(false);
    setOpenMedicine3(false);
  };

  const handleOpenDisease2 = () => {
    setOpenDisease2(!openDisease2);
    setOpenDisease1(false);
    setOpenDisease3(false);
    setOpenMedicine1(false);
    setOpenMedicine2(false);
    setOpenMedicine3(false);
  };

  const handleOpenDisease3 = () => {
    setOpenDisease3(!openDisease3);
    setOpenDisease1(false);
    setOpenDisease2(false);
    setOpenMedicine1(false);
    setOpenMedicine2(false);
    setOpenMedicine3(false);
  };

  const handleOpenMedicine1 = () => {
    setOpenMedicine1(!openMedicine1);
    setOpenDisease1(false);
    setOpenDisease2(false);
    setOpenDisease3(false);
    setOpenMedicine2(false);
    setOpenMedicine3(false);
  };

  const handleOpenMedicine2 = () => {
    setOpenMedicine2(!openMedicine2);
    setOpenDisease1(false);
    setOpenDisease2(false);
    setOpenDisease3(false);
    setOpenMedicine1(false);
    setOpenMedicine3(false);
  };

  const handleOpenMedicine3 = () => {
    setOpenMedicine3(!openMedicine3);
    setOpenDisease1(false);
    setOpenDisease2(false);
    setOpenDisease3(false);
    setOpenMedicine1(false);
    setOpenMedicine2(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollViewContent, {paddingBottom: 1200}]}>
        <View style={styles.content}>
          <Text style={styles.contentText}>기본 정보를 수정해주세요</Text>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>나이</Text>
              <TextInput style={styles.input} underlineColorAndroid="transparent" 
              onChangeText={(newAge) => setUserInfo({...userInfo, age: newAge})} placeholder={`${age}`} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>키(cm)</Text>
              <TextInput style={styles.input} underlineColorAndroid="transparent" 
              onChangeText={(newHeight) => setUserInfo({...userInfo, height: newHeight})} placeholder={`${height}`} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>몸무게(kg)</Text>
              <TextInput style={styles.input} underlineColorAndroid="transparent" 
              onChangeText={(newWeight) => setUserInfo({...userInfo, weight: newWeight})} placeholder={`${weight}`} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>성별</Text>
              <TouchableOpacity
                //onPress={() => setGender('male')}
                style={[styles.radioButton, gender === 'male' && styles.selectedRadioButton]}
              >
                <View style={styles.radioButtonCircle}>
                  {gender === 'male' && <View style={styles.selectedRadioButtonCircle} />}
                </View>
                <Text style={styles.radioButtonText}>남자</Text>
              </TouchableOpacity>
              <TouchableOpacity
                //onPress={() => setGender('female')}
                style={[styles.radioButton, gender === 'female' && styles.selectedRadioButton]}
              >
                <View style={styles.radioButtonCircle}>
                  {gender === 'female' && <View style={styles.selectedRadioButtonCircle} />}
                </View>
                <Text style={styles.radioButtonText}>여자</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.horizontalLine1} />
            <Text style={[styles.contentText, {marginTop: 40, marginBottom: 20}]}>
              질병을 선택해주세요
            </Text>
            <View style={[styles.inputContainer, {zIndex: 5}]}>
              <Text style={styles.textStyle}>1.</Text>
              <DropDownPicker
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                open={openDisease1}
                value={valueDisease1 || disease1}
                items={disease}
                setOpen={handleOpenDisease1}
                setValue={setValueDisease1}
                placeholder=""
                // listMode="MODAL"
                modalProps={{
                  animationType: 'fade',
                }}
                // modalTitle="선택해주세요."
              />
            </View>
            <View style={[styles.inputContainer, {zIndex: 4}]}>
              <Text style={styles.textStyle}>2.</Text>
              <DropDownPicker
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                open={openDisease2}
                value={valueDisease2 || disease2}
                items={disease}
                setOpen={handleOpenDisease2}
                setValue={setValueDisease2}
                placeholder=""
                // listMode="MODAL"
                modalProps={{
                  animationType: 'fade',
                }}
                // modalTitle="선택해주세요."
              />
            </View>
            <View style={[styles.inputContainer, {zIndex: 3}]}>
              <Text style={styles.textStyle}>3.</Text>
              <DropDownPicker
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                open={openDisease3}
                value={valueDisease3 || disease3}
                items={disease}
                setOpen={handleOpenDisease3}
                setValue={setValueDisease3}
                placeholder=""
                // listMode="MODAL"
                modalProps={{
                  animationType: 'fade',
                }}
                // modalTitle="선택해주세요."
              />
            </View>

            <View style={styles.horizontalLine2} />
            <Text style={[styles.contentText, {marginTop: 40, marginBottom: 20}]}>
              복용중인 약을 선택해주세요
            </Text>
            <View style={[styles.inputContainer, {zIndex: 2}]}>
              <Text style={styles.textStyle}>1.</Text>
              <DropDownPicker
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                open={openMedicine1}
                value={valueMedicine1}
                items={medicine1}
                setOpen={handleOpenMedicine1}
                setValue={setValueMedicine1}
                placeholder=""
                // listMode="MODAL"
                modalProps={{
                  animationType: 'fade',
                }}
                // modalTitle="선택해주세요."
              />
            </View>
            <View style={[styles.inputContainer, {zIndex: 1}]}>
              <Text style={styles.textStyle}>2.</Text>
              <DropDownPicker
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                open={openMedicine2}
                value={valueMedicine2}
                items={medicine1}
                setOpen={handleOpenMedicine2}
                setValue={setValueMedicine2}
                placeholder=""
                // listMode="MODAL"
                modalProps={{
                  animationType: 'fade',
                }}
                // modalTitle="선택해주세요."
              />
            </View>
            <View style={[styles.inputContainer]}>
              <Text style={styles.textStyle}>3.</Text>
              <DropDownPicker
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                open={openMedicine3}
                value={valueMedicine3}
                items={medicine1}
                setOpen={handleOpenMedicine3}
                setValue={setValueMedicine3}
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
      </ScrollView>

      <View style={styles.continue}>
        <TouchableOpacity style={styles.continueButton} onPress={handleComplete}>
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
  dropdownContainer: {
    width: '65%',
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

  horizontalLine1: {
    position: 'absolute',
    top: 325,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '95%',
    alignSelf: 'center',
  },

  horizontalLine2: {
    position: 'absolute',
    top: 655, // 이메일 텍스트 아래에 위치하도록 설정
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '95%',
    alignSelf: 'center',
  },
});
