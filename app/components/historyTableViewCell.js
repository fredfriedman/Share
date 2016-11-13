import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
    View
    } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';

export default class HistoryTableViewCell extends Component {
    constructor(props){
        super(props)
        console.log(props)
    }

    parseDate(date) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"]
        return months[date.getMonth()] + " " + date.getDate()
    }

    statusToColor(status) {
        if(status > 70) {
            return {backgroundColor: '#e50000'}
        } else if (status > 40) {
            return {backgroundColor: '#FFC107'}
        } else {
            return {backgroundColor: '#228B22'}
        }
    }

    renderCompositeScore() {
        var score = 0
        for ( var key in  this.props.assessment.results) {
            if ( key != "distress") {
                score += this.props.assessment.results[key]["level"]
            }
        }
        return (
            <View style={{marginLeft: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View style={[styles.statusBar, this.statusToColor(score)]}/>
                <Text>{score}</Text>
            </View>
        )
    }

    renderDistressIndicator() {

        const alertIcon = (<Icon name="ios-warning-outline" ios="ios-warning-outline" md="md-warning-outline" size={20} color="#e50000"/>);

        return ( this.props.assessment && this.props.assessment.results.distress > 6 ?
            null
            :
            alertIcon
        )
    }

    render() {
        return (
            <TouchableHighlight style={styles.row} onPress={() => { this.props.onPress() }} underlayColor={'#F8F8F8'}>
                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    { this.renderCompositeScore() }
                    { this.renderDistressIndicator() }
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = EStyleSheet.create({
    row: {
        height: 30,
        flex: 1,
        backgroundColor: 'transparent',
    },
    stack: {
        flexDirection: 'column',
        paddingLeft: 20,
        flexWrap: 'wrap'
    },
    statusBar: {
        width: 4,
        height: 28,
        borderRadius: 5,
    },
});
