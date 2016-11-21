import React, {Component} from 'react';
import {View,TextInput, Text} from 'react-native';

import Button from 'react-native-button';




export default class ManagePatientDetail extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<View>
				<View style={{borderBottomWidth:1, backgroundColor:'#00BCD4',borderColor:'#c8c7cc'}}>
           			<Text style={{alignSelf:'center',marginTop:30,marginBottom:20,fontWeight:'bold',fontSize:16, color: 'white'}}>Manage Patients</Text>
         		</View>
			</View>
		);
	}
}