import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
    View
    } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class PatientTableViewCell extends Component {
    constructor(props) {
        super(props);
    }

    statusToColor(status) {
        if(status > 70) {
            return '#e50000'
        } else if (status > 40) {
            return '#FFC107'
        } else {
            return '#228B22'
        }
    }

    render() {

        return (
            <TouchableHighlight style={styles.row} onPress={() => { this.props.onPress() }} underlayColor={'#F8F8F8'}>
                <View style={{flexDirection:'row', alignItems: 'center'}}>
                    <View style={[styles.statusBar, { backgroundColor: this.statusToColor(this.props.status)}]}/>
                    <View style={styles.stack}>
                        <Text style={styles.text}>{this.props.mainText}</Text>
                        <Text style={styles.caregiverText}>Primary Caregiver: Marge Simpson </Text>
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
        height: '$dimensions.rowHeight',
    },
    row: {
        height: '$dimensions.rowHeight',
        backgroundColor: 'white',
    },
    text: {
        fontSize: '$fonts.size',
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family'
    },
    caregiverText: {
        fontSize: 11,
        fontWeight: '300',
        fontFamily: '$fonts.family'
    },
    callIcon: {
    }
});
