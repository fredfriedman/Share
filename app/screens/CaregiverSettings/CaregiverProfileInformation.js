import React, {Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import firebaseHelper from './firebaseHelper';

import SettingsList from 'react-native-settings-list';


var styles = StyleSheet.create({
	imageStyle:{

	},
	titleInfoStyle:{

	},
});


export default class caregiverprofile extends Component{
	constructor(){
		super();
		var self = this;
		this.state = {};
		fb = new firebaseHelper();
		fb.getCaregiverProfilePromise('sD2AEvyjW9S2xuOY1yWPf7XkqUU2').then(function(profile){
			self.setState({
				caregiverName: profile.name,
				caregiverPhone: profile.phone,
				caregiverRelation: profile.relation
				}
			);
		});
	}

	render(){
		return(
			<View>
				<View style={{borderBottomWidth:1, backgroundColor:'#00BCD4',borderColor:'#c8c7cc'}}>
           			<Text style={{alignSelf:'center',marginTop:30,marginBottom:20,fontWeight:'bold',fontSize:16, color: 'white'}}>Caregiver Settings</Text>
         		</View>
         		<View style={{backgroundColor:'#EFEFF4',flex:1}}>
					<SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
						<SettingsList.Header headerStyle={{marginTop:15}}/>
						<SettingsList.Item
							title='Caregiver Name'
							titleInfo={this.state.caregiverName}
							titleInfoStyle={styles.titleInfoStyle}
							onPress = {()=> alert('Change Name')}
						/>
						<SettingsList.Item
							title='Caregiver Phone'
						  	titleInfo={this.state.caregiverPhone}
						  	titleInfoStyle={styles.titleInfoStyle}
						  	onPress = {() => alert('Change Contact Information')}
						/>
						<SettingsList.Item
							title='Relation'
						  	titleInfo={this.state.caregiverRelation}
						  	titleInfoStyle={styles.titleInfoStyle}
						  	onPress = {()=> alert('Change Relation')}
						/>
					</SettingsList>
				</View>
			</View>
		);
	}

}