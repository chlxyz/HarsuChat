import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';
import Conversation from '../screens/Conversation';
import Notification from '../screens/Notification'; // Import your notification screen
import Home from '../screens/Home';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for the Chat screens
const ChatStackNavigator = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Conversation') {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { height: 60, paddingTop: 10, paddingBottom: 10 } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatList"
        component={Chat}
        options={{ headerShown: false }} // Hide the header for the chat list screen
      />
      <Stack.Screen
        name="Conversation"
        component={Conversation}
        options={({ route }) => ({
          title: route.params.chatName,
          headerShown: true, // Show header with chat name
          presentation: 'card', // Present screen with a card-style transition
        })}
      />
    </Stack.Navigator>
  );
};

const BottomNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const translateY = useSharedValue(150); // Start with the menu hidden below the screen

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    translateY.value = withTiming(isMenuOpen ? 150 : 0, { duration: 300 }); // Show when clicked, hide when clicked again
  };

  const menuStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            }
            else if (route.name === 'Chat') {
              iconName = focused ? 'chatbubble' : 'chatbubble-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Notification') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarLabel: () => null,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: 60,
            paddingTop: 10,
            paddingBottom: 10,
            justifyContent: 'center',
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Tab.Screen name="Chat" component={ChatStackNavigator} options={{ headerShown: false }}/>
        <Tab.Screen
          name="NewChatButton"
          component={() => null}
          options={{
            tabBarButton: () => (
              <TouchableOpacity style={styles.centerButton} onPress={toggleMenu}>
                <Icon name={isMenuOpen ? 'close' : 'add'} size={24} color="white" />
                <Text style={styles.centerButtonText}>New Chat</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen name="Notification" component={Notification} options={{ headerShown: false }}/>
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  centerButton: {
    width: 210,
    height: 40,
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  centerButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  menuContainer: {
    position: 'absolute',
    bottom: 80,
    left: '50%',
    transform: [{ translateX: -75 }],
    width: 150,
    alignItems: 'center',
  },
  menuItem: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 2,
  },
  menuItemText: {
    color: 'black',
  },
});

export default BottomNavBar;
