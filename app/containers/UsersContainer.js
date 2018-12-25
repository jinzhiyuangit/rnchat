import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Users from '../screens/Users';

const mapStateToProps = state => ({
  userHasLoggedIn: state.userHasLoggedIn,
  users: state.users,
})

const mapDispatchToProps = (dispatch) => ({
  leavePresenceRoom: () => { dispatch({ type: 'LEAVE_P_ROOM', }) },
  beginChat: (user) => { dispatch({ type: 'BEGIN_CHAT', user }) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)