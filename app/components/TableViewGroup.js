'use strict';

import React, { Component } from 'react';
import { TouchableHighlight, ListView, StyleSheet, Text, View } from 'react-native';

export default class TableViewGroup extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={this.props.style}>
                <TouchableHighlight
                    style={this.props.headerStyle}
                    onPress={this.props.onPress}>
                    <Text style={this.props.textStyle}> {this.props.title} </Text>
                </TouchableHighlight>
                <ListView
                    dataSource={this.props.dataSource}
                    renderRow={this.props.renderRow}
                    scrollEnabled={false}
                />
            </View>
        )
    }
}
