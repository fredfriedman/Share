import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import firebaseHelper from './firebaseHelper';

import Header from '../../components/header';

export default class caregiversettings extends Component {
  constructor(props){
    super(props);
    var fb = new firebaseHelper();
    console.log(fb.updatePatientID('sD2AEvyjW9S2xuOY1yWPf7XkqUU2',3));
  }

  render(){
    return(
      <View>
          <Header text = {'Caregiver Settings'}/>
      </View>
    );
  }
}
