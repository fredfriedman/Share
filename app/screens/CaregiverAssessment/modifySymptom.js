'use strict';
import React, { Component } from 'react';
import {
        Picker,
        StyleSheet,
        Text,
        TouchableHighlight,
        View
    } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/header'
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from 'apsl-react-native-button'

const Item = Picker.Item;

export default class Graphs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: String(props.level),
        }
    }

    onBack() {
        this.props.navigator.pop()
    }

    onMedsChange() {

    }

    onValueChange(value: String){
        this.setState({selected: value})
    }

    getDate() {
        var date = new Date()
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    }

    renderPicker() {
        return (
            <Picker
                style={styles.picker}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}>
                <Item label="0" value="0" />
                <Item label="1" value="1" />
                <Item label="2" value="2" />
                <Item label="3" value="3" />
                <Item label="4" value="4" />
                <Item label="5" value="5" />
                <Item label="6" value="6" />
                <Item label="7" value="7" />
                <Item label="8" value="8" />
                <Item label="9" value="9" />
                <Item label="10" value="10" />
            </Picker>
            )
    }

    renderSummaryBox() {
        return (
            <View style={styles.box}>
                <View style={{height: 40, borderBottomWidth: 1, borderBottomColor: "#d7d7d7", flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[styles.symptomText, {marginLeft: 2.5}]}>{this.props.symptom}</Text>
                    <Text style={[styles.symptomText, {marginRight: 2.5}]}>{this.props.level}</Text>
                </View>
                <View style={{height: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#E0F7FA', flex: 1}}>
                    <Text style={[styles.mediText, {marginLeft: 2.5}]}>Medication Change: </Text>
                    <Text style={[styles.mediText]}>{this.props.changes}</Text>
                </View>
            </View>
        )
    }

    renderChangeButton(icon, func) {
        return (
            <TouchableHighlight
                onPress={func}
                style={{height: 50, width: 50}}
                underlayColor={'transparent'}>
                {icon}
            </TouchableHighlight>
        )
    }

    render(){
        const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" size={30} color="#262626" />);
        const upIcon = (<Icon name="ios-arrow-dropup-circle-outline" size={40} color="#262626" />);
        const downIcon = (<Icon name="ios-arrow-dropdown-circle-outline" size={40} color="#262626" />);

        return (
            <View style={styles.container}>
                <Header text={ this.getDate() }
                    headerStyle={styles.header}
                    textStyle={styles.header_text}
                    leftAction={this.onBack.bind(this)}
                    leftIcon={backIcon}
                    rightAction={this.props.onSave()}
                    rightIcon={<Text style={styles.headerButtonText}>Save</Text>}/>
                <View style={{flex: 1, justifyContent: 'space-between'}}>
                    { this.renderSummaryBox() }
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={[styles.symptomText, {marginLeft: 20}]}>{this.props.symptom} Level Change: </Text>
                        { this.renderPicker() }
                    </View>
                    <View style={{marginBottom: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={[styles.symptomText, {marginLeft: 20}]}>Medication Change: </Text>
                        <View style={{alignItems: 'center', flexDirection: 'column', marginRight: 30}}>
                            { this.renderChangeButton(upIcon, this.onMedsChange.bind(this)) }
                            { this.renderChangeButton(downIcon, this.onMedsChange.bind(this)) }
                        </View>
                    </View>
                </View>
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
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    grid: {
        flex: 1
    },
    box: {
        backgroundColor: '#FFFFFF',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        elevation: 5,
        marginLeft: 30,
        marginRight: 30,
        height: 60,
        marginTop: 20,
    },
    header: {
        height: 60,
        backgroundColor: '$colors.lightGray',
    },
    header_text: {
        color: '$colors.darkGray',
        fontSize: 18,
        fontWeight: '$fonts.weight',
        fontFamily: "$fonts.family",
    },
    headerButtonText: {
        color: '#007AFF',
        paddingTop: 8,
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: '$fonts.family',
    },
    symptomText: {
        color: '$colors.darkGray',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: '$fonts.family',
    },
    mediText: {
        color: '$colors.mediumGray',
        fontSize: 12,
        fontWeight: 'bold',
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
