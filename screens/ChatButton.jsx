import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChatButton = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <View>
        <Text className="text-3xl max-w-16 text-black">
        We provide  you  chat feature to help you
        </Text>
      </View>
      <TouchableOpacity className="w-[50px] h-[50px] bg-black justify-center items-center">
        <Ionicons name="chatbubble-ellipses-outline" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatButton;