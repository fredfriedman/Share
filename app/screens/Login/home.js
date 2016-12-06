import React, { Component } from 'react';
import { Image, Navigator, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button'
import Dimensions from 'Dimensions';

import styles from './styles'
import SignUp from '../../containers/RegistrationContainer'
import Login from '../../containers/LoginContainer'
import { butterfly } from '../../config/images'
import CloseModalButton from '../../components/TopLeftAction'

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    onPressLogin() {
        this.props.navigator.push({
            title: 'Login',
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            component: Login,
            passProps: {}
        })
    }

    onPressSignUp() {
        this.props.navigator.push({
            title: 'Sign Up',
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            component: SignUp,
            passProps: {}
        })
    }

    render() {
        return (
            <View style={[styles.container, {justifyContent: 'space-between'}]}>
                <Image style={styles.topLeftLogo} source={butterfly}/>
                <View>
                    <Text style={styles.textHomeScreen}> Welcome to {"\n"} Share</Text>
                    <Text style={[styles.textHomeScreen, {fontSize: 18, fontWeight: '500'}]}> Simplifying Hospice Care </Text>
                </View>
                <View style={{marginBottom: 100}}>
                    <Button
                        style={[styles.mainText, {fontWeight: 'bold', fontSize: 18}]}
                        containerStyle={[styles.button, styles.secondaryColor]}
                        onPress={this.onPressSignUp.bind(this)}>
                        Sign Up
                    </Button>
                    <Button
                        style={[styles.secondaryText, {fontWeight: 'bold', fontSize: 18}]}
                        containerStyle={[styles.button, {paddingTop: 15}]}
                        onPress={this.onPressLogin.bind(this)}>
                        Log In
                    </Button>
                </View>
            </View>
        );
    }
}
