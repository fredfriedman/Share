import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
    View
    } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class PatientTableViewCell extends Component {

    constructor() {
        super();
    }

    statusToColor(status) {
        if(status > 90) {
            return '#B71C1C'
        } else if (status > 80) {
            return '#C62828'
        } else if (status > 70) {
            return '#D32F2F'
        } else if (status > 60) {
            return '#EF6C00'
        } else if (status > 50) {
            return '#FF9800'
        } else if (status > 40) {
            return '#FFCA28'
        } else if (status > 30) {
            return '#FDD835'
        } else if (status > 20) {
            return '#7CB342'
        } else if (status > 10) {
            return '#4CAF50'
        } else {
            return '#388E3C'
        }
    }

    render() {
        return (
            <TouchableHighlight style={styles.row} onPress={() => { this.props.onPress() }} underlayColor={'#F8F8F8'}>
                <View style={[styles.row, {justifyContent: 'space-between'}]}>
                    <View style={[styles.statusBar, { backgroundColor: this.statusToColor(this.props.status)}]}/>
                    <View style={styles.stack}>
                        <Text style={styles.text}>{this.props.mainText}</Text>
                        <Text style={styles.caregiverText}>Primary Caregiver: {this.props.subText}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                    <TouchableHighlight
                        onPress={() => { this.props.onPressIcon() }}
                        style={styles.callIcon}
                        underlayColor={'transparent'}>
                        {this.props.actionIcon}
                    </TouchableHighlight>
                    <View style={{width: 10}}/>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = EStyleSheet.create({
    stack: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 2.5,
    },
    statusBar: {
        backgroundColor: 'red',
        width: 6,
        marginLeft: 2.5,
        borderRadius: 5,
        height: '0.75 * $dimensions.rowHeight',
    },
    row: {
        flex: 1,
        height: '$dimensions.rowHeight',
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        color: '$colors.darkGray',
        fontSize: '$fonts.size',
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family'
    },
    caregiverText: {
        color: '$colors.mediumGray',
        fontSize: 10,
        fontWeight: '300',
        fontFamily: '$fonts.family'
    },
    callIcon: {
    }
});
