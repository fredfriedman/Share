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
import LoadingAnimationView from '../../components/loadingAnimationView'

import dismissKeyboard from 'dismissKeyboard'
import styles from './styles'
import Firebase from '../../config/firebase'
import { butterfly } from '../../config/images'

import TabBar from '../Home/TabBar'
import PasswordReset from './passwordReset'
import CaregiverHome from '../CaregiverHome/overview'

const { NURSE, CAREGIVER } = require('../../lib/constants').default

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            animating: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        AsyncStorage.setItem('user_data', JSON.stringify(nextProps.user));

        this.setState({animating: false})

        var component = nextProps.user.type === NURSE ? TabBar : CaregiverHome

        this.props.navigator.resetTo({ component: component })
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

        this.props.actions.login({
            username: this.state.username,
            password: this.state.password,
        })
    }

    renderLoadingView() {
        const MainColor = '#00BCD4'

        return ( !this.state.animating ?
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
            :
            <LoadingAnimationView animation={this.state.animating}/>
        )
    }

    render() {
        const closeIcon = ( <Icon name="ios-close" ios="ios-close" md="md-close" size={30} color={'#1e1e1e'} />);

        return (
            <View style={[styles.container, {justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white'}]}>
                <Header
                    leftAction={this.onExitScene.bind(this)}
                    leftIcon={closeIcon}
                    centerIcon={<Image style={styles.icon} source={butterfly}/>}
                    headerStyle={styles.header}/>
                { this.renderLoadingView() }
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
