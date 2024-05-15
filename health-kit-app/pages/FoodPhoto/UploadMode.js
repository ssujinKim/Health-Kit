import React, {useState} from 'react';
import {StyleSheet, Modal, View, Pressable, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

function UploadMode({visible, onClose}) {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  const requestCameraPermission = async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera permissions to make this work!');
      return false;
    }
    return true;
  };

  const takeAndCropPhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      uploadImage(uri);
      onClose(); // 모달 닫기
    }
  };

  const selectPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      uploadImage(uri);
      onClose(); // 모달 닫기
    }
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append('file', {
      uri: uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await axios.post('http://192.168.35.243:3000/imageUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('성공');
      console.log(response.data);
      navigation.navigate('LoadingPage');
    } catch (error) {
      console.log('실패');
      console.log(error);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.background} onPress={onClose}>
        <View style={styles.whiteBox}>
          <Pressable
            style={styles.actionButton}
            android_ripple={{color: '#eee'}}
            onPress={takeAndCropPhoto}
          >
            <Icon name="camera-alt" color="#757575" size={24} style={styles.icon} />
            <Text style={styles.actionText}>카메라로 촬영하기</Text>
          </Pressable>
          <Pressable
            style={styles.actionButton}
            android_ripple={{color: '#eee'}}
            onPress={selectPhoto}
          >
            <Icon name="photo" color="#757575" size={24} style={styles.icon} />
            <Text style={styles.actionText}>사진 선택하기</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
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
    width: 300,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2,
  },
  actionButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 26,
  },
});

export default UploadMode;
