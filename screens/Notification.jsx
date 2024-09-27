import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Notification = () => {
  const Notifs = [
    {
      id: 1,
      title: 'New Friend Request',
      time: '22/09/24',
      sender: 'Danie',
    },
    {
      id: 2,
      title: 'New Friend Request',
      time: '22/09/24',
      sender: 'Clay',
    },
    {
      id: 3,
      title: 'New Friend Request',
      time: '22/09/24',
      sender: 'Moe',
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View className="p-4 mb-4 bg-white rounded-lg shadow flex-row">
        <Image source={require ('../assets/user2.jpg')} className="h-[40px] w-[40px] rounded-full mr-2 "/>
        <View className="flex-1 flex-col">
            <View className="flex-1 flex-row justify-between">
                <Text className="font-bold text-lg">{item.sender} {item.title}</Text>
                <Text className="text-gray-500">{item.time}</Text>
            </View>
            <View className="flex-row space-x-2 mt-2 justify-end"> 
                <Icon name="checkmark-circle" size={40} color="green" />
                <Icon name="close-circle" size={40} color="red" />
            </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 pt-5 px-2">
      <FlatList
        data={Notifs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Notification;
