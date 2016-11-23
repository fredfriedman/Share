'use strict';
import React, { Component } from 'react';
import {
        ListView,
        ScrollView,
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

    statusToColor(status) {
        if(status == 10) {
            return '#B71C1C'
        } else if (status == 9) {
            return '#C62828'
        } else if (status == 8) {
            return '#D32F2F'
        } else if (status == 7) {
            return '#EF6C00'
        } else if (status == 6) {
            return '#FF9800'
        } else if (status== 5) {
            return '#FFCA28'
        } else if (status == 4) {
            return '#FDD835'
        } else if (status == 3) {
            return '#7CB342'
        } else if (status == 2) {
            return '#4CAF50'
        } else {
            return '#388E3C'
        }
    }

    componentWillMount() {
        var items = [0]
        var self = this
        Object.keys(this.props.assessment.results).forEach(function(key) {
            if( key != "Caregiver" ) { items.push([key, self.props.assessment.results[key]]) }
        });
        items.push(0)
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

        const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" size={30} color="#E7E7E7" />);

        return (
            <View style={styles.container}>
                <Header
                    text={""}
                    headerStyle={styles.header}
                    textStyle={styles.headerText}
                    leftAction={this.onBack.bind(this)} l
                    leftIcon={backIcon}/>
                <ScrollView>
                    <View style={[styles.box, {height: 40, alignItems: 'center', justifyContent: 'center'}]}>
                        <Text style={styles.dateText}>{this.parseDate(new Date(this.props.assessment.timestamp))}</Text>
                    </View>
                    <TableViewGroup
                        onPress={() => console.log()}
                        onPressArchive={() => console.log()}
                        scrollEnabled={false}
                        style={[styles.box, {marginTop: 20}]}
                        textStyle={[styles.text, styles.tableLabelText]}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        renderSeparator={() => <View style={styles.separator}/>}
                        disableLeftSwipe={true}
                        disableHeaderButton={true}
                        disableHiddenRow={true} />
                    <View style={[styles.box, {height: 40, alignItems: 'center', justifyContent: 'center'}]}>
                        <Text style={[styles.text, styles.labelText, {alignSelf: 'flex-start', marginLeft: 5}]}>Comments: </Text>
                        <Text style={[styles.text, styles.typeText]}>{this.props.assessment.comments}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }

    renderRow(result: Object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        if (rowID == 0) {
            return (
                <View style={[styles.row, {height: 20, backgroundColor: '#f7f7f7'}]}>
                    <Grid>
                        <Col style={styles.col}>
                            <Text style={[styles.text, styles.labelText]}>Symptom</Text>
                        </Col>
                        <Col style={styles.col}>
                            <Text style={[styles.text,styles.labelText]}>Level</Text>
                        </Col>
                        <Col style={styles.col}>
                            <Text style={[styles.text,styles.labelText]}>Changes</Text>
                        </Col>
                        <Col style={styles.col}>
                            <Text style={[styles.text,styles.labelText]}>Status</Text>
                        </Col>
                    </Grid>
                </View>
            )
        } else if (rowID == this.state.dataSource.getRowCount() - 1) {
            return (
                <View style={[styles.row, {justifyContent: 'flex-start', marginLeft: 10}]}>
                    <Text style={[styles.text, styles.labelText, {fontWeight: '600', fontSize: 15}]}>Caregiver Distress: {this.props.assessment.results.Caregiver.value}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.row}>
                    <Grid style={{flex: 1}}>
                        <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={[styles.text, styles.typeText]}>{result[0]}</Text>
                        </Col>
                        <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={[styles.text,styles.levelText]}>{result[1].level}</Text>
                        </Col>
                        <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={[styles.text,styles.changesText]}>{result[1].changes}</Text>
                        </Col>
                        <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                            <View style={[styles.status, {backgroundColor: this.statusToColor(result[1].level)}]}/>
                        </Col>
                    </Grid>
                </View>
            )
        }
    }
}

const styles = EStyleSheet.create({
    box: {
        backgroundColor: 'white',
        width: '$dimensions.screenWidth - 40',
        alignSelf: 'center',
        shadowColor: "$colors.darkGray",
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowOffset: {
            height: 0.5,
            width: 0
        },
        elevation: 10,
        marginTop: 25,
        marginLeft: 10,
        marginRight: 10
    },
    cell: {
        height: '$dimensions.rowHeight',
        width: '$dimensions.screenWidth',
        backgroundColor: 'white',

    },
    container: {
        backgroundColor: '$colors.lightGray',
        flex: 1
    },
    col: {
        alignItems: 'center',
    },
    header: {
        backgroundColor: "$colors.status"
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
        height: '-10 + $dimensions.rowHeight',
        backgroundColor: 'white',
    },
    stack: {
        flexDirection: 'column',
        paddingLeft: 10,
        flexWrap: 'wrap'
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
        fontSize: 15,
        color: '$colors.darkGray',
        paddingLeft: 2.5
    },
    separator: {
        flex: 1,
        marginLeft: 20,
        height: '$dimensions.hairlineWidth',
        backgroundColor: '$colors.lightGray',
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
    headerText: {
        color: '$colors.darkGray',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: '$fonts.family',
    },
    labelText: {
        fontWeight: 'bold'
    },
})
