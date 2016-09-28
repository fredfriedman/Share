import React, { Component } from 'react';
import { Image,KeyboardAvoidingView, AppRegistry, TextInput, View, StyleSheet,TouchableHighlight, Text, ScrollView } from 'react-native';

var styles = require('./styles')
var images = require('../../config/images')

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.username = { text: '' };
    this.password = { text: '' };
  }

  loginPress() {
    console.log("login")
  }

  signUp() {
    console.log("signup")
  }

  passwordReset() {
    console.log("reset passowrd")
  }

  render() {
    return (
      <View style={styles.container}>
          <Image
          source={require("../../images/whitegradient.png")}
          style={styles.backgroundImage}>
            <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}> 
              <TextInput style={styles.input}
                onChangeText={(text) => this.setState({username: text})}
                placeholder={'Username'}
                placeholderStyle={styles.label}
                autoCorrect={false}
                multiline={false}
                onSubmitEditing={(event) => {  this.refs.passwordInput.focus(); }}/>
              <TextInput secureTextEntry={true} style={styles.input}
                ref='passwordInput'
                onChangeText={(text) => this.setState({password: text})}
                placeholder={'Password'}
                placeholderStyle={styles.label}
                multiline={false}/>
              <TouchableHighlight
                style={styles.button}
                underlayColor={'transparent'}
                onPress={this.loginPress}>
                <Text style={styles.LoginLabel}> LOGIN </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.forgotPasswordButton}
                underlayColor={'transparent'}
                onPress={this.passwordReset}>
                <Text style={styles.bottomLabel}> Forgot Password? </Text>
              </TouchableHighlight>
            </KeyboardAvoidingView>
            <TouchableHighlight
                style={styles.signUpButton}
                underlayColor={'transparent'}
                onPress={ () => this.signUp() }>
                <Text style={styles.bottomLabel}> Don't have an account? Sign Up </Text>
            </TouchableHighlight>
          </Image>
        </View>
    );
  }
}

AppRegistry.registerComponent('Login', () => Login);
