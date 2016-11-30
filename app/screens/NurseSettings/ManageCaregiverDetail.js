import React, {Component} from 'react';
import {View,Text, ListView, TouchableHighlight, Modal, TextInput} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';
import Header from '../../components/header';


data = {

}

export default class ManageCaregiverDetail extends Component{
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		data = ds.cloneWithRows(['undefined']);
		this.state = {
			datasource: data,
			modalVisible: false,
			patientId: '',
			modalName: '',
			modalCaregiver: '',
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

	onBack() {
		this.props.navigator.pop()
	}

	render(){
		const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" size={30} color="white" />);
		return(
			<View style = {styles.container}>
				<Header
                    text= 'Manage Caregivers'
                    textStyle = {styles.titleText}
					leftAction={this.onBack.bind(this)}
					leftIcon={backIcon}/>
         		<SwipeListView
		            dataSource={this.state.datasource}
		            renderRow={ data => (
		                <View style = {styles.rowFront}>
		                    <Text style = {styles.caregiverText}>Name: {data.name}</Text>
		                    <Text style = {styles.caregiverText}>ID: {data.id}</Text>
		                </View>
		            )}
		            renderHiddenRow={ (data, secId, rowId, rowMap) => (
		                <TouchableHighlight style = {styles.rowBack} onPress = {()=> this.deleteRow(data, secId,rowId,rowMap)}>
		                    <Text style = {styles.rowBackText}>Assign</Text>
		                </TouchableHighlight>
		            )}
		            leftOpenValue={75}
					disableLeftSwipe={true}
		        />
		       	<Modal
		            animationType={"fade"}
		            transparent={true}
		            visible={this.state.modalVisible}
		            onRequestClose={() => {alert("Modal has been closed.")}}
		            >
		            	<View style = {styles.externalContainer}>
		            	<View style= {styles.modalViewStyles}>
			            <Text style = {styles.modalText}>Assign {this.state.modalName} to Patient with ID</Text>
			            <Text style = {styles.inputText}>Patient ID</Text>
			            <TextInput
			            	onChangeText={(patientId) => this.setState({patientId: patientId})}
			            	value = {this.state.patientId}
			           	/>
			            <TouchableHighlight
			            	style = {styles.submit}
			            	onPress={() => {
				              this.setModalVisible(!this.state.modalVisible);
				              // this.props.onAdd(this.state.patientName, this.state.patientStatus);
				              this.props.initializeCaregiverList();
				              this.props.onAssign(this.state.modalCaregiver, this.state.patientId);
				            }}>
			               <Text style = {styles.buttonStyles}>Confirm</Text>
			            </TouchableHighlight>
			            <TouchableHighlight
			            	style = {styles.cancel}
			            	onPress={() => {
				              this.setModalVisible(!this.state.modalVisible);
				            }}>
			               <Text style = {styles.buttonStyles}>Cancel</Text>
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
		this.setState({modalName: data.name});
		this.setState({modalCaregiver: data.id});
		this.setModalVisible(!this.state.modalVisible);
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

	caregiverText: {
		fontSize: 11,
        fontWeight: '300',
        fontFamily: '$fonts.family',
        color: '$colors.darkGray',
	},
		modalViewStyles:{
		flex: 1,
	    justifyContent: 'center',
	    padding: 20,
	    marginTop: 100,
	    marginBottom: 100,
	    marginLeft: 10,
	    marginRight: 10,
	    borderRadius: 5,
	    backgroundColor: '$colors.lightGray',
	},
	externalContainer:{
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		height: '$dimensions.screenHeight',
		width: '$dimensions.screenWidth',
	},

	placeHolder: {
		position: 'relative',
	    backgroundColor: '#000000',
	    opacity: 0.5,
	},
	submit:{
		backgroundColor: 'green',
		height: '$dimensions.rowHeight',
		borderRadius: 4,
		margin: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cancel:{
		backgroundColor: 'red',
		height: '$dimensions.rowHeight',
		borderRadius: 4,
		margin: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonStyles: {
		color: 'white',
		fontSize: 12,
		fontWeight: '300',
		fontFamily: '$fonts.family',
	},
	modalText: {
		textAlign: 'center',
		fontSize: 18,
		fontWeight: '400',
		fontFamily: '$fonts.family',
		margin: 10,
	},
	inputText:{
		fontSize: 12,
		fontWeight: '400',
		fontFamily: '$fonts.family',
	}
});

ManageCaregiverDetail.propTypes = {
	onRemove: React.PropTypes.func.isRequired,
	onAdd: React.PropTypes.func.isRequired,
}
