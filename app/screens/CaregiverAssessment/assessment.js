import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        Text,
        Image,
        View, } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Button from 'react-native-button'

var { backIcon, whiteGradient } = require('../../config/images')
var Header = require('../../components/header').default
var Log = require('../DailyLog/log').default



export default class Assessment extends Component {

    constructor() {
        super();
    }

    onBack() {
        this.props.navigator.pop()
    }

    render() {
        return (
        <View style={{ backgroundColor: '#E9E9E9', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <Header text={"Assessment"}/>
            
            <TouchableHighlight
                onPress={()=>this.onBack()}
                style={{position: 'absolute', width: 20, height: 20, top: 25, left: 15, backgroundColor: 'transparent'}}
                underlayColor={'#f8f8f8f'}>
                <Image source={backIcon}/>
            </TouchableHighlight>

            <Log/>

    	</View>
        );
    }
}

