import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,

    View
    } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

export default class ModalCallCell extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.row}>
                <View style={styles.stack}>
                    <Text style={styles.text}>{this.props.caregiver.name}</Text>
                    <Text style={styles.subText}>{this.props.caregiver.relation}</Text>
                </View>
                <View style={{flex: 1}}/>
                <TouchableHighlight
                    style={styles.callButton}
                    onPress={() => { this.props.onPress() }}
                    underlayColor={'#F8F8F8'}>
                    <Text style={styles.callText}> Call </Text>
                </TouchableHighlight>
            </View>

        )
    }
}

const styles = EStyleSheet.create({
    callButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        backgroundColor: 'gray',
        borderLeftWidth: 1
    },
    callText: {
        fontSize: '$fonts.size',
        fontWeight: 'bold',
        fontFamily: '$fonts.family',
    },
    row: {
        height: 50,
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    stack: {
        paddingTop: 10,
        flexDirection: 'column',
    },
    subText: {
        paddingTop: 2,
        fontSize: 11,
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
    },
    text: {
        fontSize: '$fonts.size',
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
    },
});
