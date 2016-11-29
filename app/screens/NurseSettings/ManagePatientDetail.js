import React, {Component} from 'react';
import {View,Text, ListView, TouchableHighlight} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/header';


data = {

}


export default class ManagePatientDetail extends Component{
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		data = ds.cloneWithRows(['undefined']);
		this.state = {datasource: data};
		this.props.initializePatientList();
		this.props.initializeCaregiverList();
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
		if(nextProps.patients != this.props.patients){
			const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			
			// console.log(nextProps.patients);
			patientList = [];
			for( key in nextProps.patients){
				// console.log({name: nextProps.nurses[key].Profile.name, id: key});
				if(nextProps.patients[key].active == true){
					patientList.push({name: nextProps.patients[key].name, id: key});
				}
			}
			this.setState({
				datasource: ds.cloneWithRows(patientList),
			});
		}
	}
	


	render(){
		return(
			<View>
				<Header
                    text= "Manage Patients"
                    leftAction={()=> console.log('Hello')}
                    leftIcon={<Icon name = 'plus' size = {20} color="white" />}/>
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
		this.props.onRemove(data.id);
		this.props.initializePatientList();
	}
}

ManagePatientDetail.propTypes = {
	onRemove: React.PropTypes.func.isRequired,
	onAdd: React.PropTypes.func.isRequired,
}