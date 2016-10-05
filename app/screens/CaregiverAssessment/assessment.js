import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        Text,
        Image,
        View, } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Button from 'react-native-button'

var Header = require('../../components/header').default



export default class Assessment extends Component {

    constructor() {
        super();
    }

    render() {
        return (
        <View style={{ backgroundColor: '#E9E9E9', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <Header text={"Assessment"}/>

    	</View>
        );
    }
}

