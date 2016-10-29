'use strict';
import React, { Component } from 'react';
import { Alert, Image, Text, StyleSheet, View } from 'react-native';
import Button from 'react-native-button'
import Dimensions from 'Dimensions';
import { Hoshi } from 'react-native-textinput-effects';
import dismissKeyboard from 'dismissKeyboard'
import Icon from 'react-native-vector-icons/Ionicons';

let Login    = require('./Login').default
var firebase = require('../../config/firebase')
let { butterfly} = require('../../config/images')
var { dimensions } = require('../../config/dimensions')
let CloseModalButton  = require('../../components/TopLeftAction').default

export default class signup extends Component {

    constructor(props){
    super(props);

    this.state = {
        loaded: true,
        email: '',
        password: ''
        };
    }

    componentDidMount() {
        this.refs.email.refs.input.focus()
    }

    onInitiateReset(){

        let self = this

        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(function(success) {
                self.onExitScene

            }, function(error) {

                var alertTitle = "Oops something went wrong"
                var alertMessage = "Please try again."

                switch(error.code){
                    case "auth/invalid-email" :
                        alertTitle = "Incorrect Email"
                        alertMessage = "It looks like you may have misspelled your email.\n Please try again."
                        break;
                    case "auth/user-not-found":
                        alertTitle = "Incorrect Password"
                        alertMessage = "The password you entered is incorrect.\n Please try again."
                        break;
                    default:
                        alertTitle = "Oops something went wrong"
                        alertMessage = "Please try again."
                }
                Alert.alert( alertTitle, alertMessage, [{text: 'OK', onPress: () => console.log('OK Pressed!')}])
            })
    }

    onExitScene() {
        dismissKeyboard()

        this.props.navigator.pop()
    }

    render() {

        const xIcon = (<Icon name="ios-close" size={dimensions.iconSize} color="gray" />);

        return (
            <View style={styles.container}>
                <Image style={{backgroundColor: 'transparent', height: 35, width: 35, top: 20}} source={butterfly}/>
                <View style={{width: Dimensions.get('window').width - 20, paddingTop: 40}}>
                    <Hoshi
                        ref="email"
                        style={{width: Dimensions.get('window').width - 20 }}
                        value={this.state.email}
                        inputStyle={styles.passwordResetTextInput}
                        labelStyle={{color: '#00BCD4'}}
                        label={'Email Address'}
                        borderColor={'#00BCD4'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({email: text})}/>
                </View>
                <Button
                    style={styles.submitLabel}
                    containerStyle={styles.submitButton}
                    onPress={this.onInitiateReset.bind(this)}>
                    Reset Password
                </Button>
                <CloseModalButton action={this.onExitScene.bind(this)} icon={xIcon}/>
            </View>
        );
    }
}

var styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    submitLabel: {
        flex: 1,
        width: 230,
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: '300',
        color: '#ffffff',
        paddingTop: 5
    },
    submitButton: {
        borderRadius: 2.5,
        borderColor: 'transparent',
        borderWidth: 0.5,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#00BCD4',
        height: 30,
        width: Dimensions.get('window').width - 20,
        marginTop: 10,
    },
    passwordResetTextInput: {
        width: Dimensions.get('window').width - 30,
        height: 35,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        fontFamily: 'Helvetica',
        fontWeight: '100',
        fontSize: 16,
        color: '#44688E'
    },
    bottomLabel: {
        width: 400,
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 11,
        fontWeight: '300',
        color: '#ffffff',
        marginBottom: 20,
    },
    transparent_button: {
        marginTop: 10,
        padding: 15
    },
}
