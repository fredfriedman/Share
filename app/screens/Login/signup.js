'use strict';
import React, { Component } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Navigator,
    Modal,
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native';
import Button from 'react-native-button'
import { Fumi } from 'react-native-textinput-effects';
import dismissKeyboard from 'dismissKeyboard'
import Dimensions from 'Dimensions';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

let Login = require('./Login').default
let styles = require('./styles')
var firebase = require('../../config/firebase')
let {butterfly} = require('../../config/images')
let CloseModalButton   = require('../../components/TopLeftAction').default

export default class signup extends Component {

    constructor(props){
        super(props);

        this.state = {
            caregiverName: "",
            caregiverEmail: '',
            caregiverPassword: '',
            caregiverRelation: '',
            caregiverPhone: '',
            caregiverPatient: '',

            nurseName: "",
            nurseEmail: '',
            nursePassword: '',
            nursePhone: '',
            nurseHospital: '',
            nursePicture: '',

            animating: false,
            isCaregiver: true,
            currentPage: 0
        };
    }

    onPressSignUp() {

        var self = this

        var email =  self.state.isCaregiver ? this.state.caregiverEmail : this.state.nurseEmail
        var pass  =  self.state.isCaregiver ? this.state.caregiverPassword : this.state.nursePassword

        this.setState({animating: true})

        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(function(user) {

                var ref = self.state.isCaregiver ? "Caregivers/" + user.uid : "Nurses/" + user.uid

                var data = self.state.isCaregiver ? {patient: self.state.caregiverPatient, Profile: {name: self.state.caregiverName, phone: self.state.caregiverPhone, relation: self.state.caregiverRelation}} :
                                                    {Profile: {name: self.state.nurseName, phone: self.state.nursePhone, relation: self.state.nursePicture}}

                firebase.database().ref().child(ref).set(data);

                self.setState({animating: false})

                dismissKeyboard()

                self.props.navigator.pop()

            }, function(error) {

                var alertTitle = "Oops something went wrong"
                var alertMessage = "Please try again."

                switch (error.code) {
                    case "auth/email-already-in-use":
                        Alert.alert("Email Already in Use",
                                    "It looks like this email is already in use.",
                                    [
                                      {text: 'OK', onPress: () => console.log('OK Pressed!')},
                                      {text: "Sign In", onPress: () => self.props.navigator.pop()},
                                    ])
                        break;
                    case "auth/invalid-email":
                        Alert.alert("Invalid Email",
                                    "It looks like this email is malformed.\n Please try again.",
                                    [{text: 'OK', onPress: () => console.log('OK Pressed!')}])
                        break;
                    case "auth/weak-password":
                        Alert.alert("Weak Password",
                                    "Please create a stronger password.",
                                    [{text: 'OK', onPress: () => console.log('OK Pressed!')}])
                }

                self.setState({animating: false})
        });
    }

    onExitScene() {
        dismissKeyboard()

        this.props.navigator.pop()
    }

    renderNurseModalForm() {
        <Modal
            animationType={"slide"}
            transparent={false}
            visible={!this.state.isCaregiver}
            onRequestClose={() => {alert("Modal has been closed.")}}>
            <View style={styles.container}>
                <Text>hello world </Text>
            </View>
        </Modal>
    }

    onScroll(event){
        var offsetX = event.nativeEvent.contentOffset.x
        var pageWidth = Dimensions.get('window').width - 10
        this.setState({
            currentPage: Math.floor((offsetX - pageWidth / 2) / pageWidth) + 1
        });
    }

    renderCaregiverForm() {

        return (

                <View style={[styles.formContainer, {paddingTop: 20, paddingBottom: 20}]}>
                    <Fumi
                       label={'Name'}
                       iconClass={FontAwesomeIcon}
                       iconName={'user'}
                       iconColor={'#00BCD4'}
                       ref="caregiverName"
                       onChangeText={(text) => this.setState({caregiverName: text})}
                       onSubmitEditing={(event) => {  this.refs.caregiverEmail.refs.input.focus(); }}
                       autoCapitalize={'none'}
                       value={this.state.caregiverName}
                       autoCorrect={false}/>
                     <Fumi
                        label={'Email'}
                        iconClass={FontAwesomeIcon}
                        iconName={'envelope'}
                        iconColor={'#00BCD4'}
                        ref="caregiverEmail"
                        onChangeText={(text) => this.setState({caregiverEmail: text})}
                        onSubmitEditing={(event) => {  this.refs.caregiverPassword.refs.input.focus(); }}
                        autoCapitalize={'none'}
                        value={this.state.caregiverEmail}
                        autoCorrect={false}/>
                    <Fumi
                        iconClass={FontAwesomeIcon}
                        iconName={'lock'}
                        iconColor={'#00BCD4'}
                        ref='caregiverPassword'
                        label={'Password'}
                        labelStyle={{color: '#00BCD4'}}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={this.state.caregiverPassword}
                        onSubmitEditing={(event) => {  this.refs.caregiverPatient.refs.input.focus(); }}
                        onChangeText={(text) => this.setState({caregiverPassword: text})}/>
                    <Fumi
                        iconClass={FontAwesomeIcon}
                        iconName={'user'}
                        iconColor={'#00BCD4'}
                        ref='caregiverPatient'
                        label={'Who are you taking care of?'}
                        labelStyle={{color: '#00BCD4'}}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={this.state.caregiverPatient}
                        onChangeText={(text) => this.setState({caregiverPatient: text})}/>
                </View>
        );
    }

