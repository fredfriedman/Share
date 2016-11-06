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
            selected: "4",
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
                <Item label="Appetite" value="0" />
                <Item label="Depression" value="1" />
                <Item label="Drowsiness" value="2" />
                <Item label="Nausea" value="3" />
                <Item label="Pain" value="4" />
                <Item label="Shortness of Breath" value="5" />
                <Item label="Tiredness" value="6" />
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
                    <Row style={styles.row} size={5}>
                        <Col style={[styles.column, {backgroundColor: 'transparent'}]} size={2}>
                            <Chart
                                type="line"
                                data={this.props.data[parseInt(this.state.selected)].length == 0 ? [[]] : this.props.data[parseInt(this.state.selected)]}
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
        marginLeft: -5,
    },
    textSubtitle: {
        color: '$colors.mediumGray',
        fontSize: '$fonts.size',
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
        paddingTop: 1
    },
})
