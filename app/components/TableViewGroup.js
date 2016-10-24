'use strict';

import React, { Component } from 'react';
import { TouchableHighlight, ListView, StyleSheet, Text, View, Image } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

var { disclosureIcon } = require('../config/images')

export default class TableViewGroup extends Component {

    constructor() {
        super();
    }

    render() {

        return (
            <View style={this.props.style}>
                {this.renderHeader()}
                <SwipeListView
                    dataSource={this.props.dataSource}
                    renderRow={this.props.renderRow}
                    scrollEnabled={this.props.scrollEnabled ? this.props.scrollEnabled : false }
                    renderHiddenRow={ patient => this.renderHiddenRow(patient)}
                    rightOpenValue={-75}
                    disableRightSwipe={true}/>
            </View>
        )
    }

    renderHiddenRow(patient) {
        return (
            <View style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: '#FFC107',
                height: 44}}>
                <TouchableHighlight
                    style={{height: 44, width: 60, backgroundColor: '#FFF8E1', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => { this.props.onPressArchive(patient) }}
                    underlayColor={'#FFC107'}>
                    <Text style={{color: '#0097A7', fontFamily: 'Helvetica', fontWeight: '500'}}>Archive</Text>
                </TouchableHighlight>
            </View>
            )
    }

    renderHeader() {
        if (this.props.headerIsEnabled || this.props.headerStyle) {
            return (
                <TouchableHighlight
                    style={this.props.headerStyle}
                    onPress={this.props.onPress}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={this.props.textStyle}> {this.props.title} </Text>
                        <View style={{flex: 1}} />
                        <Image style={{height: 10, width: 10, marginTop: 5, marginRight: 10}} source={disclosureIcon}/>
                    </View>
                </TouchableHighlight>
            )
        } else {
            return ( null )
        }
    }
}
