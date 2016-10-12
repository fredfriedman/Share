import Firebase from 'firebase';
import React, { Component } from 'react';
import { Image, View, StyleSheet, TouchableHighlight, Text } from 'react-native';

export default class PatientTableViewCell extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <TouchableHighlight style={styles.row} onPress={() => { this.props.onPress() }} underlayColor={'#F8F8F8'}>
                <View style={{flexDirection:'row'}}>
                    <View style={[styles.statusBar, { backgroundColor: this.props.status}]}/>
                    <Image style={styles.thumb} source={this.props.image} />
                    <View style={styles.stack}>
                        <Text style={styles.text}>{this.props.mainText}</Text>
                        <Text style={styles.subTitle}>{this.props.subTitleText}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                    <TouchableHighlight
                        onPress={() => { this.props.onPressIcon() }}
                        style={styles.actionIcon}
                        underlayColor={'transparent'}>
                        <Image style={styles.icon} source={this.props.actionIcon} />
                    </TouchableHighlight>
                </View>
            </TouchableHighlight>
        )
    }
}

var styles = StyleSheet.create({
    stack: {
        flexDirection: 'column',
    },
    statusBar: {
        backgroundColor: 'red',
        width: 6,
        height: 44,
    },
    row: {
        height: 44,
        backgroundColor: '#F6F6F6',
    },
    thumb: {
        marginTop: 10,
        width: 20,
        height: 25,
        marginLeft: 3,
        marginRight: 10,
        borderRadius: 10,
    },
    text: {
        flex: 0,
        marginTop: 7,
        fontSize: 14,
        fontWeight: '100',
    },
    subTitle: {
        flex: 0,
        paddingTop: 5,
        fontSize: 10,
        fontWeight: '100',
    },
    icon: {
        position: 'absolute',
        width: 25,
        height: 25,
        marginTop: 2,
        marginRight: 10,
    },
    actionIcon: {
        marginTop: 7,
        marginRight: 30
    }
});
