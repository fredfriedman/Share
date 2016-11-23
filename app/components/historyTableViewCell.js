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
    }

    parseDate(date) {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"]
        return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
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

    renderCompositeScore() {
        return (
            <View style={{marginLeft: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View style={[styles.statusBar, {backgroundColor: this.statusToColor(this.props.assessment.agg)}]}/>
                <View style={styles.stack}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.text, {paddingRight: 10}]}>{this.props.assessment.agg}</Text>
                        { this.renderDistressIndicator() }
                    </View>
                    <Text style={styles.subText}>{this.parseDate(new Date(this.props.assessment.timestamp))}</Text>
                </View>
            </View>
        )
    }

    renderDistressIndicator() {

        const alertIcon = (<Icon name="ios-warning-outline" ios="ios-warning-outline" md="md-warning-outline" size={15} color="#e50000"/>);

        return ( this.props.assessment && parseInt(this.props.assessment.distress) > 6 ?
            alertIcon
            :
            null
        )
    }

    render() {
        const disclosureIcon = (<Icon name="ios-arrow-forward" style={{marginRight: 10}} size={20} color="#212121" />);

        return (
            <TouchableHighlight
                style={styles.row}
                onPress={() => { this.props.onPress() }}
                underlayColor={'#F8F8F8'}>
                <View style={styles.rowWrapper}>
                    { this.renderCompositeScore() }
                    <View style={{flex: 1, paddingLeft: 10}}>
                        <Text style={styles.text}>{this.props.assessment.comments}</Text>
                    </View>
                    { disclosureIcon }
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = EStyleSheet.create({
    $rowHeight: 50,

    commentsBox: {
        flex: 1,
        paddingLeft: 10
    },
    row: {
        height: '$rowHeight',
        flex: 1,
        backgroundColor: 'transparent',
    },
    rowWrapper: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    stack: {
        width: 125,
        paddingLeft: 10,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    statusBar: {
        width: 4,
        height: '-2 + $rowHeight',
        borderRadius: 5,
    },
    text: {
        color: '$colors.darkGray',
        fontSize: '$fonts.size',
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
    },
    separator: {
        flex: 1,
        height: '$dimensions.hairlineWidth',
        marginLeft : 20,
        backgroundColor: '#d7d7d7',
    },
    subText: {
        color: '$colors.mediumGray',
        fontSize: 12,
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
    }
});
