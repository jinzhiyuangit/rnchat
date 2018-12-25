
//state必须初始化，否则报错
const UsersReducer = (state={}, action) => {
  switch (action.type) {
  case 'LEAVE_P_ROOM':
    console.log("click the leave the presence room button");
    this.leavePresenceRoom(state);
    console.log(`the username in store is ${state.username}`);
    return {
      state,
    };
  case 'BEGIN_CHAT':
    console.log("user begin chat with someone");
    this.beginChat(action.user);
    return {
      state,
    };
  default:
    console.log("no case switch. get the default");
    return state;
  }
}

export default UsersReducer

leavePresenceRoom = () => {
  state.currentUser
    .leaveRoom({ roomId: state.presenceRoomId })
    .then(room => {
      state.currentUser.roomSubscriptions[state.presenceRoomId].cancel();
      state.currentUser = null;
      state.presenceRoomId=null;
      state.users=[];
      state.userHasLoggedIn=false,
      state.currentScreen="login"
    })
    .catch(err => {
      console.log(
        `error leaving presence room ${state.presenceRoomId}: ${err}`
      );
    });
};


beginChat = user => {
  let roomName = [user.id, this.currentUser.id];
  roomName = roomName.sort().join("_") + "_room";

  this.currentUser
    .getJoinableRooms()
    .then(rooms => {
      var chat_room = rooms.find(room => {
        return room.name == roomName;
      });

      if (!chat_room) {
        this.currentUser
          .createRoom({
            name: roomName,
            private: false // so they could find it in joinable rooms
          })
          .then(room => {
            this.substheRoom(room.id, user.id);
          })
          .catch(err => {
            console.log(`error creating room ${err}`);
          });
      } else {
        this.substheRoom(chat_room.id, user.id);
      }
    })
    .catch(err => {
      console.log(`error getting joinable rooms: ${err}`);
    });
};

substheRoom = (roomId, chatWith) => {
  this.roomId = roomId;
  this.chatWithUser = chatWith;

  this.currentUser
    .subscribeToRoom({
      roomId: roomId,
      hooks: {
        //onNewMessage: this.onReceiveMessage,
        onMessage: this.onReceiveMessage,
        onUserStartedTyping: this.onUserTypes,
        onUserStoppedTyping: this.onUserNotTypes
      },
      messageLimit: 5
    })
    .then(room => {
      this.setState({
        inChatRoom: true
      });
      console.log(`successfully subscribed to room`);
    })
    .catch(err => {
      console.log(`error subscribing to room: ${err}`);
    });

    state.currentScreen="chat";
    state.currentRoomId=roomId;
    state.chatWithUser=chatWith;
  };