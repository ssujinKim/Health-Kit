import React, {useState} from 'react';
import {StyleSheet, Modal, View, Pressable, Text, TextInput, TouchableOpacity} from 'react-native';
import UploadMode from './UploadMode';

export default function FoodInput({visible, onClose, navigation}) {
  const [productName, setProductName] = useState('');
  const [calories, setCalories] = useState('');
  const [calorieType, setCalorieType] = useState('total');

  // 체크박스 선택 핸들러
  const handleCheckboxChange = (type) => {
    setCalorieType(type);
  };

  const [modalVisible, setModalVisible] = useState(false); // UploadMode 모달 상태 관리

  const handleOpenUploadMode = () => {
    setModalVisible(true);
    onClose(); // FoodInput 모달 닫기
  };

  return (
    <>
      <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
        <Pressable style={styles.background} onPress={onClose}>
          <View style={styles.whiteBox} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalText}>식품명</Text>
            <TextInput style={styles.foodinput} value={productName} onChangeText={setProductName} />
            <Text style={styles.modalText}>칼로리</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={styles.kcalinput}
                value={calories}
                keyboardType="numeric"
                onChangeText={setCalories}
              />
              {/* 전체 칼로리 선택 */}
              <View style={{flexDirection: 'column'}}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => handleCheckboxChange('total')}
                >
                  <View
                    style={calorieType === 'total' ? styles.perCheckbox : styles.totalCheckbox}
                  />
                  <Text style={styles.label}>총 칼로리</Text>
                </TouchableOpacity>
                {/* 100g당 칼로리 선택 */}
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => handleCheckboxChange('per100g')}
                >
                  <View
                    style={calorieType === 'per100g' ? styles.perCheckbox : styles.totalCheckbox}
                  />
                  <Text style={styles.label}>100g당 칼로리</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={handleOpenUploadMode}>
              <View style={styles.submitButton}>
                <Text style={styles.submitButtonText}>상품정보 촬영하기</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
      <UploadMode
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      />
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: '75%',
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 16,
    elevation: 2,
  },
  modalText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
  },
  foodinput: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  kcalinput: {
    height: 40,
    width: '64%',
    marginBottom: 40,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    marginLeft: 5,
  },
  totalCheckbox: {
    width: 17,
    height: 17,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFF',
  },
  perCheckbox: {
    width: 17,
    height: 17,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#000',
  },
  label: {
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
