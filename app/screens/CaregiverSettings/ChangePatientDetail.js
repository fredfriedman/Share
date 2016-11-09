import React, {Component} from 'react';
import {View,TextInput, Text} from 'react-native';
import firebaseHelper from './firebaseHelper';

import Button from 'react-native-button';




export default class ChangePatientDetail extends Component{
	constructor(props){
		super(props);
		this.state = { text: 'PID' };
	}

	render(){
		return(
			<View>
				<View style={{borderBottomWidth:1, backgroundColor:'#00BCD4',borderColor:'#c8c7cc'}}>
           			<Text style={{alignSelf:'center',marginTop:30,marginBottom:20,fontWeight:'bold',fontSize:16, color: 'white'}}>Change Patient ID</Text>
         		</View>
				<TextInput
			        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
			        onChangeText={(text) => this.setState({text})}
			        value={this.state.text}
      			/>
      			<Button
      				onPress = {() => this.changePatientID()}
      			>
      				Change Patient ID
      			</Button>
			</View>
		);
	}

	changePatientID(){
		var fb = new firebaseHelper();
		//change patient id
		var isValidPatientPromise = fb.isValidPatientId(this.state.text);
		fb.updatePatientId('sD2AEvyjW9S2xuOY1yWPf7XkqUU2',this.state.text, isValidPatientPromise)
	}

}