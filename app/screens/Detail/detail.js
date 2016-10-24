'use strict';

import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        RecyclerViewBackedScrollView,
        Text,
        Image,
        View, } from 'react-native';

var { backIcon, whiteGradient } = require('../../config/images')
var Header = require('../../components/header').default

export default class PatientDetailView  extends Component {

    constructor() {
        super();
    }

    onBack() {
        this.props.navigator.pop()
    }

    render() {
        return (
            <View>
                <Header text={"Detail"}/>
                <View noSpacer={false} noScroll={false} style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>

                    <Image style={{height: 175, width: 175, borderRadius: 85, marginTop: 25}} source={whiteGradient}/>
                    <Text> {this.props.status} </Text>
                    <Text style={{fontSize: 24}}> {this.props.patient.name} </Text>
                    <Text style={{marginTop: 10}}> {this.props.patient.phone} </Text>

                </View>
                <View style={{ marginTop: 5, flex: 0, height: StyleSheet.hairlineWidth, backgroundColor: '#8E8E8E'}}/>
                <TouchableHighlight
                    onPress={()=>this.onBack()}
                    style={{position: 'absolute', width: 20, height: 20, top: 25, left: 15, backgroundColor: 'transparent'}}
                    underlayColor={'#f8f8f8'}>
                    <Image source={backIcon}/>
                </TouchableHighlight>
            </View>
        );
    }
}

var styles = StyleSheet.create({
});
