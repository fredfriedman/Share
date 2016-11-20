import React, {Component} from 'react';
import {View, StyleSheet,Text, Image, Alert, Navigator} from 'react-native';
import SettingsList from 'react-native-settings-list';
import EStyleSheet from 'react-native-extended-stylesheet';

import login from '../Login/home';
import firebaseHelper from '../CaregiverSettings/firebaseHelper';
import Header from '../../components/header';

const styles = EStyleSheet.create({
	container: {
		backgroundColor:'$colors.lightGray',
		flex:1
	},
	imageStyle:{

	},
	titleInfoStyle:{

	},
});

export default class NurseSettings extends Component {
	constructor(){
		super();

		this.state = {
			switchValue: false,
		};

		this.fb = new firebaseHelper();
	}

	onValueChange(value){
		this.setState({switchValue: value});
    }

	render() {
		var bgColor = '#DCE3F4';
		return (

		 	<View style={styles.container}>
				<Header text={"Settings"} textStyle={{color: 'white'}}/>
				<SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
					<SettingsList.Header headerStyle={{marginTop:15}}/>
					<SettingsList.Item
						title='Profile Information'
						titleInfoStyle={styles.titleInfoStyle}
						onPress={() => alert('Nurse Information')}
					/>
					<SettingsList.Item
					  	title='Manage Patients'
					  	titleInfoStyle={styles.titleInfoStyle}
					  	onPress={() => alert('add and archive patients')}
					/>
					<SettingsList.Item
					  	title='Manage Caregivers'
					  	titleInfoStyle={styles.titleInfoStyle}
					  	onPress={() => alert('Provision New Caregiver Profiles')}
					/>
					<SettingsList.Item
					  	hasSwitch={true}
						switchState={this.state.switchValue}
					  	switchOnValueChange={this.onValueChange.bind(this)}
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

		);
	}

	onLogout(){

		fb = new firebaseHelper();

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