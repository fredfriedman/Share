import React, { Component } from 'react';
import {
        ListView,
        Navigator,
        ScrollView,
        Text,
        View, } from 'react-native'
// Assets
import Icon from 'react-native-vector-icons/Ionicons';

// Components
import Header from '../../components/header'
import PageControl from 'react-native-page-control'

// SubPages
import NotesPage from './components/notes'
import GraphsPage from './components/graphs'
import HistoryPage from './components/history'

// Utiilities
import Firebase from '../../config/firebase'
import EStyleSheet from 'react-native-extended-stylesheet';
import Dimensions from 'Dimensions'

export default class PatientDetailView  extends Component {

    constructor(props) {
        super(props);

        this.historyRef = this.getRef().child('Patients/' + props.patient.pID + "/Assessments")
        this.notesRef = this.getRef().child('Patients/' + props.patient.pID + "/Notes/")
        this.patientRef = this.getRef().child('Patients/' + props.patient.pID)

        this.state = {
            data: { "Appetite": {max: 0, min: 0, avg: 0, points: []},
                    "Depression": {max: 0, min: 0, avg: 0, points: []},
                    "Drowsiness": {max: 0, min: 0, avg: 0, points: []},
                    "Nausea": {max: 0, min: 0, avg: 0, points: []},
                    "Pain": {max: 0, min: 0, avg: 0, points: []},
                    "Shortness of Breath": {max: 0, min: 0, avg: 0, points: []},
                    "Tiredness": {max: 0, min: 0, avg: 0, points: []}},
            trendHistory: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2, }),
            history: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2, }),
            notes: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2, }),
            lastPost: null,
            currentPage: 0
        };
    }

    //////////////
    // Firebase //
    //////////////

    componentDidMount() {
        this.listenForItems(this.notesRef.orderByChild('timestamp'), this.setNotes.bind(this), this.parseNotes);
        this.listenForItems(this.historyRef, this.setHistory.bind(this), this.parseAssessments);
    }

    getRef() {
        return Firebase.database().ref();
    }

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

    buildPoints(assessments) {
        var graphData = { "Appetite": {max: null, min: null, avg: null, points: []},
                    "Depression": {max: null, min: null, avg: null, points: []},
                    "Drowsiness": {max: null, min: null, avg: null, points: []},
                    "Nausea": {max: null, min: null, avg: null, points: []},
                    "Pain": {max: null, min: null, avg: null, points: []},
                    "Shortness of Breath": {max: null, min: null, avg: null, points: []},
                    "Tiredness": {max: null, min: null, avg: null, points: []}}

        for (var i = 0; i < assessments.length; i++) {
            this.updateLatestDate(assessments[i].timestamp)
            this.updateData(graphData, i, assessments[i].results.Appetite.level, "Appetite")
            this.updateData(graphData, i, assessments[i].results.Depression.level, "Depression")
            this.updateData(graphData, i, assessments[i].results.Drowsiness.level, "Drowsiness")
            this.updateData(graphData, i, assessments[i].results.Nausea.level, "Nausea")
            this.updateData(graphData, i, assessments[i].results.Pain.level, "Pain")
            this.updateData(graphData, i, assessments[i].results.ShortnessOfBreath.level, "Shortness of Breath")
            this.updateData(graphData, i, assessments[i].results.Tiredness.level, "Tiredness")
        }

        return graphData
    }

    updateLatestDate(datetime) {
        var date = new Date(datetime)
        if(this.state.lastPost == null || date > this.state.lastPost) {
            this.setState({lastPost: date})
        }
    }

    updateData(gData, i, level, type) {
        if (gData[type]["max"] == null || gData[type]["max"] > level) { gData[type]["max"] = level }
        if (gData[type]["min"] == null || gData[type]["min"] < level) { gData[type]["min"] = level }
        gData[type]["avg"] == null ? gData[type]["avg"] = level : gData[type]["avg"] += level
        gData[type]["points"].push([i, level])
    }

    setHistory(hist) {
        this.setState({ history: this.state.history.cloneWithRows(hist) });
        this.setState({ data: this.buildPoints(hist.slice(0, 5)) })
    }

    listenForItems(ref, callback, parser) {

        ref.on('value', (snap) => {

            var items = [];

            snap.forEach((child) => { items.push(parser(child)); });

            callback(items)
        });
    }

    /////////////////
    // Navigation //
    ////////////////

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

    //////////////////////////////
    // Styling Helper Functions //
    //////////////////////////////

    statusToColor(status) {
        if(status > 70) {
            return {backgroundColor: '#e50000'}
        } else if (status > 40) {
            return {backgroundColor: '#FFC107'}
        } else {
            return {backgroundColor: '#228B22'}
        }
    }

    parseDate(date) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"]
        return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    }

    /////////////////////////
    // Rendering Functions //
    /////////////////////////

    renderTopBox() {
        const clockIcon = (<Icon name="ios-time-outline" ios="ios-time-outline" md="md-time" size={20} color="#00ACC1" />);
        const alertIcon = (<Icon name="ios-warning-outline" ios="ios-warning-outline" md="md-warning-outline" size={20} color="#e50000"/>);
        const pulseIcon = (<Icon name="ios-pulse" ios="ios-pulse" md="md-pulse" size={30} color="orange"/>);
        return (
            <View style={styles.topBox}>
                <Text style={[styles.text,{paddingLeft: 5, color: 'white', fontSize: 13, fontWeight: '200'}]}>  </Text>
                <View>
                    <View style={[styles.row, {alignItems: 'center'}]}>
                        <View style={[styles.indicator, this.statusToColor(this.props.patient.status)]}/>
                        <Text style={[styles.text, {color: 'white', fontSize: 60, fontWeight: '200'}]}> {this.props.patient.status} </Text>
                        { alertIcon }
                    </View>
                    <Text style={[styles.text, {color: '#00838F', fontSize: 20, fontWeight: '400'}]}> Current Status </Text>
                </View>
                <View style={[styles.row, {marginTop: 25}]}>
                    { clockIcon }
                    <Text style={[styles.text, {paddingLeft: 5, color: 'white', fontSize: 13, fontWeight: '200'}]}> Last Entry | {this.state.lastPost == null ? "None" : this.parseDate(this.state.lastPost)} </Text>
                </View>
            </View>
        )
    }

    renderBottomBox() {

        return (
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
                    <GraphsPage containerStyle={styles.scrollView} data={this.state.data}/>
                    <HistoryPage containerStyle={styles.scrollView} labelStyle={styles.label} assessments={this.state.history} navigator={this.props.navigator}/>
                    <NotesPage containerStyle={styles.scrollView} navigator={this.props.navigator} notes={this.state.notes} user={this.props.user} patient={this.props.patient} labelStyle={styles.label}/>
                </ScrollView>
            </View>
        )
    }

    render() {
        const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" size={30} color="#262626" />);
        const currentPageColor = '#00BCD4'
        const pageIndicatorColor = '#262626'

        return (
            <View style={{flexDirection: 'column', flex: 1}}>
                <Header text={this.props.patient.name} headerStyle={styles.header} textStyle={styles.text} leftAction={this.onBack.bind(this)} leftIcon={backIcon}/>
                { this.renderTopBox() }
                { this.renderBottomBox() }
                <PageControl style={styles.pageControl}
                    numberOfPages={3}
                    currentPage={this.state.currentPage}
                    pageIndicatorTintColor={pageIndicatorColor}
                    currentPageIndicatorTintColor={currentPageColor}
                    indicatorStyle={{borderRadius: 5}}
                    currentIndicatorStyle={{borderRadius: 5}}
                    indicatorSize={{width:8, height:8}}
                    onPageIndicatorPress={this.onItemTap.bind(this)} />
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    bottomBox: {
        flex: 1,
        backgroundColor: '$colors.lightGray',
    },
    header: {
        backgroundColor: '$colors.lightGray',
    },
    indicator: {
        width: 5,
        height: 50,
        borderRadius: 5,
    },
    label: {
        alignSelf: 'center',
        color: '$colors.darkGray',
    },
    pageControl: {
        position:'absolute',
        left: 0,
        right: 0,
        bottom: 10
    },
    row: {
        flexDirection: 'row'
    },
    scrollView: {
        flex: 1,
        width: '$dimensions.screenWidth',
        backgroundColor: 'transparent',
    },
    text: {
        color: '$colors.darkGray',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: '$fonts.family',
    },
    topBox: {
        flex: .8,
        paddingLeft: 30,
        backgroundColor: '$colors.darkGray',
        justifyContent: 'space-between',
        borderBottomColor: '$colors.status',
        borderBottomWidth: 5
    }
});
