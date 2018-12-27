import React from "react";

import {
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';

import LoginNav from './navscreen/LoginNav';
import PeopleNav from './navscreen/PeopleNav';
import ChatNav from './navscreen/ChatNav';
import SettingsNav from './navscreen/SettingsNav';

const SimpleTabs = createBottomTabNavigator(
  {
    Home: {
      screen: LoginNav,
      path: 'home',
    },
    People: {
      screen: PeopleNav,
      path: 'people',
    },
    Chat: {
      screen: ChatNav,
      path: 'chat',
    },
    Settings: {
      screen: SettingsNav,
      path: 'settings',
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#e91e63',
    },
  }
);

const AppContainer = createAppContainer(SimpleTabs);

export default class App extends React.Component {
  static router = AppContainer.router;
  componentDidMount() {
    // this._s0 = this.props.navigation.addListener('willFocus', this._onAction);
    // this._s1 = this.props.navigation.addListener('didFocus', this._onAction);
    // this._s2 = this.props.navigation.addListener('willBlur', this._onAction);
    // this._s3 = this.props.navigation.addListener('didBlur', this._onAction);
  }
  componentWillUnmount() {
    // this._s0.remove();
    // this._s1.remove();
    // this._s2.remove();
    // this._s3.remove();
  }
  _onAction = a => {
    console.log('TABS EVENT', a.type, a);
  };
  render() {
    return <AppContainer navigation={this.props.navigation} />;
  }
}