    renderNurseForm() {

        return (
            <View style={[styles.formContainer, {paddingTop: 20, alignItems: 'center'}]}>
                <Fumi
                    iconClass={FontAwesomeIcon}
                    iconName={'user'}
                    iconColor={'#00BCD4'}
                    ref='nurseName'
                    label={'Name'}
                    style={{width: Dimensions.get('window').width - 20, borderTopLeftRadius: 5, borderTopRightRadius: 5}}
                    labelStyle={{color: '#00BCD4'}}
                    onChangeText={(text) => this.setState({nurseName: text})}
                    onSubmitEditing={(event) => {  this.refs.nurseHospital.refs.input.focus(); }}
                    autoCapitalize={'none'}
                    value={this.state.nurseName}
                    autoCorrect={false}/>
                <Fumi
                    iconClass={FontAwesomeIcon}
                    iconName={'h-square'}
                    iconColor={'#00BCD4'}
                    ref='nurseHospital'
                    label={'Hospital/Hospice Program'}
                    labelStyle={{color: '#00BCD4'}}
                    style={{width: Dimensions.get('window').width - 20}}
                    onChangeText={(text) => this.setState({nurseHospital: text})}
                    onSubmitEditing={(event) => {  this.refs.nurseEmail.refs.input.focus(); }}
                    autoCapitalize={'none'}
                    value={this.state.nurseHospital}
                    autoCorrect={false}/>
                <Fumi
                    iconClass={FontAwesomeIcon}
                    iconName={'envelope'}
                    iconColor={'#00BCD4'}
                    ref='nurseEmail'
                    labelStyle={{color: '#00BCD4'}}
                    style={{width: Dimensions.get('window').width - 20}}
                    label={'Email Address'}
                    onChangeText={(text) => this.setState({nurseEmail: text})}
                    onSubmitEditing={(event) => {  this.refs.nursePassword.refs.input.focus(); }}
                    autoCapitalize={'none'}
                    value={this.state.nurseEmail}
                    autoCorrect={false}/>
                <Fumi
                    iconClass={FontAwesomeIcon}
                    iconName={'lock'}
                    iconColor={'#00BCD4'}
                    ref='nursePassword'
                    style={{width: Dimensions.get('window').width - 20, borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}
                    label={'Password'}
                    labelStyle={{color: '#00BCD4'}}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={this.state.nursePassword}
                    onSubmitEditing={(event) => { }}
                    onChangeText={(text) => this.setState({nursePassword: text})}/>
            </View>
        );
    }

    renderUserOption() {
        return (
            <View style={this.state.isCaregiver ? {alignItems: 'center', height: 30, width: 400, backgroundColor: "#4DD0E1"}: {alignItems: 'center', height: 30, width: 400, backgroundColor: "#B2EBF2"}}>
                <Button
                    style={this.state.isCaregiver ? {color: "white", fontSize: 11} : {color: "#00BCD4", fontSize: 11}}
                    containerStyle={this.state.isCaregiver ? [styles.userTypeButton, {backgroundColor: "#00BCD4"}]: [styles.userTypeButton, {backgroundColor: "#E0F7FA"}]}
                    onPress={() => this.setState({isCaregiver: !this.state.isCaregiver})}>
                    {!this.state.isCaregiver ? "Are you a caregiver?" : "Are you a nurse?"}
                </Button>
            </View>
        )
    }

    renderSubmitButton() {
        return (
            <View>
                <Button
                    style={this.state.isCaregiver ? styles.SubmitLabel : [styles.SubmitLabel, {color: '#00BCD4'}]}
                    containerStyle={this.state.isCaregiver ? styles.button : [styles.button, {backgroundColor: '#B2EBF2'}]}
                    styleDisabled={{color: 'red'}}
                    onPress={this.onPressSignUp.bind(this)}>
                    Submit
                </Button>
                <ActivityIndicator
                    animating={this.state.animating}
                    style={{height: 40}}
                    size="large"/>
                <Button
                    style={this.state.isCaregiver ? [styles.userTypeLabel, {color: "#00BCD4"}] : [styles.userTypeLabel, {color: "#E0F7FA"}]}
                    containerStyle={{alignSelf: 'center', width: 130}}
                    onPress={this.onExitScene.bind(this)}>
                    Have an Account?
                </Button>
            </View>
        )
    }

    onNext() {

    }

    render() {

        const xIcon = (<Ionicons name="ios-close" size={30} color="gray" />);

        return (
            <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
                <Image style={{backgroundColor: 'transparent', height: 35, width: 35, top: 20}} source={butterfly}/>
                { this.renderCaregiverForm() }
                { this.renderSubmitButton() }
                <View style={{flex: 1}}></View>
                { this.renderUserOption() }
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={!this.state.isCaregiver}
                    onRequestClose={() => {alert("Modal has been closed.")}}>
                    <View style={styles.container}>
                        <Image style={{backgroundColor: 'transparent', height: 35, width: 35, top: 20}} source={butterfly}/>
                        { this.renderNurseForm() }
                        { this.renderSubmitButton() }
                        <View style={{flex: 1}}/>
                        { this.renderUserOption() }
                    </View>
                    <CloseModalButton action={this.onExitScene.bind(this)} icon={xIcon}/>
                </Modal>
                <CloseModalButton action={this.onExitScene.bind(this)} icon={xIcon}/>
            </View>
        )
    }
}
