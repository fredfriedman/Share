import React, {Component} from 'react';
import {View,Text, ListView, TouchableHighlight} from 'react-native';

import Button from 'react-native-button';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';


data = {

}


export default class ManagePatientDetail extends Component{
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		data = ds.cloneWithRows(['undefined']);
		this.state = {datasource: data};
		this.props.initializePatientList();
		this.props.initializeNurseList();
	}

//Use swipeable listview
//TODO get listview datasource from firebase
//TODO define render row
//TODO clickable rows[{name: 'h', id: 1}, {name: 'e', id: 2}]
//TODO Delete clicked rows
//TODO SWIPE row to confirm and remove patient from database
//TODO Add entry, caregiver assigned to database
//componentdidupdate
	componentWillReceiveProps(nextProps){
		// console.log("FRUSTRATIONPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
		if(nextProps.nurses != this.props.nurses){
			const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			
			// console.log(this.state.datasource);
			nurseList = [];
			for( key in nextProps.nurses){
				// console.log({name: nextProps.nurses[key].Profile.name, id: key});
				nurseList.push({name: nextProps.nurses[key].Profile.name, id: key});
			}
			this.setState({
				datasource: ds.cloneWithRows(nurseList),
			});
		}
	}
	
	render(){
		return(
			<View>
				<View style={{borderBottomWidth:1, backgroundColor:'#00BCD4',borderColor:'#c8c7cc'}}>
           			<Text style={{alignSelf:'center',marginTop:30,marginBottom:20,fontWeight:'bold',fontSize:16, color: 'white'}}>Manage Patients</Text>
         		</View>
         		<SwipeListView
		            dataSource={this.state.datasource}
		            renderRow={ data => (
		                <View>
		                    <Text>Name: {data.name} ID: {data.id}</Text>
		                </View>
		            )}
		            renderHiddenRow={ (data, secId, rowId, rowMap) => (
		                <TouchableHighlight onPress = {()=> this.deleteRow(data, secId,rowId,rowMap)}>
		                    <Text>Delete</Text>
		                </TouchableHighlight>
		            )}
		            leftOpenValue={75}
		        />
			</View>


		);
	}

	deleteRow(data,secId,rowId,rowMap){
		rowMap[`${secId}${rowId}`].closeRow();
		// const newData = [...this.state.listViewData];
		// newData.splice(rowId, 1);
		// this.setState({listViewData: newData});
		console.log(data);
	}
}

ManagePatientDetail.propTypes = {
	onRemove: React.PropTypes.func.isRequired,
	onAdd: React.PropTypes.func.isRequired,
}