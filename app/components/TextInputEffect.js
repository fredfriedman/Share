'use strict';
import React, { Component } from 'react';
import { Hoshi } from 'react-native-textinput-effects';

let styles   = require('./styles')

export default class TextInputEffect extends Component {

  render(){
    return (
        <Hoshi
            ref={this.props.ref || 'input' }
            label={this.props.label || 'label'}
            labelStyle={this.props.labelStyle || {color: '#00BCD4'}}
            inputStyle={this.props.inputStyle || [styles.textInput, {color: '#00BCD4', fontSize: 16}]}
            style={this.props.style || {width: 50, paddingTop: 20}}
            borderColor={this.props.borderColor || '#00BCD4'}
            backgroundColor={this.props.backgroundColor || 'transparent'}
            autoCapitalize={this.props.autoCorrect || 'none'}
            autoCorrect={this.props.autoCorrect || false}
            secureTextEntry={this.props.secureTextEntry || false}
            value={this.props.value || ''}
            onChangeText={this.props.onChangeText}
            onSubmitEditing={this.props.onSubmitEditing}/>
    );
  }
}
