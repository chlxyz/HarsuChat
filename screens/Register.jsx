import React, { useState } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { firebase } from '../api/firebaseConfig';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;
      if (user) {
        await user.updateProfile({
          displayName: name,
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">     
      <Text style={{ fontSize: 24, marginBottom: 16, textAlign: 'center' }}>Register!</Text>
      <Image style={{ width: 240, height: 240, marginBottom: 24 }} source={require('../assets/register.png')} />
      
      <View style={{ backgroundColor: '#6B7280', padding: 32, borderRadius: 30, width: '100%' }}>
        <TextInput
          style={{ height: 48, borderColor: '#D1D5DB', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8, borderRadius: 15 }}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={{ height: 48, borderColor: '#D1D5DB', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8, borderRadius: 15 }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={{ height: 48, borderColor: '#D1D5DB', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8, borderRadius: 15 }}
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
          onPress={handleSignUp}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{
            backgroundColor: '#6c757d',
            paddingVertical: 12,
            borderRadius: 24,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
