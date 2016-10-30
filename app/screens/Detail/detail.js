import React, { Component } from 'react';
import {
        Image,
        ListView,
        Navigator,
        Platform,
        ScrollView,
        StyleSheet,
        TouchableHighlight,
        Text,
        TextInput,
        View, } from 'react-native';

import Dimensions from 'Dimensions';
import PageControl from 'react-native-page-control'
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button'
import { Col, Row, Grid } from "react-native-easy-grid";

var firebase = require('../../config/firebase')
var Header = require('../../components/header').default
var PatientTrend = require('../../components/PatientTrendChart').default
var NotesPage = require('./notesPage').default
var { dimensions } = require('../../config/dimensions')

export default class PatientDetailView  extends Component {

    constructor(props) {
        super(props);

        this.historyRef = this.getRef().child('Patients/' + props.patient.pID + "/Assessments")
        this.notesRef = this.getRef().child('Patients/' + props.patient.pID + "/Notes/")
        this.patientRef = this.getRef().child('Patients/' + props.patient.pID)

        this.state = {
            data: [],
            history: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2, }),
            notes: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2, }),
            currentPage: 0
        };
    }

    componentDidMount() {
        this.listenForItems(this.notesRef, this.setNotes.bind(this), this.parseNotes);
        this.listenForItems(this.historyRef, this.setHistory.bind(this), this.parseAssessments);
    }

    getRef() {
        return firebase.database().ref();
    }

    createGraphs(history) {
        var painScores = []
        history.forEach((entry) => {
            var ent = entry.results["Pain"]
            ent["timestamp"] = entry.timestamp
            painScores.push(ent)
        })
        this.setState({ data: painScores })
    }
    //////////////
    // Firebase //
    //////////////

    parseNotes(snap) {
        return {
            poster: snap.val().poster,
            text: snap.val().text,
            timestamp: snap.val().timestamp,
        }
    }

    parseAssessments(snap) {
        return {
            completed: snap.val().completed,
            timestamp: snap.val().timestamp,
            filler: snap.val().filler,
            results: snap.val().Results,
        }
    }

    setNotes(notes) {
        this.setState({ notes: this.state.notes.cloneWithRows(notes) });
    }

    setHistory(hist) {
        this.setState({ history: this.state.history.cloneWithRows(hist) });
        this.createGraphs(hist)
    }

    listenForItems(ref, callback, parser) {

        ref.on('value', (snap) => {

            var items = [];

            snap.forEach((child) => { items.push(parser(child)); });

            callback(items)
        });
    }

    //////////////////////
    //Callback Functions//
    //////////////////////

    onBack() {
        this.props.navigator.pop()
    }

    onScroll(event){
        var offsetX = event.nativeEvent.contentOffset.x
        var pageWidth = Dimensions.get('window').width - 10
        this.setState({
            currentPage: Math.floor((offsetX - pageWidth / 2) / pageWidth) + 1
        });
    }

    onItemTap(index) {
        this.setState({ currentPage: index });
    }

    setPage(page) {
        this.setState({ currentPage: page });
    }

    render() {
        const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" style={{marginTop: -10}} size={dimensions.iconSize} color="#1e1e1e" />);
        const personIcon = (<Icon name="ios-person" ios="ios-person" md="md-person" style={{marginTop: -5}} size={dimensions.iconSize} color="white" />);
        const clockIcon = (<Icon name="ios-time-outline" ios="ios-time-outline" md="md-time" style={{marginTop: -2}} size={20} color="#00BCD4" />);

        return (
            <View style={{flexDirection: 'column', flex: 1 }}>
                <Header text={"Profile"} headerStyle={styles.header} textStyle={styles.text} leftAction={this.onBack.bind(this)} leftIcon={backIcon}/>
                <View style={{height: 50}}>
                    <ScrollView
                        ref="pageControl"
                        pagingEnabled={true}
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                        bounces={true}
                        style={styles.optionBox}
                        onScroll={this.onScroll.bind(this)}
                        scrollEventThrottle={16}>
                        <View style={styles.scrollView}>
                            <Button
                                style={[styles.buttonFont, {marginLeft: 10}]}
                                containerStyle={{height: 40}}
                                onPress={() => this.setPage("graphs")}>
                                Summary
                            </Button>
                        </View>
                        <View style={styles.scrollView}>
                            <Button
                                style={[styles.buttonFont, {marginLeft: 10}]}
                                containerStyle={{height: 40}}
                                onPress={() => this.setPage("history")}>
                                History
                            </Button>
                        </View>
                        <View style={styles.scrollView}>
                            <Button
                                style={[styles.buttonFont, {marginLeft: 10}]}
                                containerStyle={{height: 40}}
                                onPress={() => this.setPage("graphs")}>
                                Notes
                            </Button>
                        </View>
                        </ScrollView>
                </View>
                <View style={styles.summaryBox}>
                    <View style={{flexDirection: 'row', marginTop: 25}}>
                        { clockIcon }
                        <Text style={[styles.text,{paddingLeft: 5, color: 'white', fontSize: 13, fontWeight: '200'}]}> Last Entry: Jan 16, 2016  </Text>
                    </View>
                    <View>
                        <View style={{ alignItems: 'center', flexDirection: 'row'}}>
                            <View style={{width: 5, backgroundColor: 'orange', borderRadius: 5, height: 30}}/>
                            <Text style={[styles.text,{color: 'white', fontSize: 52, fontWeight: '200'}]}> 67 </Text>
                        </View>
                        <Text style={[styles.text,{color: 'gray', fontSize: 20, fontWeight: '400'}]}> Current Status </Text>
                    </View>
                    <Text style={[styles.text,{color: 'white', fontSize: 20, fontWeight: '400'}]}> {this.props.patient.name} </Text>
                </View>
                <View style={styles.bottomBox}>
                    <Grid style={{flex: 1}}>
                    	<Row style={{flex: 1}}>
                            <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                                <View>
                                    <Text style={[styles.text, {color: '#1e1e1e', fontSize: 36, fontWeight: '400'}]}> 80 </Text>
                                    <Text style={[styles.text, {color: 'gray', fontSize: 14, fontWeight: '400'}]}> Avg Score </Text>
                                </View>
                            </Col>
                            <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                                <View>
                                    <Text style={[styles.text, {color: '#1e1e1e', fontSize: 36, fontWeight: '400'}]}> 10 </Text>
                                    <Text style={[styles.text, {color: 'gray', fontSize: 14, fontWeight: '400'}]}> High Score </Text>
                                </View>
                            </Col>
                            <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                                <View>
                                    <Text style={[styles.text, {color: '#1e1e1e', fontSize: 36, fontWeight: '400'}]}> 5 </Text>
                                    <Text style={[styles.text, {color: 'gray', fontSize: 14, fontWeight: '400'}]}> Low Score </Text>
                                </View>
                            </Col>
                        </Row>
                        <Row style={{flex: 1}}>
                            <Col style={{paddingLeft: 20, flex: 0.667}}>
                                <PatientTrend data={this.state.data} color={'#FFC107'}/>
                            </Col>
                            <Col style={{flex: 0.33, alignItems: 'center', justifyContent: 'center'}}>

                            </Col>

                        </Row>
                    </Grid>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    bottomBox: {
        flex: 0.8,
        backgroundColor: '#ECEFF1'
    },
    buttonFont: {
        fontFamily: (Platform.OS === 'ios') ? 'Helvetica Neue' : "Noto",
        fontSize: 14,
        color: '#C7C7CC',
    },
    header: {
        height: 60,
        backgroundColor: '#ECEFF1',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#2e2e2e'
    },
    text: {
        fontFamily: (Platform.OS === 'ios') ? 'Helvetica Neue' : "Noto",
        color: '#212121',
        fontSize: 16,
        fontWeight: 'bold',
    },
    optionBox: {
        paddingVertical: 15,
        backgroundColor: '#00ACC1',
        height: 50,
    },
    summaryBox: {
        flex: .67,
        paddingLeft: 30,
        backgroundColor: '#1e1e1e',
        justifyContent: 'space-between'
    },
    scrollView: {
        width: Dimensions.get('window').width,
        height: 50,
    },
});
