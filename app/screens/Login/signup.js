'use strict';
import React, { Component } from 'react';
import { ActivityIndicator, Alert, Image, Navigator, Text, View } from 'react-native';
import Button from 'react-native-button'
import { Hoshi } from 'react-native-textinput-effects';

let styles   = require('./styles')
let Login    = require('./Login').default
var firebase = require('../../config/firebase')
let {xIcon, butterfly} = require('../../config/images')
let CloseModalButton   = require('../../components/TopLeftAction').default
let UserType = {caregiver : "caregiver", nurse: "nurse"};

export default class signup extends Component {

    constructor(props){
    super(props);

    this.state = {
        name: "temp",
        email: '',
        password: '',
        animating: false,
        type: UserType.caregiver
        };
    }

    onPressSignUp(){

        var self = this

        this.setState({animating: true})

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(function(user) {

                firebase.database().ref().child("users/" + user.uid).set({
                    email: self.state.email,
                    type: self.state.type,
                });

                self.setState({animating: false})

                self.props.navigator.pop()

            }, function(error) {

                var alertTitle = "Oops something went wrong"
                var alertMessage = "Please try again."

                switch (error.code) {
                    case "auth/email-already-in-use":
                        Alert.alert("Email Already in Use",
                                    "It looks like this email is already in use.",
                                    [
                                      {text: 'OK', onPress: () => console.log('OK Pressed!')},
                                      {text: "Sign In", onPress: () => self.props.navigator.pop()},
                                    ])
                        break;
                    case "auth/invalid-email":
                        Alert.alert("Invalid Email",
                                    "It looks like this email is malformed.\n Please try again.",
                                    [{text: 'OK', onPress: () => console.log('OK Pressed!')}])
                        break;
                    case "auth/weak-password":
                        Alert.alert("Weak Password",
                                    "Please create a stronger password.",
                                    [{text: 'OK', onPress: () => console.log('OK Pressed!')}])
                }

                self.setState({animating: false})
        });
    }

    componentDidMount() {
        //this.refs.email.focus()
    }

    onExitScene() {
        this.props.navigator.pop()
    }

    render() {

        var self = this

        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
                <Image style={{backgroundColor: 'transparent', height: 35, width: 35, top: 20}} source={butterfly}/>
                <View style={[styles.formContainer, {paddingTop: 20}]}>
                    <Hoshi
                        ref="email"
                        style={{width: 50}}
                        inputStyle={[styles.textInput, {color: '#1da1f2', fontSize: 16}]}
                        labelStyle={{color: '#1da1f2'}}
                        label={'Email Address'}
                        borderColor={'#1da1f2'}
                        backgroundColor={'transparent'}
                        onChangeText={(text) => this.setState({email: text})}
                        onSubmitEditing={(event) => {  this.refs.passwordInput.focus(); }}
                        autoCapitalize={'none'}
                        value={this.state.email}
                        autoCorrect={false}/>
                    <Hoshi
                        ref='password'
                        label={'Password'}
                        labelStyle={{color: '#1da1f2'}}
                        inputStyle={[styles.textInput, {color: '#1da1f2', fontSize: 16}]}
                        style={{width: 50, paddingTop: 20}}
                        borderColor={'#1da1f2'}
                        backgroundColor={'transparent'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({password: text})}/>
                </View>
                <Button
                    style={styles.SubmitLabel}
                    containerStyle={styles.button}
                    styleDisabled={{color: 'red'}}
                    onPress={this.onPressSignUp.bind(this)}>
                    Sign up
                </Button>
                <ActivityIndicator
                    animating={this.state.animating}
                    style={{height: 80}}
                    size="large"/>
                <Button
                    style={styles.bottomLabel}
                    containerStyle={styles.transparent_button}
                    onPress={this.onExitScene.bind(this)}>
                    Got an Account?
                </Button>
                <CloseModalButton action={this.onExitScene.bind(this)} icon={xIcon}/>
            </View>
        );
    }
}
