
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, FontAwesome ,AntDesign,EvilIcons} from '@expo/vector-icons';
import Home from '../screens/Home';
import Reward from '../screens/Reward';
import License from '../screens/License';
import Profile from '../screens/Profile';
import Reminder from './Reminder';

const Tab = createMaterialBottomTabNavigator();

export default function TabContainer() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#040d50"
      // labelStyle={{ fontSize: 17 }}
      barStyle={{ backgroundColor: '#f49f1c' }}

    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Reward"
        component={Reward}
        options={{
          tabBarLabel: 'Reward',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="license" size={26} color={color} />

          ),
        }}
      />
      <Tab.Screen
        name="License"
        component={License}
        options={{
          tabBarLabel: 'License',
          tabBarIcon: ({ color }) => (
            <AntDesign name="filetext1" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Reminders"
        component={Reminder}
        options={{
          tabBarLabel: 'Reminder',
          tabBarIcon: ({ color }) => (
            // <EvilIcons name="clock" size={20} color={color} />
            <MaterialCommunityIcons name="clock-outline" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


