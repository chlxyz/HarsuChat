import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../api/firebaseConfig';

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [nickname, setNickname] = useState('');
  const [realName, setRealName] = useState('');
  const userId = 'someUserId';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userDoc = await firebase.firestore().collection('users').doc(userId).get(); // Fetch user document
        if (userDoc.exists) {
          const userData = userDoc.data();
          setNickname(userData.nickname || '');
          setRealName(userData.realName || '');
          setProfilePicture(userData.profilePicture || null);
        } else {
          Alert.alert('Profile not found');
        }
      } catch (error) {
        Alert.alert('Error fetching profile', error.message);
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

      <TouchableOpacity className="bg-green-500 py-3 px-16 rounded-full mt-5">
        <Text className="text-white text-lg">Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
