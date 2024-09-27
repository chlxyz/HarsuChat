import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ChatButton = () => {
  const navigation = useNavigation();

  const navigateToChat = () => {
    navigation.navigate('Chat');
  };

  return (
    <View className="flex-1 justify-center items-center bg-red-950 p-6 rounded-t-3xl">
      <View className="mb-10">
        <Text className="text-2xl text-center text-white font-semibold leading-relaxed">
          Chat is available for those working in Japan, providing a platform for participants of LPK (Lembaga Penyaluran Kerja) to communicate and collaborate.
        </Text>
      </View>
      <TouchableOpacity 
        className="w-[80px] h-[80px] bg-black justify-center items-center rounded-full shadow-lg shadow-gray-500"
        style={{ elevation: 10 }}
        onPress={navigateToChat}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatButton;
