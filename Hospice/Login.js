import React, { Component } from 'react';
import { Image,KeyboardAvoidingView, AppRegistry, TextInput, View, StyleSheet,TouchableHighlight, Text, ScrollView } from 'react-native';

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
          source={require('./app/images/whitegradient.png')}
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

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'purple'
  },
  backgroundImage: {
    // Have to figure out how to change these to device size
    width: 375,
    height: 700,
    justifyContent: 'center',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 20,
    top: 150,
  },
  input: {
    width: 250,
    height: 50,
    padding: 5,
    borderColor: '#191919',
    borderWidth: 0.5,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 11,
    color: '#ffffff'
  },
  button: {
    padding: 10,
    marginTop: 15,
    backgroundColor: '#191919'
  },
  forgotPasswordButton: {
    paddingTop:10,
  },
  signUpButton: {
    marginBottom: 50,
  },
  LoginLabel: {
    width: 230,
    flex: 1,
    marginBottom: -5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '200',
    color: '#ffffff'
  },
  bottomLabel: {
    width: 400,
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '100',
    color: '#ffffff'
  }
});