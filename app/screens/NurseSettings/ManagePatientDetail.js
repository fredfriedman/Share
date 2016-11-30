import React, {Component} from 'react';
import {View,Text, ListView, TouchableHighlight, Modal, TextInput} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/header';
import EStyleSheet from 'react-native-extended-stylesheet';

data = {

}


export default class ManagePatientDetail extends Component{
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		data = ds.cloneWithRows(['undefined']);
		this.state = {
			datasource: data,
		};
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
			<View style ={styles.container}>
				<Header
                    text= "Manage Patients"
                    leftAction={()=> this.setModalVisible(!this.state.modalVisible)}
                    leftIcon={<Icon name = 'plus' size = {20} color="white" />}
                    textStyle = {styles.titleText}/>
         		<SwipeListView
		            dataSource={this.state.datasource}
		            renderRow={ data => (
		                <View style = {styles.rowFront}>
		                    <Text style = {styles.patientText}>Name: {data.name}</Text>
		                    <Text style = {styles.patientText}>ID: {data.id}</Text>
		                </View>
		            )}
		            renderHiddenRow={ (data, secId, rowId, rowMap) => (
		                <TouchableHighlight style = {styles.rowBack}onPress = {()=> this.deleteRow(data, secId,rowId,rowMap)}>
		                    <Text style = {styles.rowBackText}>Delete</Text>
		                </TouchableHighlight>
		            )}
		            leftOpenValue={75}
		        />
		        <Modal
		            animationType={"slide"}
		            transparent={false}
		            visible={this.state.modalVisible}
		            onRequestClose={() => {alert("Modal has been closed.")}}
		            >
		            <View style={{marginTop: 22}}>
		            <View>
		            <Text>Add Patient</Text>
		            <Text>Patient Name: </Text>
		            <TextInput
		            	onChangeText={(patientName) => this.setState({patientName: patientName})}
		            	value = {this.state.patientName}
		           	/>
		           	<Text>Patient Status (0-100): </Text>
		            <TextInput
		            	onChangeText={(patientStatus) => this.setState({patientStatus: patientStatus})}
		            	value = {this.state.patientStatus}
		           	/>

		            <TouchableHighlight 
		            	onPress={() => {
			              this.setModalVisible(!this.state.modalVisible);
			              this.props.onAdd(this.state.patientName, this.state.patientStatus);
			              this.props.initializePatientList();
			            }}>
		               <Text>Submit</Text>
		            </TouchableHighlight>
		            <TouchableHighlight 
		            	onPress={() => {
			              this.setModalVisible(!this.state.modalVisible);
			            }}>
		               <Text>Cancel</Text>
		            </TouchableHighlight>

		          </View>
		         </View>
		        </Modal>
			</View>

		);
	}

	setModalVisible(visible) {
      this.setState({modalVisible: visible});
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

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '$colors.lightGray',
	},

	rowFront:{
		backgroundColor: 'white',
		paddingLeft: 10,
		height: '$dimensions.rowHeight',
		justifyContent: 'center',
	},

	rowBack:{
		backgroundColor: 'red',
		height: '$dimensions.rowHeight',
		justifyContent: 'center',
		alignItems: 'center',
		width: 75,

	},

	titleText: {
		color: 'white',
        fontWeight: '300',
        fontFamily: '$fonts.family',
	},

	rowBackText: {
        fontSize: 11,
        fontWeight: '300',
        fontFamily: '$fonts.family',
        color: 'white',
    },
	
	patientText: {
		fontSize: 11,
        fontWeight: '300',
        fontFamily: '$fonts.family',
        color: '$colors.darkGray',

	}
});

ManagePatientDetail.propTypes = {
	onRemove: React.PropTypes.func.isRequired,
	onAdd: React.PropTypes.func.isRequired,
}