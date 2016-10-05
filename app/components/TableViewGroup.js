'use strict';

import React, { Component } from 'react';
import { TouchableHighlight, ListView, StyleSheet, Text, View, Image } from 'react-native';

var { disclosureIcon } = require('../config/images')

export default class TableViewGroup extends Component {
    constructor() {
        super();
    }

    render() {

        return (
            <View style={this.props.style}>
                {this.renderHeader()}
                <ListView
                    dataSource={this.props.dataSource}
                    renderRow={this.props.renderRow}
                    scrollEnabled={this.props.scrollEnabled ? this.props.scrollEnabled : false }
                />
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
                        <Image style={{height: 10, width: 10, marginTop: 4, marginRight: 10}} source={disclosureIcon}/>
                    </View>
                </TouchableHighlight>
            )
        } else {
            return ( <View style={{height: 0}}/> )
        }
    }
}
