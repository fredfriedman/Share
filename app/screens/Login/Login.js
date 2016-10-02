import Firebase from 'firebase';
import React, { Component } from 'react';
import { AsyncStorage, Image, KeyboardAvoidingView, AppRegistry, TextInput, View, StyleSheet, TouchableHighlight, Text, ScrollView } from 'react-native';

var styles   = require('./styles')
var firebase = require('../../config/firebase')
let SignUp   = require('./signup').default
let TabBar   = require('../../components/TabBar').default
var Button   = require('../../components/button').default
var { whiteGradient } = require('../../config/images')


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

        var self = this;
        self.props.navigator.push({
          component: TabBar
      })
        firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
            .then(function(token) {
                AsyncStorage.setItem('user_data', JSON.stringify(token));
                    self.props.navigator.push({
                      component: TabBar
                });
            }, function(error) {
                // Something went wrong.
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode,errorMessage)
            })
    }

    signUp() {
        this.props.navigator.push({
            component: SignUp
        });
    }

    passwordReset() {
        /*
            1. Change view to show email textInput
            2. Send Email
        */
        let email = ""

        firebase.auth().sendPasswordResetEmail(email)
            .then(function(success) {
                // Change view to comfirm password reset

            }, function(error) {
                switch(error.code){
                    case "auth/invalid-email" : break
                    case "auth/user-not-found": break
                }
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={ whiteGradient }
                    style={styles.backgroundImage}>
                    <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({username: text})}
                            placeholder={'Email'}
                            autoCorrect={false}
                            multiline={false}
                            onSubmitEditing={(event) => {  this.refs.passwordInput.focus(); }}/>
                        <TextInput
                            secureTextEntry={true}
                            style={styles.textInput}
                            ref='passwordInput'
                            onChangeText={(text) => this.setState({password: text})}
                            placeholder={'Password'}
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
