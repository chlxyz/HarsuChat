import React, { useState } from 'react';
import { Image, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../api/firebaseConfig';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <TouchableOpacity 
        className="absolute top-10 left-4"
        onPress={() => navigation.navigate('SelectAuth')}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      
      <Text className="text-2xl mb-4 text-center">Login!</Text>
      <Image className="w-60 h-60 mb-6 self-center" source={require('../assets/login.png')} />
      <View className="bg-slate-500 p-8 rounded-3xl w-full">
        <TextInput
          className="h-12 border border-gray-300 mb-3 px-2 rounded-xl"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          className="h-12 border border-gray-300 mb-3 px-2 rounded-xl"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity 
          style={{
            backgroundColor: '#007bff',
            paddingVertical: 12,
            borderRadius: 24,
            alignItems: 'center',
            marginBottom: 10,
          }}
          onPress={handleLogIn}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{
            backgroundColor: '#6c757d',
            paddingVertical: 12,
            borderRadius: 24,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Go to Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;