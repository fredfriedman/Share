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
var styles = require('./styles')
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

        const xIcon = (<Icon name="ios-close" size={30} color="gray" />);

        return (
            <View style={[styles.container,{backgroundColor: 'white'}]}>
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
                    style={[styles.submitLabel,{color: 'white', fontWeight: '400'}]}
                    containerStyle={styles.submitButton}
                    onPress={this.onInitiateReset.bind(this)}>
                    Reset Password
                </Button>
                <CloseModalButton action={this.onExitScene.bind(this)} icon={xIcon}/>
            </View>
        );
    }
}
