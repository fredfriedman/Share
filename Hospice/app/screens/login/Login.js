import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    this.username = { text: 'Username' };
    this.password = { text: 'Password' };
  }

  def setUsername(user) {
    this.username = user
  }

  def setPassword(pass) {
    this.password = pass
  }

  render() {
    return (
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.username.text}
      />
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.password.text}
      />
    );
  }
}