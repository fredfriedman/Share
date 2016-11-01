'use strict';
import React, { Component } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Navigator,
    Modal,
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native';

import Button from 'react-native-button'
import Dimensions from 'Dimensions';
import { Fumi } from 'react-native-textinput-effects';
import { butterfly } from '../../config/images'
import dismissKeyboard from 'dismissKeyboard'
import CloseModalButton from '../../components/TopLeftAction'

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import Login from './Login'
import styles from './styles'
import Firebase from '../../config/firebase'


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

        Firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(function(user) {

                var ref = self.state.isCaregiver ? "Caregivers/" + user.uid : "Nurses/" + user.uid

                var data = self.state.isCaregiver ? {patient: self.state.caregiverPatient, Profile: {name: self.state.caregiverName, phone: self.state.caregiverPhone, relation: self.state.caregiverRelation}} :
                                                    {Profile: {name: self.state.nurseName, phone: self.state.nursePhone, relation: self.state.nursePicture}}

                Firebase.database().ref().child(ref).set(data);

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

    onScroll(event){
        var offsetX = event.nativeEvent.contentOffset.x
        var pageWidth = Dimensions.get('window').width - 10
        this.setState({
            currentPage: Math.floor((offsetX - pageWidth / 2) / pageWidth) + 1
        });
    }

    renderCaregiverForm() {
        const IconColor = '#00BCD4'
        return (
                <View style={styles.formContainer}>
                    <Fumi
                        ref="caregiverName"
                        label={'Name'}
                        iconClass={FontAwesomeIcon}
                        iconName={'user'}
                        iconColor={IconColor}
                        style={styles.row}
                        labelStyle={styles.mainText}
                        value={this.state.caregiverName}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({caregiverName: text})}
                        onSubmitEditing={(event) => {  this.refs.caregiverEmail.refs.input.focus(); }}/>
                    <Fumi
                        ref="caregiverEmail"
                        label={'Email'}
                        iconClass={FontAwesomeIcon}
                        iconName={'envelope'}
                        iconColor={IconColor}
                        style={styles.row}
                        labelStyle={styles.mainText}
                        value={this.state.caregiverEmail}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({caregiverEmail: text})}
                        onSubmitEditing={(event) => {  this.refs.caregiverPassword.refs.input.focus(); }}/>
                    <Fumi
                        ref='caregiverPassword'
                        label={'Password'}
                        iconClass={FontAwesomeIcon}
                        iconName={'lock'}
                        iconColor={IconColor}
                        style={styles.row}
                        labelStyle={styles.mainText}
                        value={this.state.caregiverPassword}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        secureTextEntry={true}
                        onSubmitEditing={(event) => {  this.refs.caregiverPatient.refs.input.focus(); }}
                        onChangeText={(text) => this.setState({caregiverPassword: text})}/>
                    <Fumi
                        ref='caregiverPatient'
                        label={'Who are you taking care of?'}
                        iconClass={FontAwesomeIcon}
                        iconName={'user'}
                        iconColor={IconColor}
                        style={styles.row}
                        labelStyle={styles.mainText}
                        value={this.state.caregiverPatient}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({caregiverPatient: text})}/>
                </View>
        );
    }

    renderNurseForm() {
        const IconColor = '#00BCD4'
        return (
            <View style={styles.formContainer}>
                <Fumi
                    ref='nurseName'
                    label={'Name'}
                    iconClass={FontAwesomeIcon}
                    iconName={'user'}
                    iconColor={IconColor}
                    style={[styles.row , {borderTopLeftRadius: 5, borderTopRightRadius: 5}]}
                    labelStyle={styles.mainText}
                    value={this.state.nurseName}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    onChangeText={(text) => this.setState({nurseName: text})}
                    onSubmitEditing={(event) => {  this.refs.nurseHospital.refs.input.focus(); }}/>
                <Fumi
                    ref='nurseHospital'
                    label={'Hospital/Hospice Program'}
                    iconClass={FontAwesomeIcon}
                    iconName={'h-square'}
                    iconColor={IconColor}
                    style={styles.row}
                    labelStyle={styles.mainText}
                    value={this.state.nurseHospital}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    onChangeText={(text) => this.setState({nurseHospital: text})}
                    onSubmitEditing={(event) => {  this.refs.nurseEmail.refs.input.focus(); }}/>
                <Fumi
                    ref='nurseEmail'
                    label={'Email Address'}
                    iconClass={FontAwesomeIcon}
                    iconName={'envelope'}
                    iconColor={IconColor}
                    style={styles.row}
                    labelStyle={styles.mainText}
                    value={this.state.nurseEmail}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    onChangeText={(text) => this.setState({nurseEmail: text})}
                    onSubmitEditing={(event) => {  this.refs.nursePassword.refs.input.focus(); }}/>
                <Fumi
                    ref='nursePassword'
                    label={'Password'}
                    iconClass={FontAwesomeIcon}
                    iconName={'lock'}
                    iconColor={IconColor}
                    style={[styles.row, {borderBottomLeftRadius: 5, borderBottomRightRadius: 5}]}
                    labelStyle={styles.mainText}
                    value={this.state.nursePassword}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({nursePassword: text})}
                    onSubmitEditing={(event) => { }}/>
            </View>
        );
    }

    renderFormTypeButton(isCaregiver) {
        return (
            <View style={isCaregiver ? styles.userTypeContainer : [styles. userTypeContainer, {backgroundColor: "#00838F"}]}>
                <Button
                    style={isCaregiver ? [styles.secondaryText, {fontSize: 12, fontWeight: '500'}] : [styles.mainText, {fontSize: 12, fontWeight: '500'}]}
                    containerStyle={isCaregiver ? [styles.userTypeButton, styles.mainColor]: [styles.userTypeButton, styles.secondaryColor]}
                    onPress={() => this.setState({isCaregiver: !this.state.isCaregiver})}>
                    {!isCaregiver ? "Are you a caregiver?" : "Are you a nurse?"}
                </Button>
            </View>
        )
    }

    renderSubmitButton(isCaregiver) {
        return (
            <View>
                <Button
                    style={isCaregiver ? [styles.secondaryText, {fontWeight: 'bold', fontSize: 18}] : [styles.mainText, {fontWeight: 'bold', fontSize: 18}]}
                    containerStyle={isCaregiver ? [styles.button, styles.mainColor] : [styles.button, styles.secondaryColor]}
                    onPress={this.onPressSignUp.bind(this)}>
                    Submit
                </Button>
                <ActivityIndicator
                    animating={this.state.animating}
                    style={{height: 40}}
                    size="large"/>
                <Button
                    style={isCaregiver ? [styles.accountLabel, styles.centered, styles.mainText] : [styles.accountLabel, styles.centered, styles.secondaryText] }
                    containerStyle={{alignSelf: 'center', width: 130}}
                    onPress={this.onExitScene.bind(this)}>
                    Have an Account?
                </Button>
            </View>
        )
    }

    renderPage(isCaregiver) {

        const closeIcon = (<Ionicons name="ios-close" size={30} color="#1e1e1e" />);

        return (
            <View style={!isCaregiver? [styles.container, {justifyContent: 'space-between'}] : [styles.container, {backgroundColor: "white",justifyContent: 'space-between'}]}>
                <Image style={styles.centeredIcon} source={butterfly}/>
                { isCaregiver ? this.renderCaregiverForm() : this.renderNurseForm() }
                { this.renderSubmitButton(isCaregiver) }
                <View style={{flex: 1}}></View>
                { this.renderFormTypeButton(isCaregiver) }
                <CloseModalButton action={this.onExitScene.bind(this)} icon={closeIcon}/>
            </View>
        )
    }

    render() {
        const closeIcon = (<Ionicons name="ios-close" size={30} color="#1e1e1e" />);
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                { this.renderPage(true) }
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={!this.state.isCaregiver}
                    onRequestClose={() => {alert("Modal has been closed.")}}>
                    { this.renderPage(false) }
                </Modal>
            </View>
        )
    }
}
