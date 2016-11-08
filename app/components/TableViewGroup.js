'use strict';

import React, { Component } from 'react';
import { TouchableHighlight, ListView, Text, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class TableViewGroup extends Component {

    constructor() {
        super();

        this.state = {
            name: 'default'
        }
    }

    componentDidMount() {
        this.setState({name: this.props.title})
    }

    render() {

        return (
            <View style={this.props.style}>
                {this.renderHeader()}
                <SwipeListView
                    dataSource={this.props.dataSource}
                    renderRow={this.props.renderRow}
                    scrollEnabled={this.props.scrollEnabled ? this.props.scrollEnabled : false }
                    renderHiddenRow={ (data, secId, rowId) => this.renderHiddenRow(data, secId, rowId)}
                    rightOpenValue={-75}
                    disableRightSwipe={this.props.disableRightSwipe || true}
                    disableLeftSwipe={this.props.disableLeftSwipe || false}/>
            </View>
        )
    }

    renderHiddenRow(data, secId, rowId) {
        return ( this.props.disableHiddenRow != null && this.props.disableHiddenRow ?
            null
            :
            <View style={styles.hiddenRow}>
                <TouchableHighlight
                    style={styles.underlayButton}
                    onPress={() => { this.props.onPressArchive(this.state.name, data, secId, rowId) }}
                    underlayColor={'#0097A7'}>
                    <Text style={styles.text}>Archive</Text>
                </TouchableHighlight>
            </View>
        )
    }

    renderHeader() {
        const disclosureIcon = (<Icon name="ios-arrow-forward" style={{marginRight: 10}} size={20} color="#212121" />);

        if (this.props.headerIsEnabled || this.props.headerStyle) {
            return ( this.props.disableHeaderButton != null && this.props.disableHeaderButton ?
                    <View style={[this.props.headerStyle, {flexDirection: 'row'}]}>
                        <Text style={this.props.textStyle}> {this.props.title} </Text>
                    </View>
                    :
                    <TouchableHighlight
                        style={this.props.headerStyle}
                        onPress={this.props.onPress}
                        underlayColor={'#B0BEC5'}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={this.props.textStyle}> {this.props.title} </Text>
                            <View style={{flex: 1}} />
                            { disclosureIcon }
                        </View>
                    </TouchableHighlight>
            )
        } else {
            return ( null )
        }
    }
}

const styles = EStyleSheet.create({
    hiddenRow: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '$colors.main',
        height: '$dimensions.rowHeight'
    },
    underlayButton: {
        height: '$dimensions.rowHeight',
        width: 60,
        backgroundColor: '$colors.lightGray',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '$colors.status',
        fontSize: '$fonts.size',
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',

    }
});
