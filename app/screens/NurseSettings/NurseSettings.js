import React, {Component} from 'react';
import {View, StyleSheet,Text, Image, Alert, Navigator} from 'react-native';
import SettingsList from 'react-native-settings-list';

import login from '../Login/home';
import firebaseHelper from '../CaregiverSettings/firebaseHelper';
import header from '../../components/header';
var styles = StyleSheet.create({
	imageStyle:{

	},
	titleInfoStyle:{

	},
});

export default class NurseSettings extends Component {
	constructor(){
		super();
		this.onValueChange = this.onValueChange.bind(this);
		this.state = {switchValue: false,
		};

		//set states from firebase
		var self = this;
		fb = new firebaseHelper();
	}

  	//clear asyn storage, logout with firebase, navigator clear


	render() {
		var bgColor = '#DCE3F4';
		return (

		 	<View style={{backgroundColor:'#EFEFF4',flex:1}}>
		 		<View style={{borderBottomWidth:1, backgroundColor:'#00BCD4',borderColor:'#c8c7cc'}}>
           			<Text style={{alignSelf:'center',marginTop:30,marginBottom:20,fontWeight:'bold',fontSize:16, color: 'white'}}>Nurse Settings</Text>
         		</View>
				<View style={{backgroundColor:'#EFEFF4',flex:1}}>
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
	onLogout(){
  		this.props.navigator.resetTo({component: login});
  	}
}