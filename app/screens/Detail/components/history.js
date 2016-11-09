'use strict';
import React, { Component } from 'react';
import {
        ListView,
        Navigator,
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
                <Text style={this.props.labelStyle}> Recent History </Text>
                <ListView
                    ref={ref => this.listView = ref}
                    onLayout={event => { this.listViewHeight = event.nativeEvent.layout.height }}
                    dataSource={this.props.assessments}
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
        backgroundColor: '$colors.mediumGray',
    },
})