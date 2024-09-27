import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SelectAuth = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-2xl mb-4">Welcome!</Text>
      <Image className="w-60 h-60 mb-6" source={require('../assets/auth.png')} />
      <View className="bg-slate-500 p-8 rounded-3xl w-full">
        <TouchableOpacity
          className="bg-black py-2 mb-4 rounded-full"
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-white text-center text-xl">Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#00beff] py-2 rounded-full"
          onPress={() => navigation.navigate('Register')}
        >
          <Text className="text-black text-center text-xl">Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectAuth;
