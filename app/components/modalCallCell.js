import React, { Component } from 'react';
import { Image, View, StyleSheet, TouchableHighlight, Text } from 'react-native';

export default class ModalCallCell extends Component {
    constructor(props) {
        super(props);
        console.log(props)
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
                    style={{paddingTop: 6, alignItems: 'center', width: 70, backgroundColor: 'gray', borderLeftWidth: 1}}
                    onPress={() => { this.props.onPress() }}
                    underlayColor={'#F8F8F8'}>
                    <Text style={styles.callText}> Call </Text>
                </TouchableHighlight>
            </View>

        )
    }
}

var styles = StyleSheet.create({
    row: {
        height: 50,
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    stack: {
        paddingTop: 10,
        flexDirection: 'column',
    },
    text: {
        fontSize: 14,
        fontWeight: '100',
    },
    subText: {
        paddingTop: 2,
        paddingLeft: 2.5,
        fontSize: 11,
        fontWeight: '100',
    },
    callText: {
        paddingTop: 10,
        paddingLeft: 2.5,
        fontSize: 14,
        fontWeight: 'bold',
    },
    icon: {
        //position: 'absolute',
        width: 25,
        height: 25,
        marginTop: 5,
        marginRight: 10,
    },
    actionIcon: {
        marginTop: 7,
    }
});
