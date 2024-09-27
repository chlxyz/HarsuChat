import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Conversation = () => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  const addImage = () => {
    console.log('Image added');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View className="flex-1 p-4 justify-center items-center">
        <Text className="text-gray-500">Conversation Messages here...</Text>
      </View>

      <View className="flex-row items-center p-2 bg-gray-100 border-t border-gray-300">
        <TouchableOpacity className="w-10 h-10 bg-black rounded-full justify-center items-center mr-2" onPress={addImage}>
          <Icon name="add" size={24} color="white" />
        </TouchableOpacity>
        <TextInput
          className="flex-1 h-10 px-3 rounded-full bg-white border border-gray-300"
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity className="w-10 h-10 bg-black rounded-full justify-center items-center ml-2" onPress={sendMessage}>
          <Icon name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Conversation;
