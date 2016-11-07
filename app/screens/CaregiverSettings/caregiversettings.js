import React, {Component} from 'react';
import {View, StyleSheet,Text, Image, Alert} from 'react-native';
import SettingsList from 'react-native-settings-list';

let login   = require('../Login/home').default
var firebaseHelper = require( './firebaseHelper').default;

var styles = StyleSheet.create({
  imageStyle:{

  },
  titleInfoStyle:{

  },
});

export default class caregiversettings extends Component {
  constructor(){
  super();
  this.onValueChange = this.onValueChange.bind(this);
  this.state = {switchValue: false};
  // firebaseHelper.isValidPatientId(1);
  fb = new firebaseHelper();
  fb.isValidPatientId(1);
  fb.getCaregiverPromise('sD2AEvyjW9S2xuOY1yWPf7XkqUU2').then(function(caregiver){
    console.log(caregiver + "***************************************************");
    setState({patientId: caregiver});
  });
  }


  render() {
    var bgColor = '#DCE3F4';
    return (
      <View style={{backgroundColor:'#EFEFF4',flex:1}}>
        <View style={{borderBottomWidth:1, backgroundColor:'#00BCD4',borderColor:'#c8c7cc'}}>
          <Text style={{alignSelf:'center',marginTop:30,marginBottom:20,fontWeight:'bold',fontSize:16, color: 'white'}}>Caregiver Settings</Text>
        </View>
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              title='Profile Information'
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Alert.alert('Route to Profile Information Page')}
            />
            <SettingsList.Item
              title='Patient Info'
              titleInfo={this.state.patientId}
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Alert.alert('Route to change PatientID')}
            />
            <SettingsList.Item
              hasSwitch={true}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              hasNavArrow={false}
              title='Notifications'
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              title='General'
              onPress={() => Alert.alert('Route To General Page')}
            />
            <SettingsList.Item
              title='Display'
              onPress={() => Alert.alert('Route To Display Page')}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              title='Logout'
              onPress={() => this.onLogout()}
            />
          </SettingsList>
        </View>
      </View>
    );
  }
  onValueChange(value){
    this.setState({switchValue: value});
  }

  onLogout(){
    this.props.navigator.push({
      component:login
    })
  }
}
