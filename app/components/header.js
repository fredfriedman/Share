import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text } from 'react-native';

export default class header extends Component {

  render(){
    return (
      <View style={styles.header}>
        <View style={styles.header_item}>
          <Text style={styles.header_text}>{this.props.text}</Text>
        </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    height: 60,
    backgroundColor: '#3498DB',
    borderColor: '#AAAAAA',
    borderBottomWidth: 0.5,
  },
  header_item: {
    paddingLeft: 10,
    paddingRight: 10
  },
  header_text: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 25,
  }
});

AppRegistry.registerComponent('header', () => header);
