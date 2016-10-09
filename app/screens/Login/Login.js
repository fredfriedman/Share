import Firebase from 'firebase';
import React, { Component } from 'react';
import { ActivityIndicator, Alert, AsyncStorage, Image, Navigator, Text, View } from 'react-native';
import Button from 'react-native-button'
import { Hoshi } from 'react-native-textinput-effects';

let styles   = require('./styles')
var firebase = require('../../config/firebase')
let {xIcon, butterfly} = require('../../config/images')

let PasswordReset = require('./passwordReset').default
let CaregiverHome = require('../CaregiverHome/overview').default
let TabBar  = require('../../components/TabBar').default
let CloseModalButton   = require('../../components/TopLeftAction').default



export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            animating: false,
        }
    }

    componentDidMount() {
        //this.refs.email.focus()
    }

    onExitScene() {
        this.props.navigator.pop()
    }

    onPressPasswordReset() {
        this.props.navigator.push({
            title: 'Password Reset',
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            component: PasswordReset,
            passProps: {}
        })
    }

    onPressLogin() {

        var self = this;

        this.setState({animating: true})

        firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
            .then(function(user) {

                AsyncStorage.setItem('user_data', JSON.stringify(user));

                firebase.database().ref().child("users/" + user.uid).once('value')
                    .then(function(snapshot) {

                        let component = snapshot.val().type === "caregiver" ? CaregiverHome : TabBar

                        self.setState({animating: false})

                        self.props.navigator.push({ component: component, reset: true })

                    }, function(error) {
                        console.log(error)
                    })

            }, function(error) {

                var alertTitle = "Oops something went wrong"
                var alertMessage = "Please try again."

                switch (error.code) {
                    case "auth/invalid-email":
                        alertTitle = "Incorrect Email"
                        alertMessage = "It looks like you may have misspelled your email.\n Please try again."
                        break;
                    case "auth/wrong-password":
                        alertTitle = "Incorrect Password"
                        alertMessage = "The password you entered is incorrect.\n Please try again."
                        break;
                    default:
                        alertTitle = "Oops something went wrong"
                        alertMessage = "Please try again."
                }

                Alert.alert(alertTitle, alertMessage, [ {text: 'OK', onPress: () => console.log('OK Pressed!')}, ])

                self.setState({animating: false})
            })
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white',}}>
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
                        onChangeText={(text) => this.setState({username: text})}
                        onSubmitEditing={(event) => {  this.refs.passwordInput.focus(); }}
                        autoCapitalize={'none'}
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
                        onChangeText={(text) => this.setState({password: text})}/>
                </View>
                <Button
                    style={styles.SubmitLabel}
                    containerStyle={styles.button}
                    onPress={this.onPressLogin.bind(this)}>
                    Log In
                </Button>
                <Button
                    style={[styles.bottomLabel, {color: "#1da1f2", paddingTop: 20}]}
                    containerStyle={{}}
                    onPress={this.onPressPasswordReset.bind(this)}>
                    Need Help?
                </Button>
                <ActivityIndicator
                    animating={this.state.animating}
                    style={{height: 60}}
                    size="large" />
                <CloseModalButton action={this.onExitScene.bind(this)} icon={xIcon}/>
            </View>
        );
    }
}
