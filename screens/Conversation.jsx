import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, SafeAreaView, StatusBar, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Conversation = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const contactName = "John Doe";

  const sendMessage = () => {
    if (message.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: Date.now().toString(), text: message }
      ]);
      setMessage('');
    }
  };

  const addImage = () => {
    console.log('Image added');
  };

  const renderMessageBubble = ({ item }) => (
    <View style={{
      alignSelf: 'flex-end',
      backgroundColor: '#007AFF',
      borderRadius: 20,
      padding: 10,
      marginVertical: 5,
      maxWidth: '80%',
    }}>
      <Text style={{ color: 'white' }}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{contactName}</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessageBubble}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
      />

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
