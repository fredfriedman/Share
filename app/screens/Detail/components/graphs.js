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

    renderChart() {

        const mainColor = '#00BCD4'
        const fillColor = 'rgba(0, 151, 167, 0.3)'
        const pfllColor ='#ECEFF1'

        return ( this.props.data[this.state.selected]["points"].length < 2 ?

            <View style={styles.noChartBox}>
                <Text style={styles.noChartText}>Need More Data</Text>
            </View>
        :
            <Chart
                type="line"
                data={this.props.data[this.state.selected]["points"]}
                style={styles.chart}
                color={mainColor}
                fillColor={fillColor}
                lineWidth={2}
                dataPointRadius={0}
                dataPointColor={mainColor}
                dataPointFillColor={pfllColor}
                showGrid={false}
                showAxis={false}
                axisColor={'#8E8E8E'}
                axisLabelColor={'#8E8E8E'}
                showDataPoint={true}/> )

    }
    render(){

        return (
            <View style={this.props.containerStyle}>
                <Grid style={styles.grid}>
                    <Row style={styles.row} size={1}>
                        <Col style={styles.column}>
                            <View>
                                <Text style={styles.textMain}>{Math.round(10*this.props.data[this.state.selected]["avg"] / this.props.data[this.state.selected].points.length)/10}</Text>
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
                        <Col style={styles.column} size={2}>
                            { this.renderChart() }
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
    noChartBox: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        height: 40,
        width: 150,
        backgroundColor: 'rgba(28, 28, 28, 0.5)',
        shadowColor: "#262626",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        elevation: 20
    },
    noChartText: {
        color: 'white',
        fontSize: '$fonts.size',
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
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
