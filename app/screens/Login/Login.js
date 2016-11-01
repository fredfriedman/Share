import React, { Component } from 'react';
import {
    ActivityIndicator,
    Alert,
    AsyncStorage,
    Image,
    KeyboardAvoidingView,
    Navigator,
    Text,
    View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import Button from 'react-native-button'
import { Hoshi } from 'react-native-textinput-effects'
import CloseModalButton from '../../components/TopLeftAction'

import dismissKeyboard from 'dismissKeyboard'
import styles from './styles'
import Firebase from '../../config/firebase'
import { butterfly } from '../../config/images'

import PasswordReset from './passwordReset'
import CaregiverHome from '../CaregiverHome/overview'
import TabBar from '../Home/TabBar'



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

        Firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
            .then(function(user) {

                AsyncStorage.setItem('user_data', JSON.stringify(user));

                Firebase.database().ref().child("Caregivers/" + user.uid).once('value')
                    .then(function(snapshot) {
                        if (snapshot.val() !== null) {

                            self.setState({animating: false})

                            dismissKeyboard()

                            var usr = snapshot.val()
                            usr["id"] = snapshot.key

                            self.props.navigator.resetTo({ component: CaregiverHome, passProps: {user: usr} })
                        } else {
                            Firebase.database().ref().child("Nurses/" + user.uid).once('value')
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
        const MainColor = '#00BCD4'
        const closeIcon = (<Icon name="ios-close" size={30} color="#1e1e1e" />);

        return (
            <View style={[styles.container, {alignItems: 'center', backgroundColor: 'white'}]}>
                <Image style={styles.centeredIcon} source={butterfly}/>
                <View style={styles.formContainerHoshi}>
                    <Hoshi
                        ref="email"
                        label={'Email Address'}
                        style={styles.row}
                        labelStyle={styles.mainTextColor}
                        inputStyle={styles.textInput}
                        borderColor={MainColor}
                        onChangeText={(text) => this.setState({username: text})}
                        onSubmitEditing={(event) => {  this.refs.password.refs.input.focus(); }}
                        autoCapitalize={'none'}
                        autoCorrect={false}/>
                    <Hoshi
                        ref='password'
                        label={'Password'}
                        labelStyle={styles.mainTextColor}
                        style={[styles.row, {paddingTop: 20}]}
                        inputStyle={styles.textInput}
                        borderColor={MainColor}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({password: text})}/>
                </View>
                <ActivityIndicator
                    animating={this.state.animating}
                    style={{height: 60}}
                    size="large" />
                <View style={{flex: 1}}/>
                <KeyboardAvoidingView style={{flex: 1, justifyContent: 'flex-end'}} behavior={'padding'}>
                    <View style={[styles.signInBox, {alignItems: 'center'}]}>
                        <Button
                            style={{paddingLeft: 5, fontWeight: '300', fontSize: 13, color: "#00BCD4"}}
                            containerStyle={[styles.signInBoxButton, {backgroundColor: 'transparent'}]}
                            onPress={this.onPressPasswordReset.bind(this)}>
                            Need Help?
                        </Button>
                        <View style={{flex: 1}}></View>
                        <Button
                            style={styles.submitLabel}
                            containerStyle={styles.signInBoxButton}
                            onPress={this.onPressLogin.bind(this)}>
                            Log In
                        </Button>
                    </View>
                </KeyboardAvoidingView>
                <CloseModalButton action={this.onExitScene.bind(this)} icon={closeIcon}/>
            </View>
        );
    }
}
