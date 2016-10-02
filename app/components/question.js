'use strict';

import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ViewPagerAndroid, View, Text, Image, Slider } from 'react-native';

let styles = require("./styles")

export default class TabBar extends Component {

    constructor(props) {
        super(props);

    }

    _renderChildren(elements) {
        var self = this
        if (elements == null) {
            return <View/>
        } else {
            if(elements.constructor === Array){
                return elements.map(function(element, fieldIndex) {
                    return React.cloneElement(element, {
                        children: self._renderChildren(element.props.children)
                    })
                })
            } else {
                return React.cloneElement(elements, {
                    children: self._renderChildren(elements.props.children)
                })
            }

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.question}> { this.props.text } </Text>
                { this._renderChildren(this.props.children) }
            </View>
        );
    }
}

AppRegistry.registerComponent('TabBar', () => TabBar);
