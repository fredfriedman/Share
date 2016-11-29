import React, {Component} from 'react';
import {View, StyleSheet,Text, Image, Alert, Navigator} from 'react-native';
import SettingsList from 'react-native-settings-list';

import login from '../Login/home';
import firebaseHelper from './firebaseHelper';
import Header from '../../components/header';
import changepatientdetail from './ChangePatientDetail';
import caregiverprofile from './CaregiverProfileInformation';
import Icon from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class CaregiverSettings extends Component {

	constructor(){
		super();

		this.onValueChange = this.onValueChange.bind(this);
		this.state = {switchValue: false };

		this.fb = new firebaseHelper();
	}

  	//clear asyn storage, logout with firebase, navigator clear


	render() {
		const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" size={30} color="white" />);
		var bgColor = '#DCE3F4';

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
							title='Profile Information'
							titleInfoStyle={styles.titleInfoStyle}
							onPress={() => this.onViewProfileInformation()}
						/>
						<SettingsList.Item
						  	title='Patient Info'
						  	titleInfo={'Patient ID: '+this.props.user.Patient}
						  	titleInfoStyle={styles.titleInfoStyle}
						  	onPress={() => this.changePatientId()}
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
						  	onPress={() => this.onLogout()}
						/>
					</SettingsList>
				</View>
		  	</View>
		);
	}

	onViewProfileInformation(){
		console.log("hi",this.props, this.props.user)
		this.props.navigator.push({
			component:caregiverprofile,
			sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
			passProps: {user: this.props.user}

		});
	}

	changePatientId(){
		this.props.navigator.push({
			component:changepatientdetail,
			sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
			passProps: {user: this.props.user}
		});
	}

  	onValueChange(value){
		this.setState({switchValue: value});
  	}

	onBack() {
		this.props.navigator.pop()
	}

	onLogout(){

		var self = this

		this.fb.signOut().then(function(val) {
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
