'use strict';
import React, { Component } from 'react';
import {
        StyleSheet,
        Text,
        View
    } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Chart from 'react-native-chart';
import Header from '../../../components/header'

export default class Graphs extends Component {

    constructor() {
        super();

        this.state = {
            data: [],
        }
    }
    componentWillMount() {
        this.setState({data: this.createPoints(this.props.assessments || [], this.props.type)})
    }
    createPoints(assessments, type) {
        var data = []
        switch(type) {
            case  "Appetite":
                for (var i = 0; i < assessments.length; i++) {
                    data += [i, assessments[i].Results.Appetite]
                }
                break
            case "Depression":
                for (var i = 0; i < assessments.length; i++) {
                    data += [i, assessments[i].Results.Depression]
                }
                break
            case "Drowsiness":
                for (var i = 0; i < assessments.length; i++) {
                    data += [i, assessments[i].Results.Drowsiness]
                }
                break
            case "Nausea":
                for (var i = 0; i < assessments.length; i++) {
                    data += [i, assessments[i].Results.Nausea]
                }
                break
            case "Pain":
                for (var i = 0; i < assessments.length; i++) {
                    data += [i, assessments[i].Results.Pain]
                }
                break
            case "Shortness of breath":
                for (var i = 0; i < assessments.length; i++) {
                    data += [i, assessments[i].Results.ShortnessOfBreath]
                }
                break
            case "Tiredness":
                for (var i = 0; i < assessments.length; i++) {
                    data += [i, assessments[i].Results.Tiredness]
                }
                break
        }
        return data
    }

    render(){

        const mainColor = '#FFC107'
        const fillColor = 'rgba(255, 193, 7, 0.3)'
        const pfllColor ='#ECEFF1'

        return (
            <View style={this.props.containerStyle}>
                <Grid style={styles.grid}>
                    <Row style={styles.row}>
                        <Col style={styles.column}>
                            <View>
                                <Text style={styles.textMain}> 8 </Text>
                                <Text style={styles.textSubtitle}> Avg Score </Text>
                            </View>
                        </Col>
                        <Col style={styles.column}>
                            <View>
                                <Text style={styles.textMain}> 10 </Text>
                                <Text style={styles.textSubtitle}> High Score </Text>
                            </View>
                        </Col>
                        <Col style={styles.column}>
                            <View>
                                <Text style={styles.textMain}> 5 </Text>
                                <Text style={styles.textSubtitle}> Low Score </Text>
                            </View>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.column} size={2}>
                            <Text style={styles.textMain}> 8 </Text>
                            <Text style={styles.textSubtitle}> Avg Score </Text>
                        </Col>
                        <Col style={[styles.column, {backgroundColor: 'transparent'}]} size={2}>
                            <Chart
                                type="line"
                                data={this.props.data}
                                style={styles.chart}
                                color={mainColor}
                                fillColor={fillColor}
                                lineWidth={2}
                                dataPointRadius={5}
                                dataPointColor={mainColor}
                                dataPointFillColor={pfllColor}
                                showGrid={false}
                                showAxis={false}
                                showDataPoint={true}/>
                            <Text style={styles.textSubtitle}> {this.props.type} Trend </Text>
                        </Col>
                    </Row>
                </Grid>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    chart: {
        width: 250,
        height: 65,
        marginTop: -20,
    },
    column: {
        justifyContent: 'center',
    },
    grid: {
        paddingLeft: 20,
        flex: 1
    },
    textMain: {
        color: '#262626',
        fontSize: 36,
        fontWeight: '400',
        fontFamily: 'Helvetica Neue',
        marginLeft: -5,
    },
    textSubtitle: {
        color: '#9E9E9E',
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Helvetica Neue',
        paddingTop: 1
    },
    row: {
        flex: 1
    }
})
