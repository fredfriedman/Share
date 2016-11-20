'use strict';

import React, { Component } from 'react';
import {
        ScrollView,
        Text,
        TouchableHighlight,
        View,
    } from 'react-native';

// Utility
import Firebase from '../../config/firebase'
import Icon from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';
import Header from '../../components/header'
import ModifySymptom from './modifySymptom'

export default class AssessmentSummary extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mostRecentAssessment: null
        }
        console.log(props)
        this.historyRef = this.getRef().child('Patients/' + props.user.Patient + "/Assessments")
    }

    getRef() {
        return Firebase.database().ref();
    }

    componentWillMount() {
        var self = this

        this.historyRef.limitToLast(1).once("value", function (snapshot) {
            for (var key in snapshot.val()) {
                self.setState({mostRecentAssessment: snapshot.val()[key]})

            }
        });
    }

    onBack() {
        this.props.navigator.pop()
    }

    onPressCell(symptom) {
        this.props.navigator.push({
            component: ModifySymptom,
            passProps: {
                symptom: symptom,
                level: this.state.mostRecentAssessment && this.state.mostRecentAssessment["Results"][symptom]["level"] || "-",
                changes: this.state.mostRecentAssessment && this.state.mostRecentAssessment["Results"][symptom]["changes"] || "-",
                onSave: this.onSave.bind(this)
            }
        })
    }

    onSave() {

    }

    getDate() {
        var date = new Date()
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    }

    renderView(symptom) {
        return (
            <TouchableHighlight
                onPress={this.onPressCell.bind(this, symptom)}
                style={styles.box}
                underlayColor={'transparent'}>
                <View>
                    <View style={{height: 40, borderBottomWidth: 1, borderBottomColor: "#d7d7d7", flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={[styles.symptomText,{marginLeft: 2.5}]}>{symptom}</Text>
                        <Text style={[styles.symptomText,{marginRight: 2.5}]}>{this.state.mostRecentAssessment && this.state.mostRecentAssessment["Results"][symptom]["level"] || "-"}</Text>
                    </View>
                    <View style={{height: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#E0F7FA', flex: 1}}>
                        <Text style={[styles.mediText, {marginLeft: 2.5}]}>Medication Change:</Text>
                        <Text style={[styles.mediText]}> {this.state.mostRecentAssessment && this.state.mostRecentAssessment["Results"][symptom]["changes"] || "-"}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" size={30} color="#262626" />);

        return (
            <View style={styles.container}>
                <Header text={ this.getDate() }
                    headerStyle={styles.header}
                    textStyle={styles.header_text}
                    leftAction={this.onBack.bind(this)}
                    leftIcon={backIcon}
                    rightAction={this.onSave.bind(this)}
                    rightIcon={<Text style={styles.headerButtonText}>Save</Text>}/>

                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    { this.renderView("Pain") }
                    { this.renderView("Tiredness") }
                    { this.renderView("Nausea") }
                    { this.renderView("Depression") }
                    { this.renderView("Anxiety") }
                    { this.renderView("Drowsiness") }
                    { this.renderView("Appetite") }
                    { this.renderView("ShortnessOfBreath") }
                    <View style={styles.box}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 2.5, marginRight: 2.5,}}>
                            <View style={{flex: 1}}>
                                <Text style={[styles.symptomText,{flexWrap:'wrap', fontSize: 14, marginLeft: 2.5}]}>How distressed have you been with your duties as a caregiver?</Text>
                            </View>
                            <Text style={styles.symptomText}>{this.state.mostRecentAssessment && this.state.mostRecentAssessment["distress"] || "-"}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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
    scrollViewContainer: {
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10
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
        marginTop: 10,
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
});
