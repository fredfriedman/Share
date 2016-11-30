import React, {Component} from 'react';
import {View,Text, ListView, TouchableHighlight, Modal, TextInput} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
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
			modalVisible: false,
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

	onBack() {
		this.props.navigator.pop()
	}

	render(){
		const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" size={30} color="white" />);
		const addIcon = (<Icon name="ios-add" size={30} color="white" />);

		return(
			<View style ={styles.container}>
				<Header
                    text= "Manage Patients"
					rightAction={()=> this.setModalVisible(!this.state.modalVisible)}
					rightIcon={addIcon}
                    leftAction={this.onBack.bind(this)}
                    leftIcon={backIcon}
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
			            <Text style = {styles.modalText}>Add Patient</Text>
			            <TextInput
							style={styles.textInput}
							placeholder={"Please Enter the Patient's name"}
                            multiline={false}
							autoCorrect={false}
			            	onChangeText={(patientName) => this.setState({patientName: patientName})}
			            	value = {this.state.patientName}/>
			            <TouchableHighlight
			            	style = {styles.submit}
			            	onPress={() => {
				              this.setModalVisible(!this.state.modalVisible);
				              console.log(this.props.user);
				              this.props.onAdd(this.state.patientName, this.state.patientStatus, this.props.user.id);
				              this.props.initializePatientList();
				            }}>
			               <Text style = {styles.buttonStyles}>Submit</Text>
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
	textInput: {
        height: 30,
        color: '$colors.darkGray'
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
		fontSize: 15,
		fontWeight: '400',
		fontFamily: '$fonts.family',
	}

});

ManagePatientDetail.propTypes = {
	onRemove: React.PropTypes.func.isRequired,
	onAdd: React.PropTypes.func.isRequired,
}
