import React, {Component} from 'react';
import {View,Text, ListView, TouchableHighlight} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';
import Header from '../../components/header';


data = {

}

export default class ManageCaregiverDetail extends Component{
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
		console.log("FRUSTRATIONPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
		console.log(nextProps.caregivers);
		if(nextProps.caregivers != this.props.caregivers){
			const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			

			caregiverList = [];
			for( key in nextProps.caregivers){
				// console.log({name: nextProps.nurses[key].Profile.name, id: key});
				caregiverList.push({name: nextProps.caregivers[key].Profile.name, id: key});
			}
			this.setState({
				datasource: ds.cloneWithRows(caregiverList),
			});
		}
	}
	
	render(){
		return(
			<View style = {styles.container}>
				<Header
                    text= 'Manage Caregivers'
                    leftAction={()=> console.log('Hello')}
                    leftIcon={<Icon name = 'plus' size = {20} color = 'white'/>}/>
         		<SwipeListView
		            dataSource={this.state.datasource}
		            renderRow={ data => (
		                <View style = {styles.rowFront}>
		                    <Text>Name: {data.name}</Text>
		                    <Text>ID: {data.id}</Text>
		                </View>
		            )}
		            renderHiddenRow={ (data, secId, rowId, rowMap) => (
		                <TouchableHighlight style = {styles.rowBack} onPress = {()=> this.deleteRow(data, secId,rowId,rowMap)}>
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
		// this.props.onRemove(data.id);
		this.props.initializeCaregiverList();
	}
}

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '$colors.lightGray',
	},

	rowFront:{
		backgroundColor: '$colors.lightGray',
		paddingLeft: 20,


	},

	rowBack:{},
	
});

ManageCaregiverDetail.propTypes = {
	onRemove: React.PropTypes.func.isRequired,
	onAdd: React.PropTypes.func.isRequired,
}