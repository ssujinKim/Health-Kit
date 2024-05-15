import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Dimensions} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

export default function Advice({navigation, route}) {
  useEffect(() => {
    navigation.setOptions({
      title: '상담하기',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: 'black',
    });
  }, []);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: '무엇이든 물어보세요 :D',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://picsum.photos/id/237/200/300',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    // console.log('previousMessages: ',previousMessages)
    console.log('messages: ', messages);
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GiftedChat
        placeholder={'자유롭게 질문해보세요!'}
        alwaysShowSend={true}
        messages={messages}
        textInputProps={{keyboardAppearance: 'dark', autoCorrect: false}}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        textInputStyle={{
          marginTop: 6,
          marginBottom: 6,
          paddingLeft: 12, // 내부 왼쪽 패딩
          fontSize: 16, // 폰트 사이즈
          lineHeight: 16 * 1.5, // 줄 간격
        }}
      />
    </View>
  );
}
