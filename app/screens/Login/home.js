import React, { Component } from 'react';
import {Image, Navigator, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button'
import Dimensions from 'Dimensions';

let styles   = require('./styles')
let SignUp   = require('./signup').default
let Login   = require('./Login').default
let {backIcon, xIcon, butterfly} = require('../../config/images')
let CloseModalButton = require('../../components/TopLeftAction').default

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
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: "#1da1f2"}}>
                <Image style={{marginLeft: 30, height: 50, width: 50, marginTop: 30}} source={butterfly}/>
                <View>
                    <Text style={{marginLeft: 50, color: 'white', fontSize: 28, fontWeight: 'bold'}}> Welcome to {"\n"} Share</Text>
                    <Text style={{marginLeft: 50, color: 'white', fontSize: 16, fontWeight: '500'}}> Simplifying Hospice Care </Text>
                </View>
                <View style={{marginBottom: 100}}>
                    <Button
                        style={{color: '#1da1f2'}}
                        containerStyle={{borderRadius: 5,
                            borderColor: 'transparent',
                            borderWidth: 0.5,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f7f7f7',
                            height: 30,
                            width: Dimensions.get('window').width - 100,
                            marginTop: 10
                        }}
                        styleDisabled={{color: 'red'}}
                        onPress={this.onPressSignUp.bind(this)}>
                        SignUp
                    </Button>
                    <Button
                        style={{color: 'white'}}
                        containerStyle={{paddingTop: 5}}
                        styleDisabled={{color: 'red'}}
                        onPress={this.onPressLogin.bind(this)}>
                        Log In
                    </Button>
                </View>
            </View>
        );
    }
}
