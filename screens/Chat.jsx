import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const Chat = () => {
  const navigation = useNavigation();
  const [isGroupSelected, setIsGroupSelected] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const translateY = useSharedValue(100);

  const toggleDropdown = () => {
    setIsDropdownVisible(prev => !prev);
    translateY.value = withTiming(isDropdownVisible ? 100 : 0, { duration: 300 });
  };

  const dropdownStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const ChatList = [
    { id: 1, name: 'John Doe', preview: 'You did great tho, but I\'d like to know what\'s your favorite', time: '@10:23 AM' },
    { id: 2, name: 'Jane Doe', preview: 'I know that\'s your favorite', time: 'Yesterday @2:42 PM' },
    { id: 3, name: 'Alice', preview: 'I had pizza for dinner', time: '12/2/24 @11:42 PM' },
    { id: 4, name: 'Bob', preview: 'Hey, how\'s it going?', time: '12/3/24 @9:15 AM' },
    { id: 5, name: 'Sarah', preview: 'Did you finish the project?', time: '12/3/24 @2:30 PM' },
    { id: 6, name: 'Michael', preview: 'Let\'s grab lunch tomorrow.', time: '12/4/24 @12:00 PM' },
    { id: 7, name: 'Emily', preview: 'I need your help with something.', time: '12/4/24 @3:45 PM' },
    { id: 8, name: 'David', preview: 'Are you free this weekend?', time: '12/5/24 @10:00 AM' },
    { id: 9, name: 'Olivia', preview: 'What\'s your favorite movie?', time: '12/5/24 @5:20 PM' },
    { id: 10, name: 'Daniel', preview: 'Let\'s go hiking next week!', time: '12/6/24 @9:30 AM' },
    { id: 11, name: 'Sophia', preview: 'I have a surprise for you.', time: '12/6/24 @2:15 PM' },
    { id: 12, name: 'Ethan', preview: 'Can you help me with this bug?', time: '12/7/24 @11:45 AM' },
    { id: 13, name: 'Ava', preview: 'I\'m excited for the party!', time: '12/7/24 @4:00 PM' },
  ];

  const GroupChatList = [
    { id: 1, name: 'Project Team', preview: 'Let\'s meet at 4 PM tomorrow.', time: 'Yesterday @6:00 PM' },
    { id: 2, name: 'Family', preview: 'Dinner plans for tonight?', time: '12/1/24 @7:30 PM' },
    { id: 3, name: 'Friends', preview: 'Movie night this weekend!', time: '1/1/24 @8:00 PM' },
  ];

  const renderItem = ({ item }) => {
    const previewText = item.preview.length > 29 ? `${item.preview.slice(0, 29)}...` : item.preview;

    return (
      <TouchableOpacity 
        className="px-4 py-2 border-b border-gray-300 mt-[36px]"
        onPress={() => navigation.navigate('Conversation', { chatId: item.id })}
      >
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
          onPress={() => {
            setIsGroupSelected(false);
            setIsDropdownVisible(false);
          }}
          className={`px-4 py-2 rounded-full ${!isGroupSelected ? 'bg-black' : 'bg-gray-300'}`}
        >
          <Text className={`text-white ${!isGroupSelected ? 'font-bold' : ''}`}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsGroupSelected(true);
            setIsDropdownVisible(false);
          }}
          className={`px-4 py-2 rounded-full ${isGroupSelected ? 'bg-black' : 'bg-gray-300'}`}
        >
          <Text className={`text-white ${isGroupSelected ? 'font-bold' : ''}`}>Group</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={isGroupSelected ? GroupChatList : ChatList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      {isGroupSelected && isDropdownVisible && (
        <Animated.View style={[{
          position: 'absolute',
          bottom: 80,
          right: 20,
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 10,
          elevation: 5,
        }, dropdownStyle]}>
          <TouchableOpacity onPress={() => console.log('Join Group pressed')} className="p-2">
            <Text className="text-black">Join Group</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      <TouchableOpacity
        onPress={() => {
          if (isGroupSelected) {
            toggleDropdown();
          } else {
            console.log('Add Chat pressed');
          }
        }}
        className="absolute bottom-5 right-5 bg-blue-500 p-4 rounded-full shadow-lg flex-row items-center"
      >
        <Icon name="add-outline" size={24} color="white" />
        <Text className="ml-2 text-white">
          {isGroupSelected ? 'Create Group' : 'Add Chat'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Chat;
