import React from 'react';
import { StyleSheet, View, Image, TextInput, Button } from 'react-native';

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container4}>
          <Image
            style={styles.image}
            source={require('../../images/login.jpg')}
          />
        </View>
        <View style={styles.container2}>
          <TextInput
            style={styles.text_field}
            onChangeText={this.props.updateUsername}
            value={this.props.username}
            placeholder="Enter your username"
          />
        </View>
        <View style={styles.container2}>
          <TextInput
            style={styles.text_field}
            onChangeText={this.props.updatePassword}
            value={this.props.password}
            placeholder="Enter your password"
          />
        </View>
        <View style={styles.container3}>
          <Button onPress={this.props.enterChat} title="Login in" color="#0064e1" />
          <Button onPress={this.props.enterChat} title="Login up" color="#0064e1" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  container2: {
    width: 200,
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  container3: {
    width: 200,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container4: {
    width: 200,
    height: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
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
