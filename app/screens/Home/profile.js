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
