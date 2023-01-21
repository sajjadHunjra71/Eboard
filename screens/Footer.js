import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';
import Reward from './Reward';
import License from './License';
import Reminder from './Reminder';
import Profile from './Profile';

const Footer = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="ios-home" size={32} color="#ccc" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate('Reward')}
      >
        <Ionicons name="ios-search" size={32} color="#ccc" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate('License')}
      >
        <Ionicons name="ios-notifications" size={32} color="#ccc" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate('Reminder')}
      >
        <Ionicons name="ios-settings" size={32} color="#ccc" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate('Profile')}
      >
        <Ionicons name="ios-person" size={32} color="#ccc" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width:'100%',
    height:70,
},
footerItem: {
  flex: 1,
  alignItems: 'center',
  paddingVertical: 8,
},
});

export default Footer;
