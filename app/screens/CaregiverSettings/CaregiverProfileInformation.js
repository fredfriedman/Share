import React, {Component} from 'react';
import {View,Text} from 'react-native';
import firebaseHelper from './firebaseHelper';
import Header from '../../components/header'
import SettingsList from 'react-native-settings-list';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CaregiverProfile extends Component{

	constructor(){
		super();
	}

	onBack() {
		this.props.navigator.pop()
	}

	render(){
		const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" size={30} color="#f7f7f7" />);

		return(
			<View>
				<Header
					text={"Profile"}
					headerStyle={styles.header}
					textStyle={styles.header_text}
					leftAction={this.onBack.bind(this)}
					leftIcon={backIcon}/>
         		<View style={{backgroundColor:'#EFEFF4',flex:1}}>
					<SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
						<SettingsList.Header headerStyle={{marginTop:15}}/>
						<SettingsList.Item
							title='Caregiver Name'
							titleInfo={this.props.user.Profile.name}
							titleInfoStyle={styles.titleInfoStyle}
							onPress = {()=> alert('Change Name')}
						/>
						<SettingsList.Item
							title='Caregiver Phone'
						  	titleInfo={this.props.user.Profile.phone}
						  	titleInfoStyle={styles.titleInfoStyle}
						  	onPress = {() => alert('Change Contact Information')}
						/>
						<SettingsList.Item
							title='Relation'
						  	titleInfo={this.props.user.Profile.relation}
						  	titleInfoStyle={styles.titleInfoStyle}
						  	onPress = {()=> alert('Change Relation')}
						/>
					</SettingsList>
				</View>
			</View>
		);
	}
}

const styles = EStyleSheet.create({
	header: {
        backgroundColor: '$colors.main',
    },
    header_text: {
        color: '$colors.lightGray',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: "$fonts.family",
    },
});
