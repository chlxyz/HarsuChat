import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, FlatList, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from './Carousel';
import ChatButton from './ChatButton';

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View className="flex-1 justify-center items-center">
        <Carousel />
        <ChatButton />
      </View>
    </SafeAreaView>
  );
};

export default Home;
