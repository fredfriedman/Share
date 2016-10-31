import React, { Component } from 'react';
import {
        Image,
        ListView,
        Navigator,
        RecyclerViewBackedScrollView,
        ScrollView,
        StyleSheet,
        TouchableHighlight,
        Text,
        TextInput,
        View, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Dimensions from 'Dimensions';
import PageControl from 'react-native-page-control'
import { Col, Row, Grid } from "react-native-easy-grid";

var firebase = require('../../config/firebase')
var Header = require('../../components/header').default
var PatientTrend = require('../../components/PatientTrendChart').default
var NotesPage = require('./notesPage').default
var dStyles = require('../../config/styles')

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
            currentPage: 0//'summary'
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
    render() {
        const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" size={30} color="#1e1e1e" />);
        const clockIcon = (<Icon name="ios-time-outline" ios="ios-time-outline" md="md-time" size={20} color="#00ACC1" />);

        return (
            <View style={{flexDirection: 'column', flex: 1}}>
                <Header text={this.props.patient.name} headerStyle={styles.header} textStyle={styles.text} leftAction={this.onBack.bind(this)} leftIcon={backIcon}/>
                <View style={styles.topBox}>
                    <Text style={[styles.text,{paddingLeft: 5, color: 'white', fontSize: 13, fontWeight: '200'}]}>  </Text>
                    <View>
                        <View style={{ alignItems: 'center', flexDirection: 'row'}}>
                            <View style={{width: 5, backgroundColor: 'orange', borderRadius: 5, height: 40}}/>
                            <Text style={[styles.text,{color: 'white', fontSize: 52, fontWeight: '200'}]}> 67 </Text>
                        </View>
                        <Text style={[styles.text,{color: '#00838F', fontSize: 20, fontWeight: '400'}]}> Current Status </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 25}}>
                        { clockIcon }
                        <Text style={[styles.text,{paddingLeft: 5, color: 'white', fontSize: 13, fontWeight: '200'}]}> Last Entry | Jan 16, 2016  </Text>
                    </View>
                </View>
                <View style={styles.bottomBox}>
                    <Text style={styles.patientPhone}> {this.props.patient.phone} </Text>
                    <ScrollView
                        ref="pageControl"
                        pagingEnabled={true}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        onScroll={this.onScroll.bind(this)}
                        scrollEventThrottle={16}>
                        <View style={styles.scrollView}>
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
                        <View style={styles.scrollView}>
                            <Text style={{alignSelf: 'center', color: '#1e1e1e'}}> Recent History </Text>
                        </View>
                        <View style={styles.scrollView}>
                            <Text style={{alignSelf: 'center', color: '#1e1e1e'}}> Notes </Text>
                            <NotesPage navigator={this.props.navigator} notes={this.state.notes} user={this.props.user} patient={this.props.patient}/>
                        </View>

                    </ScrollView>
                </View>
                <PageControl style={{position:'absolute', left:0, right:0, bottom:10}}
                    numberOfPages={3}
                    currentPage={this.state.currentPage}
                    pageIndicatorTintColor='#1e1e1e'
                    currentPageIndicatorTintColor='#00BCD4'
                    indicatorStyle={{borderRadius: 5}}
                    currentIndicatorStyle={{borderRadius: 5}}
                    indicatorSize={{width:8, height:8}}
                    onPageIndicatorPress={this.onItemTap.bind(this)} />
            </View>
        );
    }
}
var styles = StyleSheet.create({
    bottomBox: {
        backgroundColor: '#ECEFF1',
        flex: 1,
    },
    patientName: {
        marginLeft: 100,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    patientPhone: {
        marginLeft: 100,
        marginTop: 5,
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white'
    },
    scrollView: {
        width: Dimensions.get('window').width,
        flex: 1,
        backgroundColor:'transparent',
    },
    profilePicture: {
        position: 'absolute',
        height: 75,
        width: 75,
        borderRadius: 40,
        top: Dimensions.get('window').height/2.5 - 37.5,
        left: 15,
        backgroundColor: 'transparent'
    },
    profileHeaderView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonFont: {
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
        color: '#C7C7CC',
    },
    header: {
        height: 60,
        backgroundColor: '#ECEFF1',
    },
    text: {
        fontFamily: 'Helvetica Neue',
        color: '#1e1e1e',
        fontSize: 16,
        fontWeight: 'bold',
    },
    topBox: {
        flex: .8,
        paddingLeft: 30,
        backgroundColor: '#1e1e1e',
        justifyContent: 'space-between',
        borderBottomColor: '#00838F',
        borderBottomWidth: 4
    },
});
//'#1e1e1e',
