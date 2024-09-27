import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../api/firebaseConfig';

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [nickname, setNickname] = useState('');
  const [realName, setRealName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userId = 'someUserId';

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const userDoc = await firebase.firestore().collection('users').doc(userId).get();
        const currentUser = firebase.auth().currentUser;

        if (userDoc.exists) {
          const userData = userDoc.data();
          setNickname(userData.nickname || '');
          setRealName(userData.realName || '');
          setProfilePicture(userData.profilePicture || null);
          setEmail(currentUser.email || '');
        } else {
          Alert.alert('Profile not found');
        }
      } catch (error) {
        Alert.alert('Error fetching profile', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const saveProfile = async () => {
    setIsLoading(true);
    try {
      await firebase.firestore().collection('users').doc(userId).set(
        {
          nickname,
          realName,
          profilePicture,
        },
        { merge: true }
      );

      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        if (email !== currentUser.email) {
          await currentUser.updateEmail(email);
        }
        if (password) {
          await currentUser.updatePassword(password);
        }
      }

      Alert.alert('Profile updated successfully');
    } catch (error) {
      Alert.alert('Error updating profile', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-5 items-center">
      <TouchableOpacity onPress={pickImage} className="mb-8 items-center">
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} className="w-30 h-30 rounded-full border-2 border-gray-200" />
        ) : (
          <View className="w-30 h-30 rounded-full bg-gray-200 justify-center items-center">
            <Text className="text-gray-400 text-4xl">+</Text>
          </View>
        )}
      </TouchableOpacity>

      <View className="w-full mb-5">
        <Text className="text-lg text-gray-800 mb-1">Nickname</Text>
        <TextInput
          className="bg-white border border-gray-200 rounded-lg p-3 text-base text-gray-800"
          placeholder="Enter your nickname"
          placeholderTextColor="#A9A9A9"
          value={nickname}
          onChangeText={setNickname}
        />
      </View>

      <View className="w-full mb-5">
        <Text className="text-lg text-gray-800 mb-1">Real Name</Text>
        <TextInput
          className="bg-white border border-gray-200 rounded-lg p-3 text-base text-gray-800"
          placeholder="Enter your real name"
          placeholderTextColor="#A9A9A9"
          value={realName}
          onChangeText={setRealName}
        />
      </View>

      <View className="w-full mb-5">
        <Text className="text-lg text-gray-800 mb-1">Email</Text>
        <TextInput
          className="bg-white border border-gray-200 rounded-lg p-3 text-base text-gray-800"
          placeholder="Enter your email"
          placeholderTextColor="#A9A9A9"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View className="w-full mb-5">
        <Text className="text-lg text-gray-800 mb-1">Password</Text>
        <TextInput
          className="bg-white border border-gray-200 rounded-lg p-3 text-base text-gray-800"
          placeholder="Enter your new password"
          placeholderTextColor="#A9A9A9"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        onPress={saveProfile}
        className="bg-green-500 py-3 px-16 rounded-full mt-5"
      >
        <Text className="text-white text-lg">Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
