'use strict';

import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        RecyclerViewBackedScrollView,
        Text,
        Image,
        View, } from 'react-native';

var Header = require('../../components/header').default

export default class Calendar extends Component {

    constructor() {
        super();
    }

    render() {
        return (
        <View style={{ backgroundColor: '#E9E9E9', flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Header text={"Calendar"}/>

        </View>
        );
    }
}
