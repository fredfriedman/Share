'use strict';
import React, { Component } from 'react';
import {
        ListView,
        Text,
        View
    } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import HistoryCell from '../../../components/historyTableViewCell'
import HistoryDetailPage from '../../HistoryDetail/assessmentDetail'

export default class History extends Component {

    constructor() {
        super();

    }

    onClickHistoryCell(assessment) {
        this.props.navigator.push({
            component: HistoryDetailPage,
            passProps: {
                assessment: assessment
            }
        })
    }

    render(){

        return (
            <View style={this.props.containerStyle}>
                <ListView
                    ref={ref => this.listView = ref}
                    onLayout={event => { this.listViewHeight = event.nativeEvent.layout.height }}
                    dataSource={this.props.assessments}
                    renderHeader={() => <View style={styles.listViewHeader}>
                                            <Text style={styles.label}> History </Text>
                                        </View>}
                    renderRow={(assessment) => <HistoryCell assessment={assessment} onPress={this.onClickHistoryCell.bind(this, assessment)}/>}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}/>
            </View>
        );
    }

    renderRow
}

const styles = EStyleSheet.create({
    separator: {
        flex: 1,
        height: '$dimensions.hairlineWidth',
        backgroundColor: '#d7d7d7',
    },
    label: {
        color: '$colors.darkGray',
        fontSize: 14,
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family'
    },
    listViewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '$colors.mediumGray',
        height: 25
    },
})
