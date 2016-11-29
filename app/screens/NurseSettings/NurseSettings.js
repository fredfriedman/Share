import React, {Component} from 'react';
import {View, StyleSheet,Text, Image, Alert, Navigator} from 'react-native';
import SettingsList from 'react-native-settings-list';
import EStyleSheet from 'react-native-extended-stylesheet';

import login from '../Login/home';
import firebaseHelper from '../CaregiverSettings/firebaseHelper';
import Header from '../../components/header';
import ManagePatientDetailContainer from '../../containers/ManagePatientDetailContainer';
import ManageCaregiverDetailContainer from '../../containers/ManageCaregiverDetailContainer';


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
					  	onPress={() => this.onViewManagePatientDetail()}
					/>
					<SettingsList.Item
					  	title='Manage Caregivers'
					  	titleInfoStyle={styles.titleInfoStyle}
					  	onPress={() => this.onViewManageCaregiverDetail()}
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

	onViewManagePatientDetail(){
		this.props.navigator.push({
			component:ManagePatientDetailContainer,
			sceneConfig: Navigator.SceneConfigs.FloatFromBottom
		});
	}

	onViewManageCaregiverDetail(){
		this.props.navigator.push({
			component:ManageCaregiverDetailContainer,
			sceneConfig: Navigator.SceneConfigs.FloatFromBottom
		});
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