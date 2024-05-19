import React, {useState} from 'react';
import {Button, Image, View, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function CameraScreen({navigation}) {
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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = result.assets[0].uri;
      //console.log(uri);
      setImage(uri);
      uploadImage(uri);
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
      const response = await axios.post('http://10.50.213.228:3000/imageUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('성공');
      console.log(response.data);
      // 업로드 성공 후 LoadingPage로 이동
      navigation.navigate('LoadingPage');
    } catch (error) {
      console.log('실패');
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Take a photo" onPress={takeAndCropPhoto} />
      {image && <Image source={{uri: image}} style={{width: 200, height: 200}} />}
    </View>
  );
}
