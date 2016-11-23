'use strict';

import React, { Component } from 'react';
import { TouchableHighlight, ListView, Text, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';
import DefaultEmptyTableViewCell from './defaultEmptyTableViewCell'

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
                <SwipeListView
                    dataSource={this.props.dataSource}
                    renderRow={this.props.renderRow}
                    renderHeader={this.props.headerTitle != null ? this.renderHeader.bind(this) : null}
                    renderFooter={this.props.footerTitle != null ? this.renderFooter.bind(this) : null}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
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

        return (
                <View style={styles.header}>
                    <Text style={styles.headerText}>{this.props.headerTitle}</Text>
                    <View style={styles.separator} />
                </View>
        )
    }

    renderFooter() {
        return (
                <TouchableHighlight
                    onPress={this.props.onPress}
                    underlayColor={'#B0BEC5'}>
                    <View style={styles.footer}>
                        <View style={styles.separator} />
                        <Text style={styles.buttonText}>{this.props.footerTitle}</Text>
                    </View>
                </TouchableHighlight>
        )
    }
}

const styles = EStyleSheet.create({
    buttonText: {
        color: "#007AFF",
        marginLeft: 10
    },
    header: {
        height: 35,
        paddingTop: 10,
        justifyContent: 'space-between'
    },
    footer: {
        height: 35,
        paddingBottom: 10,
        justifyContent: 'space-between'
    },
    headerText: {
        color: '$colors.darkGray',
        fontWeight: 'bold',
        marginLeft: 10
    },
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
    separator: {
        marginLeft: 10,
        height: '$dimensions.hairlineWidth',
        backgroundColor: '$colors.lightGray',
    },
    text: {
        color: '$colors.status',
        fontSize: '$fonts.size',
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',

    }
});
