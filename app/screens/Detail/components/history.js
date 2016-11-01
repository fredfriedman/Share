'use strict';
import React, { Component } from 'react';
import {
        StyleSheet,
        Text,
        View
    } from 'react-native';

export default class History extends Component {

    constructor() {
        super();

    }

    render(){

        return (
            <View style={this.props.containerStyle}>
                <Text style={this.props.labelStyle}> Recent History </Text>

            </View>
        );
    }
}

var styles = StyleSheet.create({

})
