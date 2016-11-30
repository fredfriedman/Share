import React, {Component} from 'react';
import {View,TextInput, Text} from 'react-native';
import firebaseHelper from './firebaseHelper';

import Button from 'react-native-button';
import Header from '../../components/header';

import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ChangePatientDetail extends Component{

	constructor(props){
		super(props);
		this.state = { text: '' };
	}

	onBack() {
		this.props.navigator.pop()
	}

	render(){
		const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" size={30} color="#f7f7f7" />);

		return(
			<View style={styles.container}>
				<Header
					text={"Change Patient"}
					textStyle={{color: 'white'}}
					leftAction={this.onBack.bind(this)}
					leftIcon={backIcon}/>
				<TextInput
			        style={styles.textInput}
			        onChangeText={(text) => this.setState({text})}
					placeholder={"Please Enter the Patient ID"}
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
		fb.updatePatientId(this.props.user.id, this.state.text, isValidPatientPromise)
	}
}

const styles = EStyleSheet.create({
	container: {
		backgroundColor: '$colors.lightGray'
	},
	header: {
        backgroundColor: '$colors.main',
    },
    header_text: {
        color: '$colors.lightGray',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: "$fonts.family",
    },
	textInput: {
		height: 40,
		borderColor: '$colors.lightGray',
		borderWidth: 1
	}
});
