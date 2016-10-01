import Firebase from 'firebase';
import React, { Component } from 'react';
import { Image,KeyboardAvoidingView, AppRegistry, TextInput, View, StyleSheet,TouchableHighlight, Text, ScrollView } from 'react-native';

var styles = require('./styles')
var { whiteGradient } = require('../../config/images')

let SignUp = require('./signup').default
var Button = require('../../components/button').default

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

var config = {
    apiKey: "AIzaSyAGduZMnMEfsoknetJyYk7kJayWSgOAVbE",
    authDomain: "https://reactcs408.firebaseio.com/",
    databaseUrl: "https://reactcs408.firebaseio.com/",
 };

firebase.initializeApp(config);


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loaded: false
        }
    }

    loginPress() {
        firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          console.log(errorCode,errorMessage)
        });
    }

    signUp() {
        this.props.navigator.push({
            component: SignUp
        });
    }

    passwordReset() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={ whiteGradient }
                    style={styles.backgroundImage}>
                    <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}>
                        <TextInput style={styles.textInput}
                            onChangeText={(text) => this.setState({username: text})}
                            placeholder={'Username'}
                            placeholderStyle={styles.label}
                            autoCorrect={false}
                            multiline={false}
                            onSubmitEditing={(event) => {  this.refs.passwordInput.focus(); }}/>
                        <TextInput secureTextEntry={true} style={styles.textInput}
                            ref='passwordInput'
                            onChangeText={(text) => this.setState({password: text})}
                            placeholder={'Password'}
                            placeholderStyle={styles.label}
                            multiline={false}/>
                        <Button
                            text="LOGIN"
                            onpress={this.loginPress.bind(this)}
                            button_styles={styles.button}
                            button_text_styles={styles.LoginLabel} />
                        <Button
                            text="Forgot Password?"
                            underlayColor={"transparent"}
                            onpress={this.passwordReset.bind(this)}
                            button_styles={styles.forgotPasswordButton}
                            button_text_styles={styles.bottomLabel} />
                    </KeyboardAvoidingView>
                    <Button
                    text="Don't have an account? Sign Up"
                    underlayColor={"transparent"}
                    onpress={this.signUp.bind(this)}
                    button_styles={styles.signUpButton}
                    button_text_styles={styles.bottomLabel} />
                </Image>
            </View>
        );
        }
    }

AppRegistry.registerComponent('Login', () => Login);
