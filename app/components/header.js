import React, { Component } from 'react';
import { Image, Text, TouchableHighlight, StyleSheet, View } from 'react-native';
import Dimensions from 'Dimensions';

export default class header extends Component {

    renderTopLeftAction() {
        if (this.props.leftAction == null) {
            return null
        }
        return (
            <TouchableHighlight
                onPress={this.props.leftAction}
                style={{position: 'absolute', width: 20, height: 20, top: 27, left: 15, backgroundColor: 'transparent'}}
                underlayColor={'transparent'}>
                <Image style={{height: 20, width: 20}} source={this.props.leftIcon}/>
            </TouchableHighlight>
        )
    }

    renderTopRightAction() {
        if (this.props.rightAction == null) {
            return null
        }
        return (
            <TouchableHighlight
                onPress={this.props.rightAction}
                style={{position: 'absolute', width: 20, height: 20, top: 27, right: 15, backgroundColor: 'transparent'}}
                underlayColor={'transparent'}>
                <Image style={{height: 20, width: 20}} source={this.props.rightIcon}/>
            </TouchableHighlight>
        )
    }

    render(){
        return (
            <View
                style={this.props.headerStyle || styles.header}>
                <View style={styles.header_item}>
                    <Text style={styles.header_text}>{this.props.text}</Text>
                </View>
                {this.renderTopLeftAction()}
                {this.renderTopRightAction()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    height: 60,
    backgroundColor: '#00BCD4',
    borderColor: '#AAAAAA',
    borderBottomWidth: 0.5,
  },
  header_item: {
    paddingLeft: 10,
    paddingRight: 10
  },
  header_text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 25,
  }
});
