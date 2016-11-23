'use strict';
import React, { Component } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Navigator,
    Modal,
    Text,
    View
} from 'react-native';

// Assets
import { butterfly } from '../../config/images'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import styles from './styles'

// Components
import Button from 'react-native-button'
import Header from '../../components/header'
import { Fumi } from 'react-native-textinput-effects';

// Utilities
import Firebase from '../../config/firebase'
import Dimensions from 'Dimensions';
import dismissKeyboard from 'dismissKeyboard'

// Screens
import Login from './Login'

function User() {
    this.name = '';
    this.phone = '';
    this.email = '';
    this.password = '';
}
function Caregiver() {
    User.call(this);
    this.relation = '';
    this.patient = '';
}
function Nurse() {
    User.call(this);
    this.hospital = '';
    this.picture = '';
}

export default class signup extends Component {

    constructor(props){
        super(props);

        this.state = {
            caregiver: new Caregiver(),
            nurse: new Nurse(),
            animating: false,
            isCaregiver: true,
            currentPage: 0
        };
    }

    onPressSignUp() {

        var self = this

        var email =  self.state.isCaregiver ? this.state.caregiver.email : this.state.nurse.email
        var pass  =  self.state.isCaregiver ? this.state.caregiver.password  : this.state.nurse.password

        this.setState({animating: true})

        Firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(function(user) {

                var ref = self.state.isCaregiver ? "Caregivers/" + user.uid : "Nurses/" + user.uid

                var data = self.state.isCaregiver ? {patient: self.state.caregiver.patient,  Profile: {name: self.state.caregiver.name, phone: self.state.caregiver.phone, relation: self.state.caregiver.relation}} :
                                                    {Profile: {name: self.state.nurse.name, phone: self.state.nurse.phone, relation: self.state.nurse.picture}}

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

    render() {

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

    renderPage(isCaregiver: Boolean) {

        return (
            <View style={!isCaregiver? [styles.container, {justifyContent: 'space-between'}] : [styles.container, {backgroundColor: "white",justifyContent: 'space-between'}]}>
                <View>
                    { this.renderHeader(isCaregiver)}
                    { this.renderForm(isCaregiver) }
                    { this.renderSubmitButton(isCaregiver) }
                </View>
                { this.renderFormTypeButton(isCaregiver) }
            </View>
        )
    }

    renderHeader(isCaregiver: Boolean) {

        const closeIcon = (<Ionicons name="ios-close" size={30} color="#1e1e1e" />);

        return (
            <Header
                leftAction={this.onExitScene.bind(this)}
                leftIcon={closeIcon}
                centerIcon={<Image style={styles.icon} source={butterfly}/>}
                headerStyle={isCaregiver ? styles.header : [styles.header, styles.mainColor, {borderColor: 'transparent'}]}/>
        )
    }

    renderForm(isCaregiver: Boolean) {
        return isCaregiver ? this.renderCaregiverForm() : this.renderNurseForm()
    }

    renderSubmitButton(isCaregiver: Boolean) {
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

    renderFormTypeButton(isCaregiver: Boolean) {
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
                        value={this.state.caregiver.name}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={(text) => {
                            var updatedUser = Object.assign({}, this.state.caregiver, {name: text});
                            this.setState({caregiver: updatedUser})
                        }}
                        onSubmitEditing={(event) => {  this.refs.caregiverEmail.refs.input.focus(); }}/>
                    <Fumi
                        ref="caregiverEmail"
                        label={'Email'}
                        iconClass={FontAwesomeIcon}
                        iconName={'envelope'}
                        iconColor={IconColor}
                        style={styles.row}
                        labelStyle={styles.mainText}
                        value={this.state.caregiver.email}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={(text) => {
                            var updatedUser = Object.assign({}, this.state.caregiver, {email: text});
                            this.setState({caregiver: updatedUser})
                        }}
                        onSubmitEditing={(event) => {  this.refs.caregiverPassword.refs.input.focus(); }}/>
                    <Fumi
                        ref='caregiverPassword'
                        label={'Password'}
                        iconClass={FontAwesomeIcon}
                        iconName={'lock'}
                        iconColor={IconColor}
                        style={styles.row}
                        labelStyle={styles.mainText}
                        value={this.state.caregiver.password}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        secureTextEntry={true}
                        onSubmitEditing={(event) => {  this.refs.caregiverPatient.refs.input.focus(); }}
                        onChangeText={(text) => {
                            var updatedUser = Object.assign({}, this.state.caregiver, {password: text});
                            this.setState({caregiver: updatedUser})
                        }}/>
                    <Fumi
                        ref='caregiverPatient'
                        label={'Who are you taking care of?'}
                        iconClass={FontAwesomeIcon}
                        iconName={'user'}
                        iconColor={IconColor}
                        style={styles.row}
                        labelStyle={styles.mainText}
                        value={this.state.caregiver.patient}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            var updatedUser = Object.assign({}, this.state.caregiver, {patient: text});
                            this.setState({caregiver: updatedUser})
                        }}/>
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
                    value={this.state.nurse.name}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    onChangeText={(text) => {
                        var updatedUser = Object.assign({}, this.state.nurse, {name: text});
                        this.setState({nurse: updatedUser})
                    }}
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
                    onChangeText={(text) => {
                        var updatedUser = Object.assign({}, this.state.nurse, {hospital: text});
                        this.setState({nurse: updatedUser})
                    }}
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
                    onChangeText={(text) => {
                        var updatedUser = Object.assign({}, this.state.nurse, {email: text});
                        this.setState({nurse: updatedUser})
                    }}
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
                    onChangeText={(text) => {
                        var updatedUser = Object.assign({}, this.state.nurse, {email: text});
                        this.setState({nurse: updatedUser})
                    }}
                    onSubmitEditing={(event) => { }}/>
            </View>
        );
    }
}
