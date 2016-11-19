import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
    View
    } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';

export default class DefaultEmptyTableViewCell extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style={styles.row}>
                <Text>{this.props.text}</Text>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    row: {
        flex: 1,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        color: '$colors.darkGray',
        fontSize: '$fonts.size',
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
    },
});
