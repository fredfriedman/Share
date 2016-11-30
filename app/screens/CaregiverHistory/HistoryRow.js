import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
    View
 } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from 'react-native-vector-icons/Ionicons';

export default class HistoryRow extends Component {

    constructor(){
        super()
    }

    parseDate(date) {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    }

    render() {
        const checkmark = <Icon name="md-checkmark" size={30} color="#262626" />
        const x = <Icon name="md-close" size={30} color="#262626" />
        const disclosureIcon = (<Icon name="ios-arrow-forward" style={{marginRight: 10}} size={20} color="#212121" />);

        return (
            <TouchableHighlight
                onPress={() => { this.props.onPressHistoryCell(this.props.assessment) }}
                underlayColor={'#0097A7'}>
                <View style={styles.row}>
                    <View style={{flexDirection: "row"}}>
                        <View style={{width: 25}}>
                            {this.props.assessment.completed ? checkmark : x}
                        </View>
                        <View style={styles.stack}>
                            <Text style={styles.text}>Score: {this.props.assessment.agg}</Text>
                            <Text style={styles.subText}>{this.parseDate(new Date(this.props.assessment.timestamp))}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, paddingLeft: 10}}>
                        <Text style={styles.text}>{this.props.assessment.comments}</Text>
                    </View>
                    { disclosureIcon }
                </View>
            </TouchableHighlight>
        )
    }
}
const styles = EStyleSheet.create({
    text: {
        color: '$colors.darkGray',
        fontSize: '$fonts.size',
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
    },
    row: {
        alignItems: 'center',
        marginLeft: 10,
        flexDirection: "row",
        height: 60,
        justifyContent: 'space-between'
    },
    separator: {
        flex: 1,
        height: '$dimensions.hairlineWidth',
        marginLeft : 20,
        backgroundColor: '#d7d7d7',
    },
    stack: {
        width: 115,
        paddingLeft: 10,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    subText: {
        color: '$colors.mediumGray',
        fontSize: 11,
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
    }
});
