'use strict';
import React, { Component } from 'react';
import { AppRegistry , View ,TouchableHighlight, Text, } from 'react-native';


export default class button extends Component {

  render(){
    return (
      <View>
        <TouchableHighlight
            ref='button'
            disabled={this.props.disabled || false}
            underlayColor={this.props.underlayColor ||'transparent'}
            onPress={this.props.onpress}
            style={this.props.button_styles}>
          <View>
              <Text style={this.props.button_text_styles}>{this.props.text}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

AppRegistry.registerComponent('button', () => button);
