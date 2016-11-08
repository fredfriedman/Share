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
import Header from '../../components/header'

import dismissKeyboard from 'dismissKeyboard'
import styles from './styles'
import Firebase from '../../config/firebase'
import { butterfly } from '../../config/images'

import TabBar from '../Home/TabBar'
import PasswordReset from './passwordReset'
import CaregiverHome from '../CaregiverHome/overview'




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

        var user;

        this.setState({animating: true})

        Firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
            .then(function(usr) {

                user = usr

                return Firebase.database().ref().child("Caregivers/" + user.uid).once('value').then(function(snapshot) {
                    return self.signInHandler(user, snapshot, "caregiver")
                })

            }).then(function(isCaregiver) {
                if (!isCaregiver) {
                     return Firebase.database().ref().child("Nurses/" + user.uid).once('value')
                        .then(function(snapshot) {
                            self.signInHandler(user, snapshot, "nurse")
                        }, function(error) {
                            throw {code: error.code}
                        })
                }

            }, function(error) {

                var alertTitle;
                var alertMessage;

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

    signInHandler(user, snapshot, type): Boolean {
        if (snapshot.val() !== null) {

            this.setState({animating: false})

            dismissKeyboard()

            var usr = snapshot.val()
            usr["id"] = snapshot.key
            usr["type"] = type

            AsyncStorage.setItem('user_data', JSON.stringify(usr));

            var component = type == "caregiver" ? CaregiverHome : TabBar

            this.props.navigator.resetTo({ component: component, passProps: {user: usr} })

            return true
        } else {

            return false
        }
    }

    render() {
        const MainColor = '#00BCD4'
        const closeIcon = ( <Icon name="ios-close" ios="ios-close" md="md-close" size={30} color={'#1e1e1e'} />);

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
                        style={styles.row}
                        labelStyle={styles.mainText}
                        inputStyle={styles.textInput}
                        borderColor={MainColor}
                        onChangeText={(text) => this.setState({username: text})}
                        onSubmitEditing={(event) => {  this.refs.password.refs.input.focus(); }}
                        autoCapitalize={'none'}
                        autoCorrect={false}/>
                    <Hoshi
                        ref='password'
                        label={'Password'}
                        labelStyle={styles.mainText}
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
                    <View style={styles.signInBox}>
                        <Button
                            style={[styles.mainText, {paddingLeft: 5, fontWeight: '300'}]}
                            containerStyle={[styles.signInBoxButton, {backgroundColor: 'transparent'}]}
                            onPress={this.onPressPasswordReset.bind(this)}>
                            Need Help?
                        </Button>
                        <View style={{flex: 1}}></View>
                        <Button
                            style={styles.secondaryText}
                            containerStyle={styles.signInBoxButton}
                            onPress={this.onPressLogin.bind(this)}>
                            Log In
                        </Button>
                    </View>
                </KeyboardAvoidingView>

            </View>
        );
    }
}
