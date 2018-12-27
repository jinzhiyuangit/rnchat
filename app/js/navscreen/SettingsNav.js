
import React from "react";

import BaseNav from './BaseNav';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default SettingsNav = ({ navigation }) => (
  <BaseNav banner="Settings Tab" navigation={navigation} />
);

SettingsNav.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ tintColor, focused, horizontal }) => (
    <Ionicons
      name="ios-settings"
      size={horizontal ? 20 : 26}
      style={{ color: tintColor }}
    />
  ),
};