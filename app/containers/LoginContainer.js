import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Login from '../screens/Login';

const mapStateToProps = state => ({
  password: state.password,
  username: state.username,
})

const mapDispatchToProps = (dispatch) => ({
  enterChat: () => { dispatch({ type: 'ENTER_CHAT', }) },
  updateUsername: (username) => { dispatch({ type: 'UPDATE_USERNAME', username }) },
  updatePassword: () => { dispatch({ type: 'UPDATE_PASSWORD' }) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)