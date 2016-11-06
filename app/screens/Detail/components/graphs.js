'use strict';
import React, { Component } from 'react';
import {
        Picker,
        StyleSheet,
        Text,
        View
    } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Chart from 'react-native-chart';
import Header from '../../../components/header'
import EStyleSheet from 'react-native-extended-stylesheet';

const Item = Picker.Item;

export default class Graphs extends Component {

    constructor() {
        super();

        this.state = {
            selected: "Pain",
        }
    }

    onValueChange(value: String){
        this.setState({selected: value})
    }

    renderPicker() {
        return (
            <Picker
                style={styles.picker}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}>
                <Item label="Appetite" value="Appetite" />
                <Item label="Depression" value="Depression" />
                <Item label="Drowsiness" value="Drowsiness" />
                <Item label="Nausea" value="Nausea" />
                <Item label="Pain" value="Pain" />
                <Item label="Shortness of Breath" value="Shortness of Breath" />
                <Item label="Tiredness" value="Tiredness" />
            </Picker>
            )
    }

    render(){

        const mainColor = '#FFC107'
        const fillColor = 'rgba(255, 193, 7, 0.3)'
        const pfllColor ='#ECEFF1'

        return (
            <View style={this.props.containerStyle}>
                <Grid style={styles.grid}>
                    <Row style={styles.row} size={1}>
                        <Col style={styles.column}>
                            <View>
                                <Text style={styles.textMain}>{this.props.data[this.state.selected]["avg"] / 5}</Text>
                                <Text style={styles.textSubtitle}>Avg Score</Text>
                            </View>
                        </Col>
                        <Col style={styles.column}>
                            <View>
                                <Text style={styles.textMain}>{this.props.data[this.state.selected]["max"]}</Text>
                                <Text style={styles.textSubtitle}>High Score</Text>
                            </View>
                        </Col>
                        <Col style={styles.column}>
                            <View>
                                <Text style={styles.textMain}>{this.props.data[this.state.selected]["min"]}</Text>
                                <Text style={styles.textSubtitle}>Low Score</Text>
                            </View>
                        </Col>
                    </Row>
                    <Row style={styles.row} size={5}>
                        <Col style={[styles.column, {backgroundColor: 'transparent'}]} size={2}>
                            <Chart
                                type="line"
                                data={this.props.data[this.state.selected]["points"].length == 0 ? [[]] : this.props.data[this.state.selected]["points"]}
                                style={styles.chart}
                                color={mainColor}
                                fillColor={fillColor}
                                lineWidth={2}
                                dataPointRadius={5}
                                dataPointColor={mainColor}
                                dataPointFillColor={pfllColor}
                                showGrid={false}
                                showAxis={false}
                                axisColor={'#8E8E8E'}
                                axisLabelColor={'#8E8E8E'}
                                showDataPoint={true}/>
                        </Col>
                        <Col style={styles.column}>
                            { this.renderPicker() }
                        </Col>
                    </Row>
                </Grid>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    chart: {
        width: 200,
        height: 65,
        marginTop: 20,
    },
    column: {
        justifyContent: 'center',
    },
    grid: {
        flex: 1
    },
    picker: {
        width: 125,
    },
    row: {
        paddingLeft: 15
    },
    separator: {
        borderBottomColor: '$colors.main',
        borderBottomWidth: '$dimensions.hairlineWidth'
    },
    textMain: {
        color: '$colors.darkGray',
        fontSize: 36,
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
    },
    textSubtitle: {
        color: '$colors.mediumGray',
        fontSize: '$fonts.size',
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
        paddingTop: 1
    },
})
