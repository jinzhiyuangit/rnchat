import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';

export default class Login extends React.Component {
  render() {
    return (
      <View>
        <Image
          style={styles.image}
          source={require('../images/login.jpg')}
        />
        <TextInput
          style={styles.text_field}
          onChangeText={this.props.updateUsername}
          value={this.props.username}
          placeholder="Enter your username"
        />
        <TextInput
          style={styles.text_field}
          onChangeText={this.props.updatePassword}
          value={this.props.password}
          placeholder="Enter your password"
        />
        <Button onPress={this.props.enterChat} title="Enter" color="#0064e1" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  text_field: {
    width: 200,
    height: 40,
    borderColor: '#bfbfbf',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center'
  }
});
