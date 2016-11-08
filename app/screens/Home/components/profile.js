'use strict';

import React, { Component } from 'react';
import {
        Image,
        ListView,
        StyleSheet,
        Text,
        TouchableHighlight,
        View,
    } from 'react-native';

import Header from '../../../components/header'

export default class Profile extends Component {

    constructor() {
        super();
    }

    render() {
        return (
        <View style={{ backgroundColor: '#f7f7f7', flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Header text={"Profile"}/>
        </View>
        );
    }
}
