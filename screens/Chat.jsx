import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, SafeAreaView, StatusBar } from 'react-native';

const Chat = () => {
  const [isGroupSelected, setIsGroupSelected] = useState(false);

  const ChatList = [
    { id: 1, name: 'John Doe', preview: 'You did great tho, but I\'d like to know what\'s your favorite', time: '@10:23 AM' },
    { id: 2, name: 'Jane Doe', preview: 'I know that\'s your favorite', time: 'Yesterday @2:42 PM' },
    { id: 3, name: 'Alice', preview: 'I had pizza for dinner', time: '12/2/24 @11:42 PM' },
  ];

  const GroupChatList = [                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    { id: 1, name: 'Project Team', preview: 'Let\'s meet at 4 PM tomorrow.', time: 'Yesterday @6:00 PM' },
    { id: 2, name: 'Family', preview: 'Dinner plans for tonight?', time: '12/1/24 @7:30 PM' },
    { id: 3, name: 'Friends', preview: 'Movie night this weekend!', time: '1/1/24 @8:00 PM' },
  ];

  const renderItem = ({ item }) => {
    const previewText = item.preview.length > 29 ? `${item.preview.slice(0, 29)}...` : item.preview;

    return (
      <TouchableOpacity className="px-4 py-2 border-b border-gray-300 mt-[36px]">
        <View className="flex-1 flex-row gap-2">
          <Image source={require('../assets/user1.jpg')} className="w-[50px] h-[50px] rounded-full" />
          <View className="flex-1 flex-col">
            <Text className="font-bold text-lg">{item.name}</Text>
            <Text numberOfLines={1} className="text-gray-600">{previewText}</Text>
          </View>
          <Text className="text-gray-500 text-xs">{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View className="flex-row justify-around bg-gray-100 p-3">
        <TouchableOpacity
          onPress={() => setIsGroupSelected(false)}
          className={`px-4 py-2 rounded-full ${!isGroupSelected ? 'bg-black' : 'bg-gray-300'}`}>
          <Text className={`text-white ${!isGroupSelected ? 'font-bold' : ''}`}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsGroupSelected(true)}
          className={`px-4 py-2 rounded-full ${isGroupSelected ? 'bg-black' : 'bg-gray-300'}`}>
          <Text className={`text-white ${isGroupSelected ? 'font-bold' : ''}`}>Group</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={isGroupSelected ? GroupChatList : ChatList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default Chat;
