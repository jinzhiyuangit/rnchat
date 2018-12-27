import React from "react";
import { View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Login from '../screen/Login';
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
const instanceLocatorId = "d6b422d1-6fd4-4271-8953-4bd711965dbd";
const presenceRoomId = "19375885"; // room ID of the general room created through the chatKit inspector
const chatServer = "http://salt.intviu.cn:3000/users";

const tokenProvider = new TokenProvider({
  url: `https://us1.pusherplatform.io/services/chatkit_token_provider/v1/${instanceLocatorId}/token`
});

export default class LoginNav extends React.Component {
    state = {};
    static navigationOptions = {
      tabBarTestIDProps: {
        testID: 'TEST_ID_HOME',
        accessibilityLabel: 'TEST_ID_HOME_ACLBL',
      },
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused, horizontal }) => (
        <Ionicons
          name="ios-home"
          size={horizontal ? 20 : 26}
          style={{ color: tintColor }}
        />
      ),
    };
    componentDidMount() {
      // this._s0 = this.props.navigation.addListener('willFocus', this._onEvent);
      // this._s1 = this.props.navigation.addListener('didFocus', this._onEvent);
      // this._s2 = this.props.navigation.addListener('willBlur', this._onEvent);
      // this._s3 = this.props.navigation.addListener('didBlur', this._onEvent);
    }
    componentWillUnmount() {
      // this._s0.remove();
      // this._s1.remove();
      // this._s2.remove();
      // this._s3.remove();
    }
    _onEvent = a => {
      console.log('EVENT ON PEOPLE TAB', a.type, a);
    };
    render() {
      const { navigation } = this.props;
      //return <MyNavScreen banner="People Tab" navigation={navigation} />;
      return (
        <View style={styles.container}>
          <Login
            username={this.state.username}
            updateUsername={this.updateUsername}
            enterChat={this.enterChat} 
          />
        </View>
      );
    };
  
    updateUsername = username => {
      this.setState({
        username
      });
    };
  
    enterChat = () => {
      //console.log("start create user finish. send a request to nodeserver");
      fetch(chatServer, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username
        })
      }).then(response => {
          //console.log("create user finish. get a response from nodeserver");
          this.chatManager = new ChatManager({
            instanceLocator: `v1:us1:${instanceLocatorId}`,
            userId: this.state.username,
            tokenProvider
          });
          //console.log("create chatManager finish.");
          this.chatManager
            .connect({
              onAddedToRoom: room => {
                console.log(`Added to room ${room.name}`)
              },
              onRemovedFromRoom: room => {
                console.log(`currentuser removed from room ${room.name}`)
              },
              onRoomUpdated: room => {
                console.log(`the room was updated ${room.name}`)
              },
              onRoomDeleted: room => {
                console.log(`delete the room ${room.name}`)
              }
            })
            .then(
              currentUser => {
                this.currentUser = currentUser;
                //console.log("connect chatManager finish.");
                this.setState({
                  presenceRoomId: presenceRoomId
                });
  
                currentUser
                  .subscribeToRoom({
                    roomId: presenceRoomId,
                    hooks: {
                      onMessage: message => {
                        console.log(`get a new message ${message.text}`);
                      },
                      onUserStartedTyping: user => {
                        console.log(`user start typing ${user.name}`);
                      },
                      onUserStoppedTyping: user => {
                        console.log(`user stop typing ${user.name}`);
                      },
                      onUserJoined: user => {
                        console.log(`user joined this room ${user.name}`);
                      },
                      onUserLeft: user => {
                        console.log(`user left this room ${user.name}`);
                      },
                      onPresenceChanged: (state, user) => {
                        console.log(`user ${user.name}, changed status to ${state.current}`);
                      }
                    }
                  })
                  .then(room => {
                    let new_users = [];
                    room.users.forEach(user => {
                      if (user.id != this.currentUser.id) {
                        let is_online =
                          user.presence.state == "online" ? true : false;
  
                        new_users.push({
                        id: user.id,
                        name: user.name,
                        is_online
                        });
                      }
                    });
                    console.log(`the users is null ? ${new_users.length}`);
                    this.setState({
                      userHasLoggedIn: true,
                      users: new_users
                    });
                  })
                  .catch(err => {
                    console.log(`Error joining room ${err}`);
                  });
            })
            .catch(error => {
              console.log("error with chat manager", error);
            });
        })
        .catch(error => {
          console.log("error in request: ", error);
        });
  
      this.setState({
        currentScreen: "users"
      });
    };
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    }
  });