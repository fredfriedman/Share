import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
    View
    } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';

export default class HistoryTableViewCell extends Component {
    constructor(){
        super()
    }

    parseDate(date) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"]
        return months[date.getMonth()] + " " + date.getDate()
    }

    renderCompositeScore() {
        var score = 0
        for ( var key in  this.props.assessment.results) {
            if ( key != "distress") {
                score += this.props.assessment.results[key]["level"]
            }
        }
        return (
            <View style={styles.stack}>
                <Text>Composite</Text>
                <Text>{score}</Text>
            </View>
        )
    }

    renderDistressIndicator() {

        const alertIcon = (<Icon name="ios-warning-outline" ios="ios-warning-outline" md="md-warning-outline" size={20} color="#e50000"/>);

        return ( this.props.assessment.results.distress > 6 ?
            null
            :
            alertIcon
        )
    }

    render() {
        return (
            <TouchableHighlight style={styles.container} onPress={() => { this.props.onPress() }} underlayColor={'#F8F8F8'}>
                <View style={styles.row}>
                    { this.renderCompositeScore() }
                    { this.renderDistressIndicator() }
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        height: '$dimensions.rowHeight',
        backgroundColor: 'transparent',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    stack: {
        flexDirection: 'column',
        paddingLeft: 10,
        flexWrap: 'wrap'
    },
    statusBar: {
        backgroundColor: 'red',
        width: 6,
        height: '$dimensions.rowHeight',
    },
});
