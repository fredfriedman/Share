'use strict';
import React, { Component } from 'react';
import { Image, KeyboardAvoidingView, AppRegistry, TextInput, View, StyleSheet,TouchableHighlight, Text, ScrollView } from 'react-native';


var styles   = require('./styles')
let Login    = require('./Login').default
var firebase = require('../../config/firebase')
var Button   = require('../../components/button').default
var { whiteGradient } = require('../../config/images')


export default class signup extends Component {

    constructor(props){
    super(props);

    this.state = {
        loaded: true,
        email: '',
        password: ''
        };
    }

    signUp(){

        this.setState({
            loaded: false
        });

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode,errorMessage)
        });

        this.setState({
            email: '',
            password: '',
            loaded: true
            });

        this.props.navigator.pop()
    }

    goToLogin() {
        this.props.navigator.pop()
    }

    render() {
        return (
            <View style={styles.container}>
            <Image source={ whiteGradient } style={styles.backgroundImage}>
                <View style={styles.body}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email}
                        placeholder={"Email Address"}/>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({password: text})}
                        value={this.state.password}
                         secureTextEntry={true}
                        placeholder={"Password"}/>
                    <Button
                        text="Signup"
                        onpress={this.signUp.bind(this)}
                        button_styles={styles.button}
                        button_text_styles={styles.LoginLabel} />
                    <Button
                        text="Got an Account?"
                        onpress={this.goToLogin.bind(this)}
                        button_styles={styles.transparent_button}
                        button_text_styles={styles.transparent_button_text} />
                </View>
            </Image>
            </View>
        );
    }
}

AppRegistry.registerComponent('signup', () => signup);
