'use strict';
import React, { Component } from 'react';
import { AppRegistry , View, Image, TouchableHighlight, Text} from 'react-native';
var {xIcon} = require("../config/images")

export default class button extends Component {

  render(){
    return (
        <TouchableHighlight
            onPress={this.props.action}
            style={{position: 'absolute', width: 20, height: 20, top: 25, left: 15, backgroundColor: 'transparent'}}
            underlayColor={'transparent'}>
            <Image style={{height: 20, width: 20}} source={this.props.icon}/>
        </TouchableHighlight>
    );
  }
}

AppRegistry.registerComponent('button', () => button);
