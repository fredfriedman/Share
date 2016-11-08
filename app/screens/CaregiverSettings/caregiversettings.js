import React, {Component} from 'react';
import {View, StyleSheet,Text, Image, Alert, Navigator} from 'react-native';
import SettingsList from 'react-native-settings-list';

import login from '../Login/home';
import firebaseHelper from './firebaseHelper';
import header from '../../components/header';

var styles = StyleSheet.create({
	imageStyle:{

	},
	titleInfoStyle:{

	},
});

export default class caregiversettings extends Component {
	constructor(){
		super();
		this.onValueChange = this.onValueChange.bind(this);
		this.state = {switchValue: false};

		//set states from firebase
		var self = this;
		fb = new firebaseHelper();
		fb.getCaregiverPromise('sD2AEvyjW9S2xuOY1yWPf7XkqUU2').then(function(caregiver){
			self.setState(
				{patientId: caregiver}
			);
		});
	}

  	//clear asyn storage, logout with firebase, navigator clear


	render() {
		var bgColor = '#DCE3F4';
		return (

		 	<View style={{backgroundColor:'#EFEFF4',flex:1}}>
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
						  	titleInfo={'Patient ID: '+this.state.patientId}
						  	titleInfoStyle={styles.titleInfoStyle}
						  	onPress={() => Alert.alert('Route to change PatientID')}
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
						  	title='General'
						  	onPress={() => Alert.alert('Route To General Page')}
						/>
						<SettingsList.Item
						  	title='Display'
						  	onPress={() => Alert.alert('Route To Display Page')}
						/>
						<SettingsList.Header headerStyle={{marginTop:15}}/>
						<SettingsList.Item
						  	title='Logout'
						  	onPress={() => this.onLogout()}
						/>
					</SettingsList>
				</View>
		  	</View>
		);
	}

	onViewProfileInformation(){
		this.props.navigator.push({
			component:login,
			sceneConfig: Navigator.SceneConfigs.FloatFromBottom
		});
	}

  	onValueChange(value){
		this.setState({switchValue: value});
  	}

  	onLogout(){
  		this.props.navigator.resetTo({component: login});
		// this.props.navigator.push({
	 //  	component:login
		// });
  	}
}
