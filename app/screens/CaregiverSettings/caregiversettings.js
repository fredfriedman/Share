import React, {Component} from 'react';
import {
	Alert,
	Navigator,
	View
} from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';
import SettingsList from 'react-native-settings-list';

import login from '../Login/home';
import Header from '../../components/header';
import ModalView from './EditProfileModal'
import firebaseHelper from './firebaseHelper';
import CaregiverProfile from './CaregiverProfileInformation';
import AboutPage from '../About/about'

export default class CaregiverSettings extends Component {

	constructor(){
		super();

		this.onValueChange = this.onValueChange.bind(this);

		this.state = {
			switchValue: false,
			modalVisible: false,
			modalEditType: "",
		}
	}

	save(value) {
		var fb = new firebaseHelper();

		var self = this

		fb.isValidPatientId(value)
			.then(res => {
				if (res.val()) {
					fb.updatePatientId(this.props.user.id, value)
					self.setModalVisible(null)
				} else {
					Alert.alert('Patient Does Not Exist')
				}
			}, function(error) {
				Alert.alert('An Error Occurred')
			})
	}

	onBack() {
		this.props.navigator.pop()
	}

	setModalVisible(placeholder) {
        this.setState({modalVisible: !this.state.modalVisible, modalEditType: placeholder});
    }

	render() {
		const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" size={30} color="white" />);

		return (

		 	<View style={{backgroundColor:'#EFEFF4',flex:1}}>
		 		<Header
					text={"Settings"}
					headerStyle={styles.header}
					textStyle={styles.header_text}
					leftAction={this.onBack.bind(this)}
					leftIcon={backIcon}/>
				<View style={{backgroundColor:'#EFEFF4',flex:1}}>
					<SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
						<SettingsList.Header headerStyle={{marginTop:15}}/>
						<SettingsList.Item
							title='About'
							titleInfoStyle={styles.titleInfoStyle}
							onPress={() => this.onViewAboutPage()}
						/>
						<SettingsList.Item
							title='Profile Information'
							titleInfoStyle={styles.titleInfoStyle}
							onPress={() => this.onViewProfileInformation()}
						/>
						<SettingsList.Item
						  	title='Patient Info'
						  	titleInfo={'Patient ID: '+this.props.user.Patient}
						  	titleInfoStyle={styles.titleInfoStyle}
						  	onPress = {this.setModalVisible.bind(this, "Patient ID")}
						/>
						<SettingsList.Item
						  	hasSwitch={true}
							switchState={this.state.switchValue}
						  	switchOnValueChange={this.onValueChange}
						  	hasNavArrow={false}
						  	title='Notifications'
						/>
						<SettingsList.Header headerStyle={{marginTop:15}}/>
						<SettingsList.Item
							backgroundColor = 'red'
							titleStyle = {{color: 'white'}}
						  	title='Logout'
						  	onPress={this.onLogout.bind(this)}
						/>
					</SettingsList>
				</View>
				<ModalView
                    modalVisible={this.state.modalVisible}
					saveInfo={this.save.bind(this)}
                    closeModal={this.setModalVisible.bind(this, null)}
					placeholder={this.state.modalEditType}/>
		  	</View>
		);
	}

	onViewProfileInformation(){
		this.props.navigator.push({
			component: CaregiverProfile,
			sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
			passProps: {user: this.props.user}

		});
	}

	onViewAboutPage(){
		this.props.navigator.push({
			component: AboutPage,
			sceneConfig: Navigator.SceneConfigs.FloatFromBottom,

		});
	}

  	onValueChange(value){
		this.setState({switchValue: value});
  	}

	onBack() {
		this.props.navigator.pop()
	}

	onLogout(){
		var fb = new firebaseHelper();

		var self = this

		fb.signOut().then(function(val) {
			if(val) {
				self.props.navigator.resetTo({component: login});
			} else {
				alert('A Problem Occurred');
			}
		})
  	}
}

const styles = EStyleSheet.create({
	header: {
        backgroundColor: '$colors.main',
    },
    header_text: {
        color: '$colors.lightGray',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: "$fonts.family",
    },
});
