'use strict';
import React, { Component } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Text,
    View
    } from 'react-native';

// Assets
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles'
import { butterfly } from '../../config/images'

// Componenets
import Button from 'react-native-button'
import Header from '../../components/header'
import { Hoshi } from 'react-native-textinput-effects';
import dismissKeyboard from 'dismissKeyboard'

// Screens
import Login from './Login'

// Utilities
import Firebase from '../../config/firebase'

export default class Signup extends Component {

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

        if ( this.state.email == "" ) {
            Alert.alert( "Oops", "Please Enter An Email Address", [{text: 'OK', onPress: () => console.log('OK Pressed!')}])

        } else {

            let self = this

            Firebase.auth().sendPasswordResetEmail(this.state.email)
                .then(function(success) {
                    self.onExitScene

                }, function(error) {

                    var alertTitle;
                    var alertMessage;

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
                            alertTitle = "Oops, something went wrong"
                            alertMessage = "Please try again."
                    }
                    Alert.alert( alertTitle, alertMessage, [{text: 'OK', onPress: () => console.log('OK Pressed!')}])
                })
        }
    }

    onExitScene() {
        dismissKeyboard()

        this.props.navigator.pop()
    }

    render() {

        const closeIcon = (<Icon name="ios-close" size={30} color="#1e1e1e" />);

        return (
            <View style={[styles.container, {alignItems: 'center', backgroundColor: 'white'}]}>
                <Header
                    leftAction={this.onExitScene.bind(this)}
                    leftIcon={closeIcon}
                    centerIcon={<Image style={styles.icon} source={butterfly}/>}
                    headerStyle={styles.header}/>
                <View style={styles.formContainerHoshi}>
                    <Hoshi
                        ref="email"
                        label={'Email Address'}
                        value={this.state.email}
                        style={styles.row}
                        labelStyle={styles.mainText}
                        inputStyle={styles.passwordResetTextInput}
                        borderColor={'#00BCD4'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({email: text})}/>
                </View>
                <View style={{flex: 1}}/>
                <KeyboardAvoidingView style={{flex: 1, justifyContent: 'flex-end'}} behavior={'padding'}>
                    <View style={[styles.signInBox, {justifyContent: 'flex-end'}]}>
                        <Button
                            style={styles.secondaryText}
                            containerStyle={[styles.signInBoxButton, {width: 120}]}
                            onPress={this.onInitiateReset.bind(this)}>
                            Reset Password
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}
