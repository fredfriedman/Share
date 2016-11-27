import React, {Component} from 'react';
import {View,Text, ListVieandroidw} from 'react-native';

import Button from 'react-native-button';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';


data = {

}


export default class ManagePatientDetail extends Component{
	constructor(props){
		super(props);
		// this.props.initializePatientsList();
		// this.props.initializeNursesList();
	}
//Use swipeable listview
//TODO get listview datasource from firebase
//TODO define render row
//TODO clickable rows
//TODO Delete clicked rows
//TODO SWIPE row to confirm and remove patient from database
//TODO Add entry, caregiver assigned to database

	
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

ManagePatientDetail.propTypes = {
	onRemove: React.PropTypes.func.isRequired,
	onAdd: React.PropTypes.func.isRequired,
}