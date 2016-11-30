import React, {Component} from 'react';
import {
	Alert,
	Text,
	View
} from 'react-native';
import firebaseHelper from './firebaseHelper';
import Header from '../../components/header'
import SettingsList from 'react-native-settings-list';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalView from './EditProfileModal'

export default class CaregiverProfile extends Component{

	constructor(){
		super();

		this.state = {
			modalVisible: false,
			modalEditType: "",
		}
	}

	save(type, value) {
		var fb = new firebaseHelper();

		var self = this

		fb.updateCaregiveProfile(this.props.user.id, type, value)
			.then(val => {
				self.setModalVisible(null, false)
			}, function(error) {
			  	Alert.alert('An Error Occurred')
			});
	}

	onBack() {
		this.props.navigator.pop()
	}

	setModalVisible(placeholder) {
        this.setState({modalVisible: !this.state.modalVisible, modalEditType: placeholder});
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
							onPress = {this.setModalVisible.bind(this, "name")}
						/>
						<SettingsList.Item
							title='Caregiver Phone'
						  	titleInfo={this.props.user.Profile.phone}
						  	titleInfoStyle={styles.titleInfoStyle}
						  	onPress = {this.setModalVisible.bind(this, "phone")}
						/>
						<SettingsList.Item
							title='Relation'
						  	titleInfo={this.props.user.Profile.relation}
						  	titleInfoStyle={styles.titleInfoStyle}
						  	onPress = {this.setModalVisible.bind(this, "relation")}
						/>
					</SettingsList>
				</View>
				<ModalView
                    modalVisible={this.state.modalVisible}
					saveInfo={this.save.bind(this, this.state.modalEditType)}
                    closeModal={this.setModalVisible.bind(this, null)}
					placeholder={this.state.modalEditType}/>
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
