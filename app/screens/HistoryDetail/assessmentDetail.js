'use strict';
import React, { Component } from 'react';
import {
        ListView,
        Text,
        View
    } from 'react-native';

// Assets
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../../components/header'
import EStyleSheet from 'react-native-extended-stylesheet';
import TableViewGroup from '../../components/TableViewGroup'
import { Col, Row, Grid } from "react-native-easy-grid";

export default class History extends Component {

    constructor() {
        super();

        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
        }
    }


    componentWillMount() {
        var items = []
        var self = this
        Object.keys(this.props.assessment.results).forEach(function(key) {
            items.push([key, self.props.assessment.results[key]])
        });
        items.pop()
        this.setState({dataSource: this.state.dataSource.cloneWithRows(items)})
    }

    parseDate(date) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"]
        return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    }

    onBack() {
        this.props.navigator.pop()
    }

    render(){

        const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" size={30} color="#262626" />);

        return (
            <View style={styles.container}>
                <Header text={""}
                    headerStyle={styles.header}
                    textStyle={styles.text}
                    leftAction={this.onBack.bind(this)} l
                    leftIcon={backIcon}/>
                <View style={[styles.box, {height: 40, alignItems: 'center', justifyContent: 'center'}]}>
                    <Text style={styles.dateText}>{this.parseDate(new Date(this.props.assessment.timestamp))}</Text>
                </View>
                <TableViewGroup
                    title={"Assessment Results"}
                    headerIsEnabled={true}
                    onPress={() => console.log()}
                    onPressArchive={() => console.log()}
                    style={[styles.box, {marginTop: 20}]}
                    textStyle={[styles.text, styles.tableLabelText]}
                    headerStyle={styles.tableViewHeader}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    disableLeftSwipe={true}
                    disableHeaderButton={true}
                    disableHiddenRow={true} />
                <View style={[styles.box, {height: 40, alignItems: 'center', justifyContent: 'center'}]}>
                    <Text style={styles.text}>Caregiver Distress</Text>
                    <Text style={styles.text}>{this.props.assessment.results.distress}</Text>

                </View>

            </View>
        );
    }

    renderRow(result: Object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        return (
            <View style={styles.row}>
                <Grid>
                    <Col>
                        <Text style={[styles.text, styles.typeText]}>{result[0]}</Text>
                    </Col>
                    <Col>
                        <Text style={[styles.text,styles.levelText]}>Level</Text>
                        <Text style={[styles.text,styles.levelText]}>{result[1].level}</Text>
                    </Col>
                    <Col>
                        <Text style={[styles.text,styles.changesText]}>Changes</Text>
                        <Text style={[styles.text,styles.changesText]}>{result[1].changes}</Text>
                    </Col>
                    <Col>
                        {result[1].level > 7 ? <View style={[styles.status,{backgroundColor: 'red'}]}/> : <View style={[styles.status,{backgroundColor: 'green'}]}/>}
                    </Col>
                </Grid>
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    box: {
        backgroundColor: 'white',
        width: '$dimensions.screenWidth - 40',
        alignSelf: 'center',
        marginTop: 25,
        shadowColor: "$colors.darkGray",
        shadowOpacity: 0.8,
        shadowRadius: 4,
        shadowOffset: {
            height: 2,
            width: 0
        },
        elevation: 20,
    },
    cell: {
        height: '$dimensions.rowHeight',
        width: '$dimensions.screenWidth',
        backgroundColor: 'white',

    },
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    header: {
        backgroundColor: "$colors.main"
    },
    tableViewHeader: {
        backgroundColor: "$colors.lightGray"
    },
    listViewContainer: {

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '$dimensions.rowHeight',
        backgroundColor: 'white',
    },
    stack: {
        flexDirection: 'column',
        paddingLeft: 10,
        flexWrap: 'wrap'
    },
    separator: {
        flex: 1,
        height: '$dimensions.hairlineWidth',
        backgroundColor: '$colors.mediumGray',
    },
    status: {
        backgroundColor: 'red',
        height: 10,
        width: 10,
        borderRadius: 5
    },
    text: {
        color: '$colors.darkGray',
        fontSize: 16,
        fontWeight: "$fonts.weight",
        fontFamily: "$fonts.family",
    },
    tableLabelText: {
        fontWeight: "bold",
    },
    typeText: {
        fontSize: 16,
        color: '$colors.darkGray',
        paddingLeft: 2.5
    },
    levelText: {
        fontSize: 14,
        color: '$colors.darkGray',
    },
    changesText: {
        fontSize: 14,
        color: '$colors.darkGray',
    },
    dateText: {
        color: '$colors.status',
        fontSize: 32,
        fontWeight: "$fonts.weight",
        fontFamily: "$fonts.family",
    },
})
