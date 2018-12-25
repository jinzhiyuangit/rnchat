import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

const instanceLocatorId = "d6b422d1-6fd4-4271-8953-4bd711965dbd";
const chatServer = "http://salt.intviu.cn:3000/users";

const tokenProvider = new TokenProvider({
  url: `https://us1.pusherplatform.io/services/chatkit_token_provider/v1/${instanceLocatorId}/token`
});

const initstate = {
  username: "",
  password: "",
  currentScreen: "login",
  currentUser: null,
  presenceRoomId: "19375885",
  currentRoomId: "",
  userHasLoggedIn: false,
  chatWithUser: "",
  users: []
}

//state必须初始化，否则报错
const LoginReducer = (state=initstate, action) => {
  switch (action.type) {
  case 'ENTER_CHAT':
    console.log("click the enter chat button");
    this.enterChat(state);
    console.log(`the username in store is ${state.username}`);
    return {
      ...state, currentScreen: "redux",
    };
  case 'UPDATE_USERNAME':
    console.log("reducer updateusername");
    return {
      ...state, username: action.username,
    };
  default:
    return state;
  }
}

export default LoginReducer

enterChat = (state) => {
  //console.log("start create user finish. send a request to nodeserver");
  fetch(chatServer, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: state.username
    })
  }).then(response => {
      //console.log("create user finish. get a response from nodeserver");
      this.chatManager = new ChatManager({
        instanceLocator: `v1:us1:${instanceLocatorId}`,
        userId: state.username,
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
            state.currentUser = currentUser;
            currentUser
              .subscribeToRoom({
                roomId: state.presenceRoomId,
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
                //console.log("subscribeToRoom finish.");
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
                state.userHasLoggedIn = true
                state.users = new_users
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
};
