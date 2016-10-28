import Firebase from 'firebase';
import React, { Component } from 'react';
import { ActivityIndicator, Alert, AsyncStorage, Image, KeyboardAvoidingView, Navigator, Text, View } from 'react-native';
import Button from 'react-native-button'
import { Hoshi } from 'react-native-textinput-effects';
import dismissKeyboard from 'dismissKeyboard'

let styles   = require('./styles')
var firebase = require('../../config/firebase')
let {xIcon, butterfly} = require('../../config/images')

let PasswordReset = require('./passwordReset').default
let CaregiverHome = require('../CaregiverHome/overview').default
let TabBar  = require('../Home/TabBar').default
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
        this.refs.email.refs.input.focus()
    }

    onExitScene() {
        dismissKeyboard()
        this.props.navigator.pop()
    }

    onPressPasswordReset() {
        dismissKeyboard()
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

                firebase.database().ref().child("Caregivers/" + user.uid).once('value')
                    .then(function(snapshot) {
                        if (snapshot.val() !== null) {

                            self.setState({animating: false})

                            dismissKeyboard()

                            var usr = snapshot.val()
                            usr["id"] = snapshot.key

                            self.props.navigator.resetTo({ component: CaregiverHome, passProps: {user: usr} })
                        } else {
                            firebase.database().ref().child("Nurses/" + user.uid).once('value')
                                .then(function(snapshot) {
                                    if (snapshot.val() !== null) {
                                        self.setState({animating: false})

                                        dismissKeyboard()

                                        var usr = snapshot.val()
                                        usr["id"] = snapshot.key

                                        self.props.navigator.resetTo({ component: TabBar, passProps: {user: usr} })
                                    }
                                }, function(error) {
                                    console.log(error)
                                })
                        }
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
            <View style={{flex: 1}}>
                <View style={{alignItems: 'center', backgroundColor: 'white'}}>
                    <Image style={{backgroundColor: 'transparent', height: 35, width: 35, top: 20}} source={butterfly}/>
                    <View style={[styles.formContainer, {paddingTop: 20}]}>
                        <Hoshi
                            ref="email"
                            style={{width: 50}}
                            inputStyle={[styles.textInput, {color: '#44688E', fontSize: 16}]}
                            labelStyle={{color: '#00BCD4'}}
                            label={'Email Address'}
                            borderColor={'#00BCD4'}
                            onChangeText={(text) => this.setState({username: text})}
                            onSubmitEditing={(event) => {  this.refs.password.refs.input.focus(); }}
                            autoCapitalize={'none'}
                            autoCorrect={false}/>
                        <Hoshi
                            ref='password'
                            label={'Password'}
                            labelStyle={{color: '#00BCD4'}}
                            inputStyle={[styles.textInput, {color: '#44688E', fontSize: 16}]}
                            style={{width: 50, paddingTop: 20}}
                            borderColor={'#00BCD4'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({password: text})}/>
                    </View>
                    <ActivityIndicator
                        animating={this.state.animating}
                        style={{height: 60}}
                        size="large" />
                </View>
                <View style={{flex: 1}}></View>
                <KeyboardAvoidingView style={{flex: 1, justifyContent: 'flex-end'}} behavior={'padding'}>
                    <View style={styles.signInBox}>
                        <Button
                            style={{paddingLeft: 5, fontWeight: '300', fontSize: 12, color: "#00BCD4"}}
                            containerStyle={{}}
                            onPress={this.onPressPasswordReset.bind(this)}>
                            Need Help?
                        </Button>
                        <View style={{flex: 1}}></View>
                        <Button
                            style={styles.SubmitLabel}
                            containerStyle={{marginRight: 5, width: 80, backgroundColor: "#00BCD4", borderRadius: 8, height: 20}}
                            onPress={this.onPressLogin.bind(this)}>
                            Log In
                        </Button>
                    </View>
                </KeyboardAvoidingView>
                <CloseModalButton action={this.onExitScene.bind(this)} icon={xIcon}/>
            </View>
        );
    }
}
